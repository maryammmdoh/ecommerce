import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://ecommerce.routemisr.com/**/**")],
  },
};

export default withFlowbiteReact(nextConfig);