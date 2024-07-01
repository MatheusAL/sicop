import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sicop",
  description: "prei prou",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex bg-gray-100`}>
        <Sidebar />
            
        <div className="flex flex-col flex-1">
          <main >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
