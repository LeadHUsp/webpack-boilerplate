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

    const options = {
      filename: fileName,
      template: `${viewsFolder}/${view}`,
      inject: 'body',
      minify: false,
      templateParameters: {
        fonts: `${paths.buildAssets}/fonts`,
      },
    };

    pages.push(
      new HtmlWebpackPlugin(options),
      new BeautifyHtmlWebpackPlugin({
        html: {
          max_preserve_newlines: 1,
          indent_size: 4,
        },
      })
    );
  });

  return pages;
};
