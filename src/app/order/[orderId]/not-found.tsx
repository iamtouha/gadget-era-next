import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <h1 className="mb-4 text-4xl font-bold text-neutral-800 dark:text-white">
        Order Not Found
      </h1>
      <p className="mb-8 text-lg text-neutral-600 dark:text-neutral-400">
        Sorry, seems like your order is not found.
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
