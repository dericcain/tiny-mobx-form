import { css } from 'docz-plugin-css';

export default {
  dest: './docs',
  hashRouter: true,
  base: '/tiny-mobx-form/',
  menu: [
    'The Basics',
    'Examples'
  ],
  plugins: [
    css({
      preprocessor: 'sass',
    }),
  ],
  themeConfig: {
    colors: {
      primary: '#73A0D4',
    },
  },
};
