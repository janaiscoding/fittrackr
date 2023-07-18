/** @type {import('next').NextConfig} */
const nextConfig = {
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
