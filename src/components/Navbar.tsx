import Image from "next/image";
import Link from "next/link";
import NavArea from "./NavArea";

const Navbar = () => {
  return (
    <nav className="flex bg-gray-50 px-4 py-2 dark:bg-gray-800">
      <Link href={"/"} className="flex items-center gap-2">
        <Image
          src={"/logo.svg"}
          width={40}
          height={40}
          alt="logo"
          className="dark:hidden"
        />
        <Image
          src={"/logo-dark.svg"}
          width={40}
          height={40}
          alt="logo (dark themed)"
          className="hidden dark:block"
        />
        <h1 className="text-2xl font-semibold sm:text-3xl">Gadget Era</h1>
      </Link>

      <NavArea />
    </nav>
  );
};

export default Navbar;
