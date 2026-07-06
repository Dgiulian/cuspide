/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // port: '',
        // pathname: '/account123/**',
        // search: '',
      },
      {
        protocol: "https",
        hostname: "*.media.strapiapp.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        // hostname: "/images/**",
      },
    ],
  },
  serverExternalPackages: ["pdfkit"],
  async redirects() {
    return [
      {
        source: "/busqueda",
        destination: "/propiedades",
        permanent: true,
      },
      {
        source: "/busqueda/:path*",
        destination: "/propiedades",
        permanent: true,
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
