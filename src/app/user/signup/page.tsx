import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import SignUp from "@/components/SignUp";

const Signup = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    redirect("/user/account");
  }

  return (
    <main className="container mx-auto md:max-w-screen-md">
      <h1 className="lg:text4xl mt-8 mb-6 text-center text-2xl">
        Sign Up in Gadget Era
      </h1>
      <SignUp />
      <p className="mt-4">
        <Link
          href={"/user/signin"}
          className="text-primary-500 hover:underline"
        >
          Already have an account? Sign In instead.
        </Link>
      </p>
    </main>
  );
};

export default Signup;
