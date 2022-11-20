import { Plugins, Loaders } from './webpack.plugins.js';

/** @type {import('webpack').Configuration} */
export default {
  /* Essentials */
  entry: './src/script.js',
  output: {
    filename: 'script.js',
    clean: true,
  },

  /* Mode-specific */
  mode: 'production',

  /* Modifiers | Customizations | Additional Functionalities */
  plugins: [
    Plugins.HTMLGenerator,
    Plugins.CSSGenerator,
    Plugins.WorkboxPWA,
    Plugins.FaviconsManifest,
  ],
  module: {
    rules: [Loaders.CSS, Loaders.SASS],
  },
};
