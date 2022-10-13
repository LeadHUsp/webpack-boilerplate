const CopyWebpackPlugin = require('copy-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

const paths = require('./paths');
const utils = require('./utils');
const path = require('path');
module.exports = {
  // Where webpack looks to start building the bundle
  entry: [paths.src + '/index.js'],

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  // Customize the webpack build process
  plugins: [
    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: paths.buildAssets,
          globOptions: {
            ignore: ['*.DS_Store', '**/icons/*.svg'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    ...utils.pages(paths.pages),
    // new SVGSpritemapPlugin(`${paths.public}/icons/*.svg`, {
    //   output: {
    //     filename: `assets/sprite.svg`,
    //     svg4everybody: true,
    //     svgo: true,
    //     svg: {
    //       sizes: false,
    //     },
    //   },
    //   sprite: {
    //     prefix: false,
    //     gutter: 5,
    //     generate: {
    //       title: false,
    //       use: true,
    //       // view: '-fragment',
    //       symbol: true,
    //     },
    //   },
    // }),
    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.(js|jsx|es6)$/, use: ['babel-loader'] },

      // Images: Copy image files to build folder
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: `${paths.buildAssets}/images/[name][hash][ext]`,
        },
        exclude: `${paths.public}/fonts`,
      },

      // Fonts and SVGs: Inline files
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        type: 'asset/resource',
        generator: {
          filename: `${paths.buildAssets}/fonts/[name][ext]`,
        },
        exclude: [`${paths.public}/icons`, `${paths.public}/`],
      },
      {
        test: /\.(html|njk|nunjucks)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'simple-nunjucks-loader',
            options: {
              searchPaths: paths.src,
              assetsPaths: [`${paths.src}/blocks`, paths.public],
            },
          },
        ],
      },
    ],
  },

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': paths.src,
      '@public': paths.public,
    },
  },
};
