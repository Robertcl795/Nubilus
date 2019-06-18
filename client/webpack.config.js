const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const path = require('path')

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./index.html",
  filename: "index.html",
  favicon: "./src/favicon.ico"
})

const prodPlugin = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('production')
  }
})

const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    resolve: { extensions: ['.js', '.jsx']}
  },
  {
    test: /\.(css|scss)$/,
    exclude: /node_modules/,
    loaders: ['style-loader', 'css-loader', 'sass-loader'],
    resolve: { extensions: ['.css', '.scss']}

  },
  {
    test: /\.(png|jpg|gif|svg)$/i,
    use: [{
      loader: 'url-loader',
      options: { limit: 5000 }
    }]
  }
]

module.exports = {
  devtool: 'source-map',
  entry: './src/index.jsx',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js'
  },
  module: { rules },
  plugins: [htmlPlugin, prodPlugin],
  resolve: {
    modules: [path.resolve('src'), 'node_modules'],
    alias: {
      root: path.resolve(path.resolve(__dirname, '..', 'src'), ''),
      components: path.resolve(__dirname, 'src/components/'),
      assets: path.resolve(__dirname, 'src/assets/')
    },
  }
}