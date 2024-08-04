import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import "../globals.css";
import { auth } from "@/app/services/auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react"
import Provider from "@/providers/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sicop",
  description: "Sistema de controle de produtividade!",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    {
      name: "MatheusAL",
      url: "https://www.linkedin.com/in/matheus-lima-b1486514a/",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-192x192.png" },
    { rel: "icon", url: "icons/icon-192x192.png" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <Provider >
          <body className={`${inter.className} flex bg-gray-100`}>
            <Sidebar />
            <div className="flex flex-col flex-1 max-width">
              <main >
                {children}
              </main>
            </div>
          </body>
        </Provider >
      </SessionProvider>
    </html>
  );
}
