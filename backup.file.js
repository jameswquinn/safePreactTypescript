const webpack = require('webpack');
const path = require('path');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */




const autoprefixer = require("autoprefixer");
const precss = require("precss");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true
              //experimentalWatchApi: true
            }
          }
        ]
      },
      {
        include: [path.resolve(__dirname, "src")],
        loader: "babel-loader",

        options: {
          plugins: ["syntax-dynamic-import"],

          presets: [
            [
              "@babel/preset-env",
              {
                modules: false
              }
            ]
          ],
          plugins: [
            [
              "transform-react-jsx",
              {
                pragma: "h"
              }
            ]
          ]
        },

        test: /\.jsx?$/
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: function() {
                return [precss, autoprefixer];
              },
              sourceMap: false
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            attrs: [":data-src", ":src", ":srcset", ":data-srcset"]
          }
        }
      },
      {
        test: /\.(jpe?g|png)$/i,
        loader: "responsive-loader",
        options: {
          adapter: require("responsive-loader/sharp")
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name]~[sha512:hash:base64:7].[ext]",
            outputPath: "imgs"
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[name]~[contentHash].css"
    })
  ],
  entry: {
    app: "./src/index"
  },
  resolve: {
    extensions: [
      ".mjs",
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
      ".tag",
      ".svelte",
      ".vue"
    ]
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name]~[contentHash].js",
    chunkFilename: "[name]~[contentHash].[id].js"
  },
  mode: "production"
};
