import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://letef-mm-website.vercel.app"),
  title: "Letef Mm — Trusted P2P Escrow | On-Chain USDT Escrow in Telegram",
  description:
    "Letef Mm is a P2P escrow service for stablecoin trades. Funds are locked in a smart contract, released only when both sides confirm, and every completed deal is publicly vouched. From 0.25% fee.",
  openGraph: {
    title: "Letef Mm — Trusted P2P Escrow",
    description:
      "Funds locked in a smart contract. Released only when both sides confirm. Every completed deal publicly vouched. From 0.25% fee.",
    url: "https://letef-mm-website.vercel.app",
    siteName: "Letef Mm",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.png" },
};

export const viewport: Viewport = {
  themeColor: "#0B0E11",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${grotesk.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
