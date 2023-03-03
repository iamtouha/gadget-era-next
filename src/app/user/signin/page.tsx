import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SignIn from "@/components/SignIn";

const page = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    redirect("/user/account");
  }

  return (
    <main className="container mx-auto md:max-w-screen-md">
      <h1 className="lg:text4xl mt-8 mb-6 text-center text-2xl">Sign In</h1>
      <SignIn />
      <p className="mt-4">
        <Link
          href={"/user/signup"}
          className="text-primary-500 hover:underline"
        >
          Don't have an account? Sign Up instead.
        </Link>
      </p>
    </main>
  );
};

export default page;
