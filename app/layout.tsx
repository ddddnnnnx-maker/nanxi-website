import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollBackground from "@/components/ScrollBackground";
import CustomCursor from "@/components/CustomCursor";
import CornerFrame from "@/components/CornerFrame";
import TopNav from "@/components/TopNav";
import LangToggle from "@/components/LangToggle";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nanxi Dao — Designer",
  description:
    "Portfolio of Nanxi Dao — product & UX/UI designer. Swiss/editorial, quiet and precise.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-paper font-sans text-ink antialiased">
        <LangProvider>
          <SmoothScroll>
            <ScrollBackground />
            <CustomCursor />
            <CornerFrame />
            <TopNav />
            <LangToggle />
            {children}
          </SmoothScroll>
        </LangProvider>
      </body>
    </html>
  );
}
