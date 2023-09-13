// /** @type {import('next').NextConfig} */
// module.exports = {
//   reactStrictMode: true,
// }

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
