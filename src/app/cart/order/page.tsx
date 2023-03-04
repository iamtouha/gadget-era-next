"use client";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type CartItem, useCartStore } from "@/stores/cart";
import { currency } from "@/utils/formatter";
import { orderFormSchema, type OrderFormInput } from "@/utils/schema";
import config from "@/assets/config.json";
import styles from "@/styles/order.module.css";
import type { Order } from "@/utils/types";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { fetchUser } from "@/utils/functions";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const placeOrder = (
  url: string,
  {
    arg,
  }: {
    arg: OrderFormInput & {
      items: CartItem[];
      shipping: number;
      userId?: string;
    };
  }
) =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  }).then((res) => res.json());

function Order() {
  const cart = useCartStore();
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const { data: user } = useSWR("/api/user", fetchUser);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<OrderFormInput>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      cod: false,
      district: "",
      email: "",
      phone: "",
      street: "",
      receiver: "",
      upazila: "",
    },
  });
  const district = watch("district");
  const cod = watch("cod");

  const dist = useSWR<{ id: string; name: string }[]>(
    "/api/districts",
    fetcher
  );
  const upazila = useSWR<{ id: string; name: string; district_id: string }[]>(
    district ? "/api/districts/" + district : null,
    fetcher
  );
  const { trigger, isMutating } = useSWRMutation<Order>(
    "/api/orders/place-order",
    placeOrder,
    {
      onError: () => {
        toast.error("Could not place the order.");
      },
      onSuccess: (data) => {
        cart.clear();
        router.push("/order/" + data.id);
      },
    }
  );

  const shippingCharge = useMemo(() => {
    if (!district) return config.shipping.national;
    const { name } = dist.data?.find((item) => item.id === district) ?? {};
    return config.shipping["local-districts"].includes(
      name?.toLowerCase() ?? ""
    )
      ? config.shipping.local
      : config.shipping.national;
  }, [dist.data, district]);

  useEffect(() => {
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (user) {
      setValue("email", user.email);
    }
  }, [user, setValue]);

  return (
    <div className="container mx-auto p-2 lg:max-w-screen-lg">
      <h1 className="mb-0 mt-10 text-2xl md:text-3xl">Place Order</h1>
      {loaded && cart.items.length ? (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          <div className="order-2 p-2 dark:bg-gray-900 md:order-1 md:col-span-2">
            <form
              onSubmit={handleSubmit((data) => {
                trigger({
                  ...data,
                  district: dist.data?.find((item) => item.id === data.district)
                    ?.name,
                  upazila: upazila.data?.find(
                    (item) => item.id === data.upazila
                  )?.name,
                  shipping: shippingCharge,
                  items: cart.items,
                  userId: user?.id,
                });
              })}
            >
              <label className={styles.label}>
                Receiver Name
                <input
                  autoFocus
                  type={"text"}
                  className={styles.input}
                  {...register("receiver")}
                />
              </label>
              {errors.receiver && (
                <p className={styles.errors}>{errors.receiver.message}</p>
              )}
              <label className={styles.label}>
                Phone No.
                <input
                  type={"text"}
                  className={styles.input}
                  {...register("phone")}
                />
              </label>
              {errors.phone && (
                <p className={styles.errors}>{errors.phone.message}</p>
              )}
              <label className={styles.label}>
                Email
                <input
                  type={"email"}
                  className={styles.input}
                  {...register("email")}
                />
              </label>
              {errors.email && (
                <p className={styles.errors}>{errors.email.message}</p>
              )}
              <fieldset className="mt-2 border p-1 dark:border-gray-600">
                <legend>&nbsp;Shipping Address&nbsp;</legend>
                <div className="grid grid-cols-2 gap-2">
                  <label className={styles.label}>
                    District
                    <select
                      disabled={dist.isLoading || !dist.data}
                      className={styles.input}
                      {...register("district")}
                    >
                      <option disabled value={""}>
                        Select an option
                      </option>
                      {dist.data?.map((dist) => (
                        <option key={dist.id} value={dist.id}>
                          {dist.name}
                        </option>
                      ))}
                    </select>
                    {errors.district && (
                      <p className={styles.errors}>{errors.district.message}</p>
                    )}
                  </label>
                  <label className={styles.label}>
                    Sub District
                    <select
                      disabled={dist.isLoading || !upazila.data}
                      className={styles.input}
                      {...register("upazila")}
                    >
                      <option disabled value={""}>
                        Select an option
                      </option>
                      {upazila.data?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {errors.upazila && (
                      <p className={styles.errors}>{errors.upazila.message}</p>
                    )}
                  </label>
                  <label className={`${styles.label ?? ""} col-span-2`}>
                    Street Address
                    <textarea
                      className={styles.input}
                      {...register("street")}
                    ></textarea>{" "}
                    {errors.street && (
                      <p className={styles.errors}>{errors.street.message}</p>
                    )}
                  </label>
                </div>
              </fieldset>
              <label className="mt-2 flex items-center gap-2">
                <input
                  type={"checkbox"}
                  className={"h-5 w-5"}
                  {...register("cod")}
                />{" "}
                Cash on delivery
              </label>
              <button
                type="submit"
                disabled={isMutating}
                className="mt-4 mr-2 bg-primary-500 px-4 py-2 transition-colors hover:bg-primary-600"
              >
                {isMutating
                  ? "loading..."
                  : cod
                  ? "Place My Order"
                  : "Proceed to payment"}
              </button>
              <button
                type="button"
                onClick={() => reset()}
                className="mt-4 px-4 py-2 transition-colors hover:text-primary-500"
              >
                Reset form
              </button>
            </form>
          </div>

          <div className="order-1 md:order-2">
            <table className="my-10 w-full bg-gray-100 dark:bg-gray-800">
              <caption className="mb-2 text-left text-lg font-medium">
                Order Summary
              </caption>
              <tbody>
                <tr>
                  <th className="px-2 py-1 text-left font-medium">
                    Cart total
                  </th>
                  <td className="px-2 py-1 text-right">
                    {currency.format(cart.total())}
                  </td>
                </tr>
                <tr>
                  <th className="px-2 py-1 text-left font-medium">
                    Shipping Charge
                  </th>
                  <td className="px-2 py-1 text-right">
                    {currency.format(shippingCharge)}
                  </td>
                </tr>

                <tr className="border-t-2">
                  <th className="px-2 py-1 text-left font-medium">
                    Grand total
                  </th>
                  <td className="px-2 py-1 text-right">
                    {currency.format(cart.total() + shippingCharge)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 py-6 text-center italic dark:bg-gray-800">
          Add products to cart to place order.
        </div>
      )}
    </div>
  );
}

export default Order;
