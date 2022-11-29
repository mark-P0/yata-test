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
  mode: 'development',
  devtool: 'eval-source-map', // Suggested as best: https://webpack.js.org/configuration/devtool/#development
  devServer: {
    static: './dist/',
    host: '0.0.0.0', // Broadcast on the network

    /*  Self-signed certificate; flagged as insecure.
     *  `localhost` is "secure" even on HTTP.
     *  https://web.dev/how-to-use-local-https/
     *
     *  For some reason, Webpack's server goes into an infinite refresh loop without this...
     */
    server: 'https',
  },

  /* Modifiers | Customizations | Additional Functionalities */
  plugins: [
    Plugins.HTMLGenerator,
    Plugins.CSSGenerator,
    Plugins.FaviconsManifest,
  ],
  module: {
    rules: [Loaders.CSS, Loaders.SASS, Loaders.Images],
  },
};
