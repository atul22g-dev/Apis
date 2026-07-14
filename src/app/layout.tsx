import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/lib/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Atual APIs | Dashboard",
  description: "A comprehensive collection of APIs for projects, movies, products, wallpapers and more.",
  keywords: ["apis", "projects", "movies", "products", "wallpapers", "dashboard"],
  openGraph: {
    title: "Atual APIs",
    description: "Your central API hub for projects, movies, products and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased min-h-screen bg-[#070708]`}>
        <AuthProvider>
          <Navbar />
          <main className="relative">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
