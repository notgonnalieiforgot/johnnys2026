import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond, Pacifico } from "next/font/google";
import "./globals.css";
import SectionLoader from "@/components/SectionLoader";
import AgeGate from "@/components/AgeGate";
import Toaster from "@/components/Toaster";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

// Brush-script for the Johnny's wordmark + "J" loader.
// Pacifico is the closest free match to the original logo's hand-lettered style.
const script = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-script",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://johnnyssmokeshop.com"),
  title: {
    default: "Johnny's Smoke Shop & Kava Bar | St. Pete & Tampa Bay",
    template: "%s · Johnny's Smoke Shop & Kava Bar",
  },
  description:
    "Escape the everyday at Johnny's. Tampa Bay's premier destination for fresh-brewed Kratom, Kava, Delta-8, vapes, and premium smoke shop accessories.",
  keywords: [
    "smoke shop",
    "kava bar",
    "kratom bar",
    "St. Petersburg",
    "Tampa Bay",
    "Delta-8",
    "vape shop",
    "glass pipes",
    "Johnny's",
  ],
  authors: [{ name: "Johnny's Smoke Shop & Kava Bar" }],
  openGraph: {
    title: "Johnny's Smoke Shop & Kava Bar | St. Pete & Tampa Bay",
    description:
      "Fresh-brewed Kratom, Kava, Delta-8, vapes, glass, and apparel. 8 locations across Tampa Bay.",
    url: "https://johnnyssmokeshop.com",
    siteName: "Johnny's Smoke Shop & Kava Bar",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Johnny's Smoke Shop & Kava Bar | St. Pete & Tampa Bay",
    description:
      "Tampa Bay's premier destination for Kava, Kratom, Delta-8, vapes, and smoke shop accessories.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#070605",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${script.variable}`}>
      <body className="bg-ink-950 text-bone font-sans antialiased min-h-screen overflow-x-hidden">
        <AgeGate />
        <SectionLoader />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
