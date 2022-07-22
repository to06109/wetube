//import 구버전
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// export default 구버전
module.exports = {
  entry: "./src/client/js/main.js",
  mode: "development",
  watch: true,
  // css파일 이름 설정
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  output: {
    // js파일은 js폴더에, css파일은 css폴더에
    filename: "js/main.js",
    path: path.resolve(__dirname, "assets"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // loader 사용법
        // 1. 객체 이용
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        // 2. 여러가지 loader들을 가져다가 한 가지의 변형으로 만들 수 있음
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
