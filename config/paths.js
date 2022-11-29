const path = require('path');

module.exports = {
  // Source files
  src: path.resolve(__dirname, '../src'),
  // node_modules files
  modules: path.resolve(__dirname, '../node_modules'),
  // Production build files
  build: path.resolve(__dirname, '../dist'),
  // build static assets
  buildAssets: 'assets',

  // Static files that get copied to build folder
  public: path.resolve(__dirname, '../public'),
  pages: path.resolve(__dirname, '../src/pages'),
};
