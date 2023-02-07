const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;
const Dotenv = require("dotenv-webpack");

const PORT = 3004;
const DOMAIN = "https://testadmin.vuivui.com/";

module.exports = {
  entry: [path.resolve("src/index.tsx")],
  mode: "production",
  devtool: "source-map",
  output: {
    path: path.resolve("../build/profile"),
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: DOMAIN + "profile/",
    crossOriginLoading: "anonymous",
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".ts", ".tsx"],
    alias: {
      "@": path.resolve("./src"),
      "@assets": path.resolve("./public/assets"),
    },
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true,
              lessOptions: {
                modifyVars: {
                  "@primary-color": "#f05a94",
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.ts?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        exclude: /\.module.(scss)$/,
        use: ["css-loader", "sass-loader"],
      },
      {
        test: /\.module\.scss$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                mode: "local",
                localIdentName: "vv-[local]-[hash:base64:5]",
              },
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "file-loader",
        options: {
          name: "./images/[name].[ext]",
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "./svg/[name].[ext]",
            },
          },
        ],
      },
      {
        type: "javascript/auto",
        test: /\.json$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "./json/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "./fonts/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  devServer: {
    open: false,
    hot: true,
    historyApiFallback: true,
    port: PORT,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },

  plugins: [new Dotenv()],
};
