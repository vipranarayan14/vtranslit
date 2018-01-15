const path = require('path');
const filename = 'vtranslit.js';

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
    library: 'vtranslit',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist'),
  }
};
