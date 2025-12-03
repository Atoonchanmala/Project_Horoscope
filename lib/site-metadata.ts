const DEFAULT_SITE_URL = "https://manmorai.com";

export const siteMetadata = {
  name: "ManMORAI",
  title: "ManMORAI Horoscope Insights",
  description:
    "Discover personalized astrology guidance, zodiac compatibility, and AI-assisted horoscope readings with ManMORAI.",
  keywords: [
    "ManMORAI",
    "horoscope",
    "astrology",
    "zodiac",
    "daily horoscope",
    "birth chart",
    "compatibility",
  ],
  locale: "en_US",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL,
  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "team@manmorai.com",
  openGraphImage: "/HorocopeIcon.png",
};

export type SiteMetadata = typeof siteMetadata;
