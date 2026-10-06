import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Archivo — grotesk display face for h1/h2. Variable font, non-italic only,
// weight range 500-700. No opsz/SOFT/WONK axes — Archivo doesn't have them.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://my-portfolio-jaken-uxs-projects.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jacob Jansson — Senior UX & Product Designer",
    template: "%s — Jacob Jansson",
  },
  description:
    "Senior UX & Product Designer with 13+ years in UX. Research, interaction design and AI-assisted product development, from idea to launched product. Based in Stockholm, Sweden.",
  keywords: [
    "UX Designer",
    "Jacob Jansson",
    "UX Strategy",
    "Product Design",
    "Stockholm",
    "B2B",
    "Enterprise UX",
    "Interaction Design",
    "User Research",
  ],
  authors: [{ name: "Jacob Jansson" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Jacob Jansson — Senior UX & Product Designer",
    title: "Jacob Jansson — Senior UX & Product Designer",
    description:
      "Senior UX & Product Designer with 13+ years in UX. Research, interaction design and AI-assisted product development, from idea to launched product. Based in Stockholm, Sweden.",
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
    title: "Jacob Jansson — Senior UX & Product Designer",
    description:
      "Senior UX & Product Designer with 13+ years in UX. Research, interaction design and AI-assisted product development, from idea to launched product. Based in Stockholm, Sweden.",
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
      <body className={`${inter.variable} ${archivo.variable} antialiased`}>
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
