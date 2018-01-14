const path = require('path');
const filename = 'hash-router.js';

module.exports = {
  entry: './src',
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      }
    ]
  },
  output: {
    filename,
    path: path.join(__dirname, 'dist'),
  }
};
