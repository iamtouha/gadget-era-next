import Navbar from "@/components/Navbar";
import "../styles/globals.css";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Gadget Era</title>
        </head>
        <body className="bg-gray-50 dark:bg-gray-900 dark:text-white">
          <Navbar />
          {children}
        </body>
      </html>
    </>
  );
}
