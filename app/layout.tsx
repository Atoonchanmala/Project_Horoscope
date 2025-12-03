import type { Metadata } from "next";
import { Noto_Sans_Lao } from "next/font/google"; // เพิ่ม Noto_Sans_Lao
import "./globals.css";
import { siteMetadata } from "@/lib/site-metadata";

// ================= Noto Sans Lao =================
const notoLao = Noto_Sans_Lao({
  variable: "--font-noto-lao",
  subsets: ["lao"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.name}`,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: siteMetadata.name }],
  creator: siteMetadata.name,
  publisher: siteMetadata.name,
  category: "horoscope",
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.name,
    locale: siteMetadata.locale,
    type: "website",
    images: [
      {
        url: siteMetadata.openGraphImage,
        width: 1200,
        height: 630,
        alt: siteMetadata.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.openGraphImage],
  },
  alternates: {
    canonical: siteMetadata.siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/HorocopeIcon.png",
    shortcut: "/HorocopeIcon.png",
    apple: "/HorocopeIcon.png",
  },
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lo"> 
      <body
        className={`${notoLao.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
