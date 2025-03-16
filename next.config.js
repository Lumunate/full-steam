import './src/env.js';
import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import("next").NextConfig} */
const config = {
  transpilePackages: ['@mui/material', '@mui/system', '@emotion/react', '@emotion/styled'],
  optimizeFonts: false,
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(config);