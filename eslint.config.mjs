import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  assetPrefix: isProd ? '/aishvarya779.github.io/' : '',
  basePath: isProd ? '/aishvarya779.github.io' : '',
  output: 'export',
};

module.exports = nextConfig

export default eslintConfig;
