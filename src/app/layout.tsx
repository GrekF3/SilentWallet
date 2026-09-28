import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://silent-wallet-landing.vercel.app"),
  title: "Silent Wallet",
  description: "Self-custodial wallet for ETH, BTC, BNB, and SOL.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png"
  },
  openGraph: {
    title: "Silent Wallet",
    description: "Self-custodial wallet for ETH, BTC, BNB, and SOL.",
    images: ["/icon-512.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
