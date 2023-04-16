import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import CustomToastContainer from "@/components/ToastContainer";
import Footer from "@/components/Footer";
import VercelAnalytics from "@/components/Analytics";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: {
    default: "Home | Gadget Era",
    template: "%s | Gadget Era",
  },
  description:
    "Shop the latest wristwatches and electronics at Gadget Era. Find high-quality products at affordable prices, with exceptional customer service. Discover why we're the go-to destination for wristwatches and electronics.",
  openGraph: {
    images: [{ url: "/api/og?text=Welcome%20to%20Gadget%20Era!" }],
    description:
      "Shop the latest wristwatches and electronics at Gadget Era. Find high-quality products at affordable prices, with exceptional customer service. Discover why we're the go-to destination for wristwatches and electronics.",
  },
};

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
        <body className="bg-neutral-50 dark:bg-neutral-900 dark:text-white">
          <Navbar />
          <div className="h-14" />
          <div>
            {children}
            <div className="h-6 print:hidden" />
          </div>
          <div className="print:hidden">
            <CustomToastContainer />
          </div>
          <Footer />
          <VercelAnalytics />
        </body>
      </html>
    </>
  );
}
