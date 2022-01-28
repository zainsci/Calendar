const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    index: ["./src/js/index.js"],
  },
  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "[name].js",
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public"),
          to: path.resolve(__dirname, "dist"),
        },
        {
          from: path.resolve(__dirname, "src/main.js"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
  ],
  watch: true,
};
