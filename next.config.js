/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "uploads-ssl.webflow.com",
      "res.cloudinary.com",
      "media.istockphoto.com",
      "i.ytimg.com"
    ],
  },
};

module.exports = nextConfig;
