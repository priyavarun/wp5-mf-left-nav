const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  devServer: {
    port: 3001,
    liveReload: true,
    historyApiFallback: true,
  },
  name: "left-nav",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin(),
    new ModuleFederationPlugin({
      name: "leftNavigation",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./LeftNav": "./src/App.js"
      },
      shared: {
        "react": {
          singleton: true,
          requiredVersion: "18.2.0"
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "18.2.0"
        }
      }
    })
  ],
};
