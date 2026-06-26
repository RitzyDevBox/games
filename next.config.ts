import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pure static frontend — no Node server at runtime. Builds to ./out as
  // plain HTML/JS that talks directly to smart contracts over RPC.
  // Deployable to IPFS / Arweave / any static CDN.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
