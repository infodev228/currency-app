import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["flagsapi.com"], // Add the domain here
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/exchange",
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;
