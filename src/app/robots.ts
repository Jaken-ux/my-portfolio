import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://my-portfolio-jaken-uxs-projects.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/nav-v2", "/start-v2", "/test"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
