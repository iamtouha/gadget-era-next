import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        className="px-4 py-2 bg-primary-500 hover:bg-primary-600 transition duration-300 ease-in-out"
        href="/"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
