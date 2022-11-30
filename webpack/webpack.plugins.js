import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import WorkboxPlugin from 'workbox-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

const AppInfo = {
  name: 'YATA!',
  description: 'Get your tasks done with this Yet Another Todo App!',
  baseUrl: '/yata/?homescreen=1', // Will be a GitHub Pages subdirectory
  color: {
    /* Bootstrap's Light and Dark colors */
    theme: '#212529',
    background: '#f8f9fa',
  },
  logo: './src/assets/icon.png',
};

const Plugins = {
  HTMLGenerator: new HtmlWebpackPlugin({
    template: './src/view/index.ejs',
    /* Descriptors; includes Open Graph information */
    title: AppInfo.name,
    meta: {
      description: AppInfo.description,
      'og:title': AppInfo.name,
      'og:description': AppInfo.description,
    },
  }),

  CSSGenerator: new MiniCssExtractPlugin({ filename: 'styles.css' }),
  CSSMinimizer: new CssMinimizerPlugin(), // CSSNano

  /*  As detailed on Webpack's official PWA guide
   *  https://webpack.js.org/guides/progressive-web-application/
   *
   *  Only available at production;
   *  triggers undesirable effects on development
   *  https://github.com/GoogleChrome/workbox/issues/1790
   */
  WorkboxPWA: new WorkboxPlugin.GenerateSW({
    clientsClaim: true,
    skipWaiting: true,
  }),

  /*  PWA compliance. Generates favicons and app manifest.
   *  Found by accident. Made by the same author as `HTMLWebpackPlugin`
   *  Found through fork: https://www.npmjs.com/package/app-manifest-webpack-plugin
   */
  FaviconsManifest: new FaviconsWebpackPlugin({
    logo: AppInfo.logo,

    /*  Info for app manifest
     *  https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json
     *  https://web.dev/add-manifest/
     *  https://github.com/itgalaxy/favicons#usage
     *  https://github.com/jantimon/favicons-webpack-plugin#basic
     */
    favicons: {
      appName: AppInfo.name,
      appShortName: AppInfo.name,
      appDescription: AppInfo.description,
      start_url: AppInfo.baseUrl,
      theme_color: AppInfo.color.theme,
      background: AppInfo.color.background,
    },
  }),
};

/* For additional functionalities that the above plugins may need */
const Loaders = {
  CSS: {
    test: /\.css$/i,
    use: [MiniCssExtractPlugin.loader, 'css-loader'],
  },

  /* Mostly for Bootstrap's sources */
  SASS: {
    test: /\.s[ac]ss$/i,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
  },

  Images: {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  },
};

export { Plugins, Loaders };
