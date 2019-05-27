/**
 * @license MIT
 * @copyright 2019
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

const webpack = require("webpack");
const path = require("path");

/**
 * We've enabled Postcss, autoprefixer and precss for you. This allows your app
 * to lint  CSS, support variables and mixins, transpile future CSS syntax,
 * inline images, and more!
 *
 * To enable SASS or LESS, add the respective loaders to module.rules
 *
 * https://github.com/postcss/postcss
 *
 * https://github.com/postcss/autoprefixer
 *
 * https://github.com/jonathantneal/precss
 *
 */

const autoprefixer = require("autoprefixer");
const precss = require("precss");

/**
 * We've enabled TerserPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/terser-webpack-plugin
 *
 */

const TerserPlugin = require("terser-webpack-plugin");

/**
 *
 * This plugin compresses assets with Brotli
 * compression algorithm.
 *
 * https://github.com/mynameiswhm/brotli-webpack-plugin
 *
 */

const BrotliPlugin = require("brotli-webpack-plugin");

/**
 *
 * This plugin compresses assets with gzip compression
 * algorithm as 'fallback' position.
 *
 * https://github.com/webpack-contrib/compression-webpack-plugin
 *
 */

const CompressionPlugin = require("compression-webpack-plugin");

/**
 *
 * Critters is a Webpack plugin that inlines your app's
 * critical CSS and lazy-loads the rest.
 *
 * https://github.com/GoogleChromeLabs/critters
 *
 */

const Critters = require("critters-webpack-plugin");

/**
 *
 * Prints the gzipped sizes of your webpack assets and
 * the changes since the last build.
 *
 * https://github.com/GoogleChromeLabs/size-plugin
 *
 */

const SizePlugin = require("size-plugin");

/**
 *
 * webpack loader for Vue Single-File Components
 *
 * https://github.com/vuejs/vue-loader
 *
 */

const { VueLoaderPlugin } = require("vue-loader");

/**
 *
 * The GenerateSW plugin will create a service worker file
 * for you and add it to the webpack asset pipeline.
 *
 * https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
 *
 */

const { GenerateSW } = require("workbox-webpack-plugin");

/**
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

const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  mode: "production",
  entry: {
    bundle: ["./src/index"]
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
    ],
    mainFields: ["svelte", "browser", "module", "main"],
    alias: {
      react: "preact-compat",
      "react-dom": "preact-compat",
      // Not necessary unless you consume a module using `createClass`
      "create-react-class": "preact-compat/lib/create-react-class",
      // Not necessary unless you consume a module requiring `react-dom-factories`
      "react-dom-factories": "preact-compat/lib/react-dom-factories"
    }
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name]~[contentHash].js",
    chunkFilename: "[name]~[contentHash].[id].js"
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: {
          loader: "svelte-loader",
          options: {
            emitCss: true,
            hotReload: true
          }
        }
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: "vue-loader"
      },
      {
        test: /\.tag$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "riot-tag-loader",
            options: {
              hot: true,
              type: "es6"
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              experimentalWatchApi: true
            }
          }
        ]
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
      /**
       * We've added 'responsive-loader', a webpack loader for responsive images.
       * It creates multiple images from one source image,
       * and returns a srcset.
       *
       * https://github.com/herrstucki/responsive-loader
       *
       * @example `const responsiveImage = require("example.jpg?min=320,max=1400,steps=6");`
       *
       *
       */
      {
        test: /\.(jpe?g|png)$/i,
        loader: "responsive-loader",
        options: {
          adapter: require("responsive-loader/sharp"),
          format: "jpg",
          quality: 70,
          name: "[name]~[sha512:hash:base64:7].[ext]",
          outputPath: "imgs"
        }
      },
      {
        test: /\.svg$/,
        use: [
          { loader: "file-loader" },
          {
            loader: "svgo-loader",
            options: {
              plugins: [
                { removeTitle: true },
                { convertColors: { shorthex: false } },
                { convertPathData: false }
              ]
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name]~[sha512:hash:base64:7].[ext]",
            outputPath: "fonts"
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      dry: false
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([{ from: "icons", to: "." }]),
    new HtmlWebpackPlugin({
      template: "!!prerender-loader?string!src/index.html",
      meta: {
        description: "Description website",
        author: "A N Other",
        keywords: "website, with, meta, tags",
        robots: "index, follow",
        "revisit-after": "5 month",
        image: "http://mywebsite.com/image.jpg"
      },
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
    }),
    new Critters(),
    new OptimizeCssAssetsPlugin(),
    new TerserPlugin({
      cache: true,
      parallel: true,
      extractComments: true,
      sourceMap: true, // Must be set to true if using source-maps in production
      terserOptions: {
        parse: {
          // we want terser to parse ecma 8 code. However, we don't want it
          // to apply any minfication steps that turns valid ecma 5 code
          // into invalid ecma 5 code. This is why the 'compress' and 'output'
          // sections only apply transformations that are ecma 5 safe
          // https://github.com/facebook/create-react-app/pull/4234
          ecma: 8
        },
        compress: {
          ecma: 5,
          warnings: false,
          // Disabled because of an issue with Uglify breaking seemingly valid code:
          // https://github.com/facebook/create-react-app/issues/2376
          // Pending further investigation:
          // https://github.com/mishoo/UglifyJS2/issues/2011
          comparisons: false,
          // Disabled because of an issue with Terser breaking valid code:
          // https://github.com/facebook/create-react-app/issues/5250
          // Pending futher investigation:
          // https://github.com/terser-js/terser/issues/120
          inline: 2
        },
        mangle: {
          safari10: true
        },
        output: {
          ecma: 5,
          comments: false,
          // Turned on because emoji and regex is not minified properly using default
          // https://github.com/facebook/create-react-app/issues/2488
          ascii_only: true
        }
      }
    }),
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.svg$|\.html$/,
      threshold: 10240,
      minRatio: 0.7
    }),
    new BrotliPlugin({
      asset: "[path].br[query]",
      test: /\.js$|\.css$|\.svg$|\.html$/,
      threshold: 10240,
      minRatio: 0.7
    }),
    new SizePlugin(),
    new GenerateSW({
      swDest: "service-worker.js",
      skipWaiting: true,
      clientsClaim: true,
      navigateFallback: "index.html"
    }),
    new WebpackBuildNotifierPlugin({
      title: "My Project Webpack Build",
      logo: path.resolve("src/icons/assets/icon.png"),
      suppressSuccess: true
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static"
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },
      chunks: "async",
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  }
};
