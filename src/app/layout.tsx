import type { Metadata } from "next";
import { Suspense } from "react"; 
import { Fraunces, Inter } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "BookNook | A Small Online Library",
  description: "Browse, add, and borrow books from a cozy shared shelf.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${inter.variable} font-sans antialiased flex min-h-screen flex-col bg-[#EAE9E5] text-[#202426]`}>
        
        <Suspense fallback={<div className="h-[73px] border-b border-[#B4B0A8] bg-[#EAE9E5]"></div>}>
          <Navbar />
        </Suspense>
        
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;