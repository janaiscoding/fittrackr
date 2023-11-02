/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dzj44ru2r/**",
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/",
        missing: [
          {
            type: "cookie",
            key: "token",
          },
        ],
        destination: "/login",
        permanent: false,
      },
      {
        source: "/users",
        missing: [
          {
            type: "cookie",
            key: "token",
          },
        ],
        destination: "/login",
        permanent: false,
      },
      {
        source: "/users/:slug",
        missing: [
          {
            type: "cookie",
            key: "token",
          },
        ],
        destination: "/login",
        permanent: false,
      },
      {
        source: "/posts",
        missing: [
          {
            type: "cookie",
            key: "token",
          },
        ],
        destination: "/",
        permanent: false,
      },
      {
        source: "/posts/:slug",
        missing: [
          {
            type: "cookie",
            key: "token",
          },
        ],
        destination: "/",
        permanent: false,
      },
      {
        source: "/login",
        has: [
          {
            type: "cookie",
            key: "token",
          },
        ],
        destination: "/",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
