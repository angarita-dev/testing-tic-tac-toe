const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
