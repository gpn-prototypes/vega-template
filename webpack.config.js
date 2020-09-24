const merge = require('webpack-merge');
const dotenv = require('dotenv');
const webpack = require('webpack');
const path = require('path');

const { getAppConfig } = require('./app-config');

const appConfig = getAppConfig();

const gpnWebpack = require('@gpn-prototypes/frontend-configs/webpack.config')({
  appConfig,
  // eslint-disable-next-line global-require
  postCssConfig: { postcssOptions: { ...require('./postcss.config') } },
});

const commonWebpack = () => {
  const envConfig = dotenv.config();

  const env = envConfig.error ? {} : envConfig.parsed;

  const envKeys = Object.keys(env).reduce((prev, next) => {
    // eslint-disable-next-line no-param-reassign
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  const devServer = {
    ...gpnWebpack.devServer,
    historyApiFallback: true,
  };

  if (appConfig.useApiProxy) {
    devServer.proxy = {
      [appConfig.apiPath]: {
        target: appConfig.baseApiUrl,
        pathRewrite: {
          [`^${appConfig.apiPath}`]: '',
        },
      },
    };
  }

  return {
    plugins: [new webpack.DefinePlugin(envKeys)],
    devServer,
    resolve: {
      alias: {
        '@vega': path.resolve(__dirname, 'src'),
      },
    },
  };
};

module.exports = merge(commonWebpack(), gpnWebpack, {
  output: {
    publicPath: '/',
  },
});
