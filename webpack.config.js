const path = require('path');
const filename = 'translit.js';

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
    library: 'translit',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist'),
  }
};
