import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ResetPassword from "@/components/ResetPassword";

const page = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    redirect("/user/account");
  }

  return (
    <main className="container mx-auto md:max-w-screen-md">
      <h1 className="lg:text4xl mt-8 mb-6 text-center text-2xl">
        Reset Password
      </h1>
      <ResetPassword />
      <p className="mt-4">
        <Link
          href={"/user/signup"}
          className="text-primary-500 hover:underline"
        >
          Sign up instead
        </Link>
      </p>
    </main>
  );
};

export default page;
