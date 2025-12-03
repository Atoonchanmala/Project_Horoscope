import type { MetadataRoute } from "next";
import { siteMetadata } from "@/lib/site-metadata";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteMetadata.siteUrl.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: [`${baseUrl}/sitemap.xml`],
  };
}