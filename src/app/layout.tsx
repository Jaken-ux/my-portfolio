import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Fraunces — display face for h1/h2. Variable font, non-italic only.
// Additional axes (SOFT, WONK) are requested so we can tune them later
// via font-variation-settings; opsz is enabled so the browser
// automatically picks the right optical size based on rendered font-size.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://my-portfolio-jaken-uxs-projects.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jacob Jansson — UX Designer",
    template: "%s — Jacob Jansson",
  },
  description:
    "UX Designer with 13+ years of experience in complex products, B2B systems, and UX strategy. Based in Gothenburg, Sweden.",
  keywords: [
    "UX Designer",
    "Jacob Jansson",
    "UX Strategy",
    "Product Design",
    "Gothenburg",
    "B2B",
    "Enterprise UX",
    "Interaction Design",
    "User Research",
  ],
  authors: [{ name: "Jacob Jansson" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Jacob Jansson — UX Designer",
    title: "Jacob Jansson — UX Designer",
    description:
      "UX Designer with 13+ years of experience in complex products, B2B systems, and UX strategy.",
    images: [
      {
        url: "/images/about/profilbild.jpg",
        width: 800,
        height: 800,
        alt: "Jacob Jansson",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jacob Jansson — UX Designer",
    description:
      "UX Designer with 13+ years of experience in complex products, B2B systems, and UX strategy.",
    images: ["/images/about/profilbild.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable} antialiased`}>
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
