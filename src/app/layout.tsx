import { Metadata } from "next";
import { Geist } from "next/font/google";
import { ReactNode } from "react";

import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";

import "./globals.css";

const geist = Geist({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "fadhilkholaf",
  description: "fadhilkholaf laboratory, playground, and experiment site",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <body className={cn(geist.className, "bg-black text-white antialiased")}>
        <Navbar />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
