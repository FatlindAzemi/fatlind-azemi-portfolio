import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Explicit workspace root: a stray package-lock.json sits in the parent
  // /Users/fatlind/Projekte directory and would otherwise trigger Next's
  // "multiple lockfiles" warning. Pointing turbopack at the project dir
  // silences the guesswork.
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Tree-shake heavy client libs: only the named exports ship to the browser.
    optimizePackageImports: ["lucide-react", "three", "framer-motion"],
  },
};

export default nextConfig;
