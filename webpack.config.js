const path = require('path');

const libraryName = 'vTranslit';
const filename = 'vtranslit';

const baseConfig = {
  entry: './src/index.js',
  module: {
    loaders: [{
      exclude: /node_modules/,
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-env']
        }
      }
    }]
  }
};

const browserConfig = Object.assign({}, baseConfig, {

  output: {
    filename: `${filename}.js`,
    library: libraryName,
    libraryExport: libraryName,
    libraryTarget: 'window',
    path: path.join(__dirname, 'dist')
  }

});

const npmConfig = Object.assign({}, baseConfig, {

  output: {
    filename: `${filename}.npm.js`,
    library: libraryName,
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist')
  }

});

module.exports = [
  browserConfig,
  npmConfig
];
