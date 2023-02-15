import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="mb-4 text-4xl font-bold text-gray-800 dark:text-white">
        Order Not Found
      </h1>
      <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
        Sorry, we couldn't find the this order.
      </p>
      <Link
        href="/"
        className="bg-primary-500 py-2 px-4 font-semibold text-white hover:bg-primary-600"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
