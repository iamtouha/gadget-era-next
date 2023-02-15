import pb from "@/utils/pb";
import { OrderFormInput } from "@/utils/schema";
import { customAlphabet } from "nanoid";
import type { NextApiRequest, NextApiResponse } from "next";
import type { CartItem } from "@/stores/cart";
import type { Order, OrderItem } from "@/utils/types";

const getReference = customAlphabet("0123456789", 6);
const getId = customAlphabet("0123456789ABCDEF", 15);

import nodemailer from "nodemailer";
import { env } from "@/env/server.mjs";
import { currency } from "@/utils/formatter";

// Define the email content and transport options
const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: +env.SMTP_PORT,
  secure: false,
  auth: {
    user: env.SMTP_USERNAME,
    pass: env.SMTP_PASSWORD,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(400).send({ message: "Method not allowed." });

  const payment_reference = getReference();
  const id = getId();
  const {
    district,
    upazila,
    street,
    phone,
    email,
    receiver,
    shipping,
    cod,
    items,
  } = JSON.parse(req.body) as OrderFormInput & {
    items: CartItem[];
    shipping: number;
  };
  if (!items?.length)
    return res.status(400).send({ message: "Invalid request." });
    
  try {
    const record = await pb.collection("orders").create<Order>({
      id,
      payment_reference: cod ? undefined : payment_reference,
      receiver,
      phone,
      email,
      shipping,
      cod,
      status: "pending",
      total:
        items.reduce((acc, item) => acc + item.price * item.units, 0) +
        shipping,
      address: `${district}, ${upazila}, ${street}`,
    });
    await Promise.all(
      items
        .map((item) => ({
          order: record.id,
          product: item.productId,
          rate: item.price,
          units: item.units,
        }))
        .map((item) =>
          pb
            .collection("order_items")
            .create<OrderItem>(item, { $autoCancel: false })
        )
    );
    await sendOrderConfirmationEmail(record);
    return res.status(201).send(record);
  } catch (error) {
    return res.status(500).send({ message: "Could not create the order." });
  }
}

const sendOrderConfirmationEmail = async (orderDetails: Order) => {
  const mailOptions = {
    from: '"Gadget Era" <support@gadgeterabd.com>',
    to: orderDetails.email,
    bcc: "touha98@gmail.com",
    subject: "Your Order Confirmation from Gadget Era",

    html: `
      <p>Dear ${orderDetails.receiver},</p>
      <p>Thank you for placing your order with Gadget Era! We appreciate your business and are thrilled to have the opportunity to serve you.</p>
      <p>This email is to confirm that we have received your order and it is now being processed. Your order details are as follows:</p>
      <p>Order ID: ${orderDetails.id}</p>
      <p>Date: ${orderDetails.created}</p> 
      <p>Total: ${currency.format(orderDetails.total)}</p>
      <p>Your order will be shipped to the following address: ${
        orderDetails.address
      }</p>
      <p>Thank you again for choosing Gadget Era. We look forward to delivering your order and providing you with the best possible customer experience.</p>
      <p>Best regards,</p>
      <p>Gadget Era Team</p>
    `,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};
