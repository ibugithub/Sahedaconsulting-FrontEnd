import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar/navbar";
import Footer from "@/components/Footer/footer";
import StoreProvider from "./StoreProvider";


export const metadata: Metadata = {
  title: "Saheda Consulting",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className="bg-white">
          <Navbar />
          <ToastContainer />
          <div className=" min-h-screen bg-white">{children}</div>
          <Footer />
        </body>
      </html>
    </StoreProvider>
  );
}
