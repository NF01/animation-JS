const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  //change when changing project dev
  entry: './src/index_gol.js',
  output: {
    filename: 'bundle_gol.js',
    path: path.resolve(__dirname, 'dist')
  },
  watch: false,
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};