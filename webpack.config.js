const path = require(`path`);
const fs = require(`fs`);
const HTMLWebpackPlugin = require(`html-webpack-plugin`);
const {CleanWebpackPlugin} = require(`clean-webpack-plugin`);
const CopyWebpackPlugin = require(`copy-webpack-plugin`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);
const OptimizeCssAssetsWebpackPlugin = require(`optimize-css-assets-webpack-plugin`);
const TerserWebpackPlugin = require(`terser-webpack-plugin`);
const SVGSpriteMapPlugin = require(`svg-spritemap-webpack-plugin`);
const webpack = require(`webpack`);

const isDev = process.env.NODE_ENV === `development`;
const isProd = !isDev;

const PATHS = {
  src: path.resolve(__dirname, `src`),
  pug: path.resolve(__dirname, `src/pug/pages/`),
};

const PAGES = fs
  .readdirSync(`${PATHS.pug}`)
  // .readdirSync(PATHS.src)
  .filter((fileName) => fileName.endsWith(`.pug`));
  // .filter((fileName) => fileName.endsWith(`.html`));

const optimization = () => {
  const config = {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: `vendors`,
          test: /node_modules/,
          chunks: `all`,
          enforce: true
        }
      }
    }
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ];
  }
  return config;
};

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const babelOptions = (preset) => {
  const options = {
    presets: [`@babel/preset-env`],
    plugins: [`@babel/plugin-proposal-class-properties`]
  };

  if (preset) {
    options.presets.push(preset);
  }

  return options;
};

const jsLoaders = () => {
  const loaders = [{
    loader: `babel-loader`,
    options: babelOptions()
  }];

  if (isDev) {
    loaders.push(`eslint-loader`);
  }

  return loaders;
};

module.exports = {
  target: process.env.NODE_ENV === `development` ? `web` : `browserslist`,
  context: PATHS.src,
  mode: `development`,
  entry: {
    main: [`@babel/polyfill`, `./index.js`]
  },
  output: {
    filename: filename(`js`),
    path: path.resolve(__dirname, `public`),
    publicPath: ``
  },
  resolve: {
    extensions: [`.js`, `.json`]
  },
  optimization: optimization(),
  devServer: {
    contentBase: `public`,
    port: 8080,
    open: true,
    hot: true,
  },
  devtool: isDev ? `source-map` : false,
  plugins: [
    // new HTMLWebpackPlugin({
    //   template: `./index.html`,
    // minify: {
    //   collapseWhitespace: isProd
    // }
    // }),
    ...PAGES.map(
        (page) =>
          new HTMLWebpackPlugin({
            template: `${PATHS.pug}/${page}`,
            // template: `${PATHS.src}/${page}`,
            filename: `./${page.replace(/\.pug/, `.html`)}`,
            // filename: `./${page}`,
            minify: {
              collapseWhitespace: isProd
            }
          })
    ),
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, `src/assets/img`),
    //       to: path.resolve(__dirname, `public/img`)
    //     }
    //   ]}),
    new MiniCssExtractPlugin({
      filename: `css/${filename(`css`)}`
    }),
    // new SVGSpriteMapPlugin(`src/assets/img/*.svg`, {
    //   output: {
    //     filename: `img/sprite/sprite.svg`,
    //   },
    // }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {loader: `raw-loader`},
          {
            loader: `pug-html-loader`,
            options: {
              "pretty": true
            }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: `../`,
            },
          },
          {
            loader: `css-loader`,
            options: {
              sourceMap: true
            }
          },
          {
            loader: `sass-loader`,
            options: {
              sourceMap: true
            }
          },
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        exclude: /fonts/,
        use: [
          {
            loader: `file-loader`,
            options: {
              name: `[name].[ext]`,
              outputPath: `img`,
            }
          }
        ]
      },
      {
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        exclude: /img/,
        use: [
          {
            loader: `file-loader`,
            options: {
              name: `[name].[ext]`,
              outputPath: `fonts`,
            }
          }
        ]
      },
      // {
      //   test: /\.(php)$/,
      //   // exclude: /img/,
      //   use: [
      //     {
      //       loader: `file-loader`,
      //       options: {
      //         name: `[name].[ext]`,
      //         // outputPath: `fonts`,
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      },
      // {
      //   test: /\.html$/,
      //   loader: `raw-loader`
      // }
    ]
  }
};
