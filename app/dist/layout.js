"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var google_1 = require("next/font/google"); // เพิ่ม Noto_Sans_Lao
require("./globals.css");
var site_metadata_1 = require("@/lib/site-metadata");
// ================= Noto Sans Lao =================
var notoLao = google_1.Noto_Sans_Lao({
    variable: "--font-noto-lao",
    subsets: ["lao"],
    weight: ["400", "500", "700"]
});
exports.metadata = {
    metadataBase: new URL(site_metadata_1.siteMetadata.siteUrl),
    title: {
        "default": site_metadata_1.siteMetadata.title,
        template: "%s | " + site_metadata_1.siteMetadata.name
    },
    description: site_metadata_1.siteMetadata.description,
    keywords: site_metadata_1.siteMetadata.keywords,
    authors: [{ name: site_metadata_1.siteMetadata.name }],
    creator: site_metadata_1.siteMetadata.name,
    publisher: site_metadata_1.siteMetadata.name,
    category: "horoscope",
    openGraph: {
        title: site_metadata_1.siteMetadata.title,
        description: site_metadata_1.siteMetadata.description,
        url: site_metadata_1.siteMetadata.siteUrl,
        siteName: site_metadata_1.siteMetadata.name,
        locale: site_metadata_1.siteMetadata.locale,
        type: "website",
        images: [
            {
                url: site_metadata_1.siteMetadata.openGraphImage,
                width: 1200,
                height: 630,
                alt: site_metadata_1.siteMetadata.title
            },
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: site_metadata_1.siteMetadata.title,
        description: site_metadata_1.siteMetadata.description,
        images: [site_metadata_1.siteMetadata.openGraphImage]
    },
    alternates: {
        canonical: site_metadata_1.siteMetadata.siteUrl
    },
    robots: {
        index: true,
        follow: true
    },
    icons: {
        icon: "/HorocopeIcon.png",
        shortcut: "/HorocopeIcon.png",
        apple: "/HorocopeIcon.png"
    },
    themeColor: "#0f172a"
};
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement("html", { lang: "lo" },
        React.createElement("body", { className: notoLao.variable + " antialiased" }, children)));
}
exports["default"] = RootLayout;
