"use client";

import useSwr from "swr";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import Loading from "./Loading";
import pb from "@/lib/pb";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { fetchUser } from "@/lib/functions";

const UserAccount = () => {
  const router = useRouter();
  const { data: user, isLoading } = useSwr("/api/user", fetchUser);

  const signOut = () => {
    pb.authStore.clear();
    deleteCookie("token");
    router.push("/user/signin");
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!user) return <></>;

  return (
    <section aria-label="my account">
      <h1 className="my-6 text-3xl font-bold">My Account</h1>
      <dl className="space-y-4 text-neutral-900 dark:text-neutral-100">
        <div className="space-y-2">
          <dt className="font-medium text-neutral-500 dark:text-neutral-400">
            Username
          </dt>
          <dd className="text-neutral-700 dark:text-neutral-300">
            {user.username}
          </dd>
        </div>
        <div className="space-y-2">
          <dt className="font-medium text-neutral-500 dark:text-neutral-400">
            Email
          </dt>
          <dd className="text-neutral-700 dark:text-neutral-300">
            {user.email}
          </dd>
        </div>
        <button
          onClick={signOut}
          className="flex items-center space-x-2 border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <ArrowLeftOnRectangleIcon
            className="-ml-1 mr-2 h-5 w-5"
            aria-hidden="true"
          />
          <span>Sign out</span>
        </button>
      </dl>
    </section>
  );
};

export default UserAccount;
