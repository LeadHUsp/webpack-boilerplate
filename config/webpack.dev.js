const { merge } = require('webpack-merge');
const paths = require('./paths');
const common = require('./webpack.common');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: 'inline-source-map',

  // Spin up a server for quick development
  devServer: {
    client: {
      logging: 'error',
    },
    static: {
      directory: paths.public,
      // publicPath: '/serve-public-path-url',
    },
    devMiddleware: {
      writeToDisk: process.env.NODE_ENV_DISK === 'disk',
    },
    historyApiFallback: true,
    open: true,
    compress: false,
    hot: true,
    liveReload: true,
    watchFiles: {
      paths: `${paths.src}/**/*.njk`,
      options: {
        ignored: /node_modules/,
        poll: true,
      },
    },
    port: 8080,
  },
  plugins: [
    new BrowserSyncPlugin(
      // BrowserSync options
      {
        // browse to http://localhost:3000/ during development
        host: 'localhost',
        port: 8080,
        open: false,
        // proxy the Webpack Dev Server endpoint
        // (which should be serving on http://localhost:3100/)
        // through BrowserSync
        proxy: 'http://localhost:8080/',
      },
      // plugin options
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false,
      }
    ),
  ],
  module: {
    rules: [
      // Styles: Inject CSS into the head with source maps
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1, modules: false },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
});
