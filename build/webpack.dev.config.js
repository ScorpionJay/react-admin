/**
 * webpack dev config
 */

const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const common = require("./webpack.base.config.js");

module.exports = merge(common, {
  // devtool: "inline-source-map",
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader"
            // {
            //   loader: "postcss-loader",
            //   options: {
            //     ident: "postcss",
            //     plugins: [
            //       require("autoprefixer")(),
            //       require("cssnano")({
            //         preset: "default"
            //       })
            //     ]
            //   }
            // }
          ],
          publicPath: "../"
        })
      },
      // {
      //   test: /\.css$/,
      //   use: ["style-loader", "css-loader"]
      // },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
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
    new ExtractTextPlugin({
      filename: "css/[name].[hash:5].css"
    })
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 9999,
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
