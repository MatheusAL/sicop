import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { auth } from "@/app/services/auth";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sicop",
  description: "prei prou",
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if(session) {
    redirect('/');
  }
  return (
    <html lang="en">
      <body className={`${inter.className} flex bg-gray-100`}>
            
        <div className="flex flex-col flex-1">
          <main >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
