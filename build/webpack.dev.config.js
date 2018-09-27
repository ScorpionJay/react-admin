/**
 * webpack dev config
 */

const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.base.config.js");

module.exports = merge(common, {
  // devtool: "inline-source-map",
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            }
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [
                require("autoprefixer")(),
                require("cssnano")({
                  preset: "default"
                })
              ]
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:5].css"
      // publicPath: "/"
    })
  ],
  devServer: {
    contentBase: "./dist",
    hot: true,
    port: 9991,
    // host: "0.0.0.0",
    disableHostCheck: true,
    historyApiFallback: true,
    // 设置代理
    proxy: {
      "/api": {
        target: " http://localhost:18081", // 本地
        changeOrigin: true,
        pathRewrite: { "^/api": "" }
      }
    }
  }
});
