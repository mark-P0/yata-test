import path from 'node:path';
import { Plugins, Loaders } from './webpack.plugins.js';

/** @type {import('webpack').Configuration} */
export default {
  /* Essentials */
  entry: './src/script.js',
  output: {
    filename: 'script.js',
    clean: true,
  },
  resolve: {
    /* Import shorthands */
    alias: {
      src: path.resolve(process.cwd(), 'src'),
    },
  },

  /* Mode-specific */
  mode: 'production',

  /* Modifiers | Customizations | Additional Functionalities */
  optimization: {
    minimizer: ['...', Plugins.CSSMinimizer],
  },
  plugins: [
    Plugins.HTMLGenerator,
    Plugins.CSSGenerator,
    Plugins.WorkboxPWA,
    Plugins.FaviconsManifest,
  ],
  module: {
    rules: [Loaders.CSS, Loaders.SASS, Loaders.Images],
  },
};
