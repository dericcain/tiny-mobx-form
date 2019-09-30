import pkg from './package.json';

export default {
  title: pkg.name,
  description: pkg.description,
  typescript: true,
  dest: './docs',
  hashRouter: false,
  base: '/tiny-mobx-form/',
  // menu: [
  //   'The Basics',
  //   'Examples'
  // ],
  themeConfig: {
    colors: {
      primary: '#73A0D4',
    },
  },
};
