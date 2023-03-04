import { TrashIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "@/stores/cart";
import { currency } from "@/utils/formatter";
import { getFileUrl } from "@/utils/functions";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import CartList from "@/components/CartList";

export const generateMetadata: () => Metadata = () => ({
  title: "Cart",
  description: "Products added to your cart",
});

const Cart = () => {
  return (
    <main>
      <div className="container mx-auto p-2 md:max-w-screen-md">
        <h1 className="my-6 text-2xl md:text-3xl">My Cart</h1>
        <CartList />

        <div className="mt-8 flex justify-end ">
          <Link
            href={"/cart/order"}
            className="bg-primary-500 py-2 px-4 font-bold text-white hover:bg-primary-600 "
          >
            Place Order
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Cart;
