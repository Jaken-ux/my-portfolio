import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
