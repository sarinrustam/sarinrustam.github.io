const path = require(`path`);
const webpack = require('webpack');
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.jsx',
  ],
  output: {
    path: path.join(__dirname, `../public`),
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader'
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MomentLocalesPlugin({
      localesToKeep: ['ru']
    }),
  ],
  devServer: {
    contentBase: './',
    historyApiFallback: true,
    hot: true,
    host: 'localhost',
    port: 3000,
    proxy: {
      '/api': 'http://aspiritywebtemplate_serve:8080',
    },
  },
};
