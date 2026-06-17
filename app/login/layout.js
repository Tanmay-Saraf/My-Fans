import { Geist, Geist_Mono } from "next/font/google";
import '../globals.css'
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

export default function LoginLayout({ children }) {
  return (
      <SessionWrapper>
          {children}
      </SessionWrapper>
  );
}
