import dayjs from "dayjs";
import config from "@/assets/config.json";
import { currency, number } from "@/lib/utils/formatter";
import type { Order, OrderItem } from "@/lib/types";
import {
  EnvelopeIcon,
  GlobeAltIcon,
  LinkIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

const Invoice = ({ order, items }: { order: Order; items: OrderItem[] }) => {
  return (
    <div
      style={{
        printColorAdjust: "exact",
        WebkitPrintColorAdjust: "exact",
      }}
      className="mx-auto hidden font-print print:block bg-white text-black"
    >
      <div className="mb-4 flex justify-between">
        <div className="w-1/2">
          <div>
            <img src={"/full-logo.svg"} width={220} alt="logo" />
          </div>
        </div>
        <div className="w-1/2 text-right">
          <p className="text-lg uppercase">Invoice</p>
          <p className="ml-2 text-neutral-700">INV#{order.id}</p>
          <p className="ml-2 text-neutral-700">
            Date: {dayjs(order.created).format("DD/MM/YYYY hh:mm A")}
          </p>
        </div>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-2">
        <div>
          <h2 className="mb-1 font-medium">Billed To:</h2>
          <p className="text-neutral-700">{order.receiver}</p>
          <p className="flex leading-tight text-neutral-700">
            <MapPinIcon className="mr-1 mt-1 h-4 w-4" />{" "}
            <span className="flex-1">{order.address}</span>
          </p>
          <p className="flex items-center text-neutral-700">
            <EnvelopeIcon className="mr-1 h-4 w-4" /> {order.email}
          </p>
          <p className="flex items-center text-neutral-700">
            <PhoneIcon className="mr-1 h-4 w-4" /> {order.phone}
          </p>
        </div>
        <div>
          <h2 className="mb-1 font-medium">Billed By:</h2>
          <p className="text-neutral-700">{"Gadget Era Team"}</p>
          <p className="flex items-center text-neutral-700">
            <MapPinIcon className="mr-1 h-4 w-4" /> {config.contact.address}
          </p>
          <p className="flex items-center text-neutral-700">
            <PhoneIcon className="mr-1 h-4 w-4" /> {config.contact.phone}
          </p>
        </div>
      </div>

      {/* Invoice Table */}
      <table className="mb-4 w-full border-collapse">
        <thead>
          <tr className="bg-primary-200">
            <th className="p-2">#</th>
            <th className="p-2 text-left">Product</th>
            <th className="p-2">Quantity</th>
            <th className="w-24 p-2 text-right">Price</th>
            <th className="p-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr className="border-y border-l border-primary-100" key={item.id}>
              <td className="p-2 text-center">{i + 1}</td>
              <td className="p-2">{item.expand?.product.name}</td>
              <td className="p-2 text-center">{item.units}</td>
              <td className="p-2 text-right">{number.format(item.rate)}</td>
              <td className="bg-primary-100 p-2 text-right">
                {number.format(item.rate * item.units)}
              </td>
            </tr>
          ))}
          <tr>
            <td className="text-transparent" colSpan={5}>
              spacing
            </td>
          </tr>

          <tr>
            <td colSpan={2}></td>
            <td
              colSpan={2}
              className="border-y border-l border-primary-100 p-2 text-right"
            >
              Shipping Charge
            </td>
            <td className="bg-primary-100 p-2 text-right">
              {number.format(order.shipping)}
            </td>
          </tr>
          {order.discount ? (
            <tr>
              <td colSpan={2}></td>
              <td
                colSpan={2}
                className="border-y border-l border-primary-100 p-2 text-right"
              >
                {"Discount (-)"}
              </td>
              <td className="bg-primary-100 p-2 text-right">
                {number.format(order.discount)}
              </td>
            </tr>
          ) : null}
          <tr>
            <td colSpan={2}></td>
            <td
              colSpan={2}
              className="border-y border-l border-primary-100 p-2 text-right font-semibold"
            >
              Grand Total
            </td>
            <td className="border-y border-primary-100 bg-primary-100 p-2 text-right font-semibold">
              {currency.format(order.total + order.shipping - order.discount)}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="grid grid-cols-2 pt-20">
        <div>
          <div className="mx-auto h-0.5 w-60 bg-black"></div>
          <p className="text-center">{"Executive's Sign"}</p>
        </div>
        <div>
          <div className="mx-auto h-0.5 w-60 bg-black"></div>
          <p className="text-center">{"Customer's Sign"}</p>
        </div>
      </div>
      <div className="inset-x-0 bottom-2 print:fixed">
        <table className="w-full">
          <tbody>
            <tr>
              <td>
                <span className="flex items-center gap-1">
                  <GlobeAltIcon className="h-5 w-5" />
                  www.gadgeterabd.com
                </span>
              </td>
              <td>
                <span className="flex flex-row-reverse items-center gap-1">
                  <PhoneIcon className="h-5 w-5" />
                  {config.contact.phone}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="flex items-center gap-1">
                  <LinkIcon className="h-5 w-5" />
                  www.facebook.com/bdgadgetera
                </span>
              </td>
              <td>
                <span className="flex flex-row-reverse items-center gap-1">
                  <EnvelopeIcon className="h-5 w-5" />
                  {config.contact.email}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoice;
