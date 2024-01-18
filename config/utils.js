const HtmlWebpackPlugin = require('html-webpack-plugin');
const BeautifyHtmlWebpackPlugin = require('@sumotto/beautify-html-webpack-plugin');
const fs = require('fs');
const paths = require('./paths');

exports.pages = function (folder = '') {
  const viewsFolder = folder;

  var pages = [];

  fs.readdirSync(viewsFolder).forEach((view) => {
    if (view.split('.')[1] === undefined) return false;

    const viewName = view.split('.')[0];
    const fileName = `${view.replace(/\.njk/, '.html')}`;
    const buildPath =
      process.env.NODE_ENV === 'deploy'
        ? `${paths.serverThemePath}${paths.buildAssets}`
        : paths.buildAssets;
    const options = {
      filename: fileName,
      template: `${viewsFolder}/${view}`,
      inject: 'body',
      minify: false,
      templateParameters: {
        fonts: `${buildPath}/fonts`,
        images: `${buildPath}/images`,
      },
    };
    pages.push(new HtmlWebpackPlugin(options));
    if (process.env.NODE_ENV !== 'development') {
      pages.push(
        new BeautifyHtmlWebpackPlugin({
          html: {
            max_preserve_newlines: 1,
            indent_size: 4,
          },
        })
      );
    }
  });

  return pages;
};
