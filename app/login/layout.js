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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <SessionWrapper>
        <body className="flex flex-col bg-black">
          {children}
        </body>
      </SessionWrapper>
    </html>
  );
}
