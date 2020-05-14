const path = require('path');

const libraryName = 'vTranslit';
const filename = 'vtranslit';

const baseConfig = {
  entry: './src/index.js',
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};

const browserConfig = Object.assign({}, baseConfig, {
  output: {
    filename: `${filename}.js`,
    library: libraryName,
    libraryExport: libraryName,
    libraryTarget: 'window',
    path: path.join(__dirname, 'dist'),
  },
});

const nodeConfig = Object.assign({}, baseConfig, {
  output: {
    filename: `${filename}.node.js`,
    library: libraryName,
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist'),
  },
});

module.exports = [browserConfig, nodeConfig];
