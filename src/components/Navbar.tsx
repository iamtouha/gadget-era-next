import Image from "next/image";
import Link from "next/link";
import NavArea from "./NavArea";

const Navbar = () => {
  return (
    <nav className="fixed inset-x-0 top-0 z-20 flex border-b bg-gray-50 px-4 py-2 dark:border-b-gray-700 dark:bg-gray-800">
      <Link href={"/"} className="flex items-center gap-1 sm:gap-2">
        <Image
          src={"/logo.svg"}
          width={40}
          height={40}
          alt="logo"
          className="h-8 w-8 dark:hidden sm:h-10 sm:w-10"
        />
        <Image
          src={"/logo-dark.svg"}
          width={40}
          height={40}
          alt="logo (dark themed)"
          className="hidden dark:block"
        />
        <h1 className="text-xl font-semibold sm:text-3xl">Gadget Era</h1>
      </Link>

      <NavArea />
    </nav>
  );
};

export default Navbar;
