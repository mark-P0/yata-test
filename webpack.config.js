import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const HTML = {
  title: 'YATA!',
  description: 'Get your tasks done with this Yet Another Todo App!',
  themeColor: '#212529',
};

/** @type {import('webpack').Configuration} */
export default {
  /* Essentials */
  entry: './src/script.js',
  output: {
    filename: 'script.js',
    clean: true,
  },

  /* Development */
  devtool: 'eval-source-map',
  devServer: {
    static: './dist',
    host: '0.0.0.0',
    server: 'https',
  },

  plugins: [
    new HtmlWebpackPlugin({
      /* Descriptors */
      title: HTML.title,
      meta: {
        description: HTML.description,
        'og:title': HTML.title,
        'og:description': HTML.description,

        'theme-color': HTML.themeColor, // PWA
      },

      /* PWA compliance */
      favicon: './src/assets/icon.png',
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};
