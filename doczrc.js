import { css } from 'docz-plugin-css';
import pkg from './package.json';

export default {
  title: pkg.name,
  description: pkg.description,
  typescript: true,
  dest: './docs',
  hashRouter: true,
  base: '/tiny-mobx-form/',
  themeConfig: {
    colors: {
      primary: '#73A0D4',
    },
  },
  plugins: [
    css(),
  ],
};
