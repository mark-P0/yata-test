const configs = {
  development: (await import('./webpack/webpack.dev.js')).default,
  production: (await import('./webpack/webpack.prod.js')).default,
};

/*  Webpack configuration as a function
 *  https://webpack.js.org/configuration/configuration-types/#exporting-a-function
 */
export default (env, argv) => {
  const { mode } = argv;

  return configs[mode];
};
