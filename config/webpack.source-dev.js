const { merge } = require('webpack-merge');
const paths = require('./paths');
const common = require('./webpack.common');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: 'source-map',

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
      writeToDisk: true,
    },
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: false,
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
    new MiniCssExtractPlugin({
      filename: `${paths.buildAssets}/styles/[name].css`,
      chunkFilename: '[name].css',
    }),
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
        test: /\.(sass|scss|css)$/,
        use: [
          //
          MiniCssExtractPlugin.loader,
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
