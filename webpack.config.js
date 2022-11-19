import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WorkboxPlugin from 'workbox-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

const AppInfo = {
  name: 'Yet Another Todo Application',
  abbreviation: 'YATA!',
  description: 'Get your tasks done with this Yet Another Todo App!',
  author: 'Mark',
  color: {
    /* Bootstrap's Light and Dark colors */
    theme: '#212529',
    background: '#f8f9fa',
  },
  logo: './src/assets/icon.png',
};

/** @type {(env: any) => import('webpack').Configuration} */
export default (env) => {
  const { mode } = env;

  const plugins = [
    new HtmlWebpackPlugin({
      /* Descriptors; includes Open Graph information */
      title: AppInfo.abbreviation,
      meta: {
        description: AppInfo.description,
        'og:title': AppInfo.abbreviation,
        'og:description': AppInfo.description,
      },
    }),
    new MiniCssExtractPlugin({ filename: 'styles.css' }),

    /*  PWA compliance. Generates favicons and app manifest.
     *  Found by accident. Made by the same author as `HTMLWebpackPlugin`
     *  Found through fork: https://www.npmjs.com/package/app-manifest-webpack-plugin
     */
    new FaviconsWebpackPlugin({
      logo: AppInfo.logo,
      logoMaskable: AppInfo.logo, // PWA
      favicons: {
        appName: AppInfo.name,
        appShortName: AppInfo.abbreviation,
        appDescription: AppInfo.description,
      },
    }),
  ];
  if (mode === 'production') {
    /*  As detailed on Webpack's official PWA guide
     *  https://webpack.js.org/guides/progressive-web-application/
     *
     *  Triggers undesirable effects on development
     *  https://github.com/GoogleChrome/workbox/issues/1790
     */

    const pwa = new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    });
    plugins.push(pwa);
  }

  return {
    /* Essentials */
    entry: './src/script.js',
    output: {
      filename: 'script.js',
      clean: true,
    },
    mode,

    /* Development */
    devtool: 'eval-source-map',
    devServer: {
      static: './dist/',
      host: '0.0.0.0', // Broadcast on the network
      server: 'https',
    },

    /* Modifiers | Customizations | Additional Functionalities */
    plugins,
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
      ],
    },
  };
};
