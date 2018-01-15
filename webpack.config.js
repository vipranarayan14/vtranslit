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
          loader: 'babel-loader'
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
