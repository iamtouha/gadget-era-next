"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import { toast } from "react-toastify";
import { signinFormSchema, type SigninFormInput } from "@/utils/schema";
import { useRouter } from "next/navigation";

const signIn = async (url: string, { arg }: { arg: SigninFormInput }) => {
  const res = await fetch(url, { method: "POST", body: JSON.stringify(arg) });
  return await res.json();
};

const SignIn = () => {
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation("/api/user/signin", signIn, {
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data: Record<string, any>) => {
      if (data.success) {
        toast.success("Welcome back, " + data.user?.username);
        router.push("/user/account");
        return;
      }
      toast.error(data.message ?? "An error occured while signin.");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormInput>({
    resolver: zodResolver(signinFormSchema),
  });

  return (
    <form onSubmit={handleSubmit((data) => trigger(data))}>
      <div className="mb-6">
        <label
          htmlFor="username"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Your username or email
        </label>
        <input
          type="text"
          id="username"
          className="dark:shadow-sm-light block w-full border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
          placeholder="yourname"
          {...register("ideintifier")}
          required
        />
        <p className="mt-1 text-red-500">{errors.ideintifier?.message}</p>
      </div>

      <div className="mb-6">
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Your password
        </label>
        <input
          type="password"
          id="password"
          className="dark:shadow-sm-light block w-full border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
          required
          {...register("password")}
        />
        <p className="mt-1 text-red-500">{errors.password?.message}</p>
      </div>

      <button
        disabled={isMutating}
        type="submit"
        className="bg-primary-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-700"
      >
        {isMutating ? "loading..." : "Sign In"}
      </button>
    </form>
  );
};

export default SignIn;
