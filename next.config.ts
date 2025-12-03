import type { NextConfig } from "next";

const apiUrl = process.env.API_url;

if (!apiUrl) {
  throw new Error("Missing API_url environment variable.");
}

const nextConfig: NextConfig = {
  env: {
    API_url: apiUrl,
  },
};
export default nextConfig;
