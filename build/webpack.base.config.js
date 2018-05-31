/**
 * webpack base config
 */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const ENV = process.env.NODE_ENV || "development";

const enrtyBasePath = "/";
// const fileName = "demo";

function generateHtml(name, title) {
  return {
    title: title,
    template: `./${name}.template.html`,
    filename: `${name}.html`,
    // chunks: [`${name}`],
    inject: true,
    minify:
      ENV === "production"
        ? {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true,
            minifyJS: true
          }
        : {}
  };
}
module.exports = {
  mode: ENV,
  context: path.resolve(__dirname, "../src/"),
  entry: {
    index: "./index.js",
    vendor: ["react", "react-dom", "redux", "react-redux"]
  },
  output: {
    filename: "js/[name].[hash:6].js",
    chunkFilename: "js/[name].js",
    path: path.resolve(__dirname, "../dist/")
  },
  externals: {
    jquery: "jQuery",
    Swiper: "Swiper"
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss"]
  },
  plugins: [
    new HtmlWebpackPlugin(generateHtml("index", "demo")),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
    //,
    // runtimeChunk: {
    //   name: "manifest"
    // }
  }
};
