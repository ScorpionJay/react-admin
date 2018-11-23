/**
 * webpack dev config
 */

const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.base.config.js");

module.exports = merge(common, {
  // devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
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
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "[name].[hash:6].[ext]",
              outputPath: "image/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:5].css"
      // publicPath: "/"
    }),
    new webpack.BannerPlugin("Copyright by Jay " + new Date())
  ],
  optimization: {
    minimizer: [
      // new UglifyJsPlugin({
      new TerserPlugin({
        // uglifyOptions: {
        terserOptions: {
          parallel: true,
          cache: true,
          compress: { warnings: false, drop_console: true },
          output: {
            // comments: false
            comments: /Copyright by Jay/i
          }
        }
        // sourceMap: false,
        // extractComments: {
        //   condition: true,
        //   // filename(file) {
        //   //  return `${file}.LICENSE`;
        //   // },
        //   banner(commentsFile) {
        //     return `My custom banner about license information ${commentsFile}`;
        //   }
        // }
      })
    ]
  }
});
