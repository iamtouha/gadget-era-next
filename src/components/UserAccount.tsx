"use client";

import useSwr from "swr";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import Loading from "./Loading";

const fetchUser = (url: string) => fetch(url).then((res) => res.json());

const UserAccount = () => {
  const { data: user, isLoading } = useSwr("/api/user", fetchUser);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h1 className="my-6 text-3xl font-bold">My Account</h1>
      <dl className="space-y-4 text-gray-900 dark:text-gray-100">
        <div className="space-y-2">
          <dt className="font-medium text-gray-500 dark:text-gray-400">
            Username
          </dt>
          <dd className="text-gray-700 dark:text-gray-300">{user.username}</dd>
        </div>
        <div className="space-y-2">
          <dt className="font-medium text-gray-500 dark:text-gray-400">
            Email
          </dt>
          <dd className="text-gray-700 dark:text-gray-300">{user.email}</dd>
        </div>
        <button className="flex items-center space-x-2 border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
          <ArrowLeftOnRectangleIcon
            className="-ml-1 mr-2 h-5 w-5"
            aria-hidden="true"
          />
          <span>Sign out</span>
        </button>
      </dl>
    </div>
  );
};

export default UserAccount;
