import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "./components/Navbar";
import HomeNav from "./components/HomeNav";
import Footer from "./components/Footer";
import HomeLottie from "./lotties/home.json";
import Image from "next/image";
import HomeBg from "./assets/images/home.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "1930 Case Report Portal",
  description:
    "Join the forefront of public safety innovation with Circuit Slingers' AI-Powered Policing Portal. Our state-of-the-art solution transforms the way you interact with law enforcement. Experience a seamless online system for case filing, AI-generated questionnaires for detailed case analysis, and personalized legal guidance. With advanced analytics combating scams and a comprehensive police dashboard, we're setting new standards in effective and efficient policing. Our portal also offers a bilingual chatbot, integrated WhatsApp support, and a mobile app for on-the-go access. Ensuring your safety with technology at your fingertips. Explore the future of community safety today!",
};

// app/layout.tsx

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="main-blue">
        <Providers>
          <Navbar />
          <HomeNav />
          <Image
            src={HomeBg}
            alt="RBI guidelines"
            className="-z-50 absolute opacity-50 overflow-x-hidden w-full min-h-screen max-h-screen object-cover "
          />
          {children}

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
