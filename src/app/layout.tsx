import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://letef-mm.onrender.com"),
  title: "Letef Mm — Trusted P2P Escrow | On-Chain USDT Escrow in Telegram",
  description:
    "Letef Mm is a P2P escrow service for stablecoin trades. Funds are locked in a smart contract, released only when both sides confirm, and every completed deal is publicly vouched. From 0.25% fee.",
  openGraph: {
    title: "Letef Mm — Trusted P2P Escrow",
    description:
      "Funds locked in a smart contract. Released only when both sides confirm. Every completed deal publicly vouched. From 0.25% fee.",
    url: "https://letef-mm.onrender.com",
    siteName: "Letef Mm",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Letef Mm — Trusted P2P Escrow" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Letef Mm — Trusted P2P Escrow",
    description:
      "Funds locked in a smart contract. Released only when both sides confirm. From 0.25% fee.",
    images: ["/og.jpg"],
  },
  icons: { icon: "/favicon.png" },
};

export const viewport: Viewport = {
  themeColor: "#0B0E11",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
