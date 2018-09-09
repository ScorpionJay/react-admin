/**
 * webpack dev config
 */

const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
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
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
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
            }
          ],
          publicPath: "../"
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
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
          ],
          publicPath: "../"
        })
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
    new ExtractTextPlugin({
      filename: "css/[name].[hash:5].css",
      publicPath: "/"
    })
    // new webpack.BannerPlugin("Copyright by Jay " + new Date())
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: { warnings: false, drop_console: true },
          output: {
            comments: false
          }
        },
        sourceMap: false
      })
    ]
  }
});
