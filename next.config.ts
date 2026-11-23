import os from "node:os";
import type { NextConfig } from "next";

/**
 * This machine's own LAN addresses (e.g. the "Network: http://10.0.0.x:3000" URL that
 * `next dev` prints). Next.js blocks dev scripts for any origin other than localhost,
 * so without this, opening the site by its network address loads the HTML but none of
 * the JavaScript: the Atlas map and its Play button never start. Dev-only setting.
 */
const lanAddresses = Object.values(os.networkInterfaces())
  .flat()
  .filter((i): i is os.NetworkInterfaceInfo => !!i && i.family === "IPv4" && !i.internal)
  .map((i) => i.address);

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  allowedDevOrigins: lanAddresses,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
