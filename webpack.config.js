const path = require("path")

module.exports = {
  mode: "production",
  entry: {
    index: ["./src/js/index.js"],
  },
  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  watch: true,
}
