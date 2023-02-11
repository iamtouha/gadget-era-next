import { Poppins } from "@next/font/google";
import Navbar from "@/components/Navbar";
import "../styles/globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" className={poppins.variable}>
        <head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </head>
        <body className="bg-gray-50 dark:bg-gray-900 dark:text-white">
          <Navbar />
          <div className="h-14" />
          {children}
        </body>
      </html>
    </>
  );
}
