"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWRMutation from "swr/mutation";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { signupFormSchema, type SignupFormInput } from "@/utils/schema";
import type { User } from "@/utils/types";

const signUp = async (url: string, { arg }: { arg: SignupFormInput }) => {
  const res = await fetch(url, { method: "POST", body: JSON.stringify(arg) });
  return (await res.json()) as SigninReturn;
};

type SigninReturn = {
  user?: User;
  message?: string;
  success?: boolean;
};

const SignUp = () => {
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation("/api/user/signup", signUp, {
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data: Record<string, any>) => {
      if (data.success) {
        toast.success("Welcome, " + data.user?.username);
        router.push("/user/account");
        return;
      }
      toast.error(data.message ?? "An error occured while signup.");
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm<SignupFormInput>({
    resolver: zodResolver(signupFormSchema),
  });

  const { password, passwordConfirm } = watch();

  return (
    <form onSubmit={handleSubmit((data) => trigger(data))}>
      <div className="mb-6">
        <label
          htmlFor="username"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Your username
        </label>
        <input
          type="text"
          id="username"
          className="dark:shadow-sm-light block w-full border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
          placeholder="yourname"
          {...register("username")}
          required
        />
        <p className="mt-1 text-red-500">{errors.username?.message}</p>
      </div>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          type="email"
          id="email"
          className="dark:shadow-sm-light block w-full border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
          placeholder="name@email.com"
          {...register("email")}
          required
        />
        <p className="mt-1 text-red-500">{errors.email?.message}</p>
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Set a password
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
      <div className="mb-6">
        <label
          htmlFor="password2"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirm password
        </label>
        <input
          type="password"
          id="password2"
          className="dark:shadow-sm-light block w-full border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
          required
          {...register("passwordConfirm")}
        />
        <p className="mt-1 text-red-500">
          {errors.passwordConfirm
            ? errors.passwordConfirm.message
            : touchedFields.passwordConfirm && passwordConfirm !== password
            ? "Passwords did not match."
            : null}
        </p>
      </div>

      <div className="mb-6 flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="terms"
            type="checkbox"
            className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600 dark:focus:ring-offset-gray-800"
            required
          />
        </div>
        <label
          htmlFor="terms"
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          I agree with the{" "}
          <Link
            href="/terms-and-conditions"
            className="text-primary-600 hover:underline dark:text-primary-500"
          >
            terms and conditions
          </Link>
        </label>
      </div>

      <button
        type="submit"
        disabled={isMutating}
        className="bg-primary-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-700"
      >
        {" "}
        {isMutating ? "loading..." : "Register new account"}
      </button>
    </form>
  );
};

export default SignUp;
