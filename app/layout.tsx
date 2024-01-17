import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
// import { ModalProvider } from "@/provider/modal-provider";
// import { ToasterProvider } from "@/provider/toast-provider";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Store",
  description: "Create Your WebSite with Wings Web",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body >
        {/* <ToasterProvider />
        <ModalProvider /> */}
        {children}
      </body>
    </html>
  );
}
