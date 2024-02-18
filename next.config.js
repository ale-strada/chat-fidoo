/** @type {import('next').NextConfig} */
const nextConfig = {
	compiler: {
		styledComponents: true,
	},
	reactStrictMode: true,
	target: "server",
};

module.exports = nextConfig;
