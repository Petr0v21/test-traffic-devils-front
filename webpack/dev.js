const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const src = path.resolve(__dirname, "..", "src");

const config = {
  context: src,
  mode: "development",
  entry: ["@babel/polyfill", "./index.tsx"],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "..", "dist"),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "..", "src/"),
      app: path.resolve(__dirname, "..", "src/app/"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  devServer: {
    port: 3000,
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "static",
          to: path.resolve(__dirname, "..", "dist", "static"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ["file-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
};

module.exports = config;
