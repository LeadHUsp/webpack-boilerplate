const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const path = require('path');

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
    };

    pages.push(new HtmlWebpackPlugin(options));
  });

  return pages;
};
