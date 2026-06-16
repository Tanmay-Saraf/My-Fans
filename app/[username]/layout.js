import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from '@/components/Navbar.js'
import Footer from '@/components/Footer.js'
import SessionWrapper from "@/components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MyFans",
  description: "A crowdfunding platform",
};

export default function UsernameLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex flex-col bg-black min-h-screen">
        <SessionWrapper>
          <Navbar />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
