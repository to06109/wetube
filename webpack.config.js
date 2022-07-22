//import 구버전
const path = require("path");

// export default 구버전
module.exports = {
  entry: "./src/client/js/main.js",
  mode: "development",
  output: {
    // 결과파일 이름과 저장경로(절대경로여야 하는데 지금은 상대경로가 오류님)
    filename: "main.js",
    path: path.resolve(__dirname, "assets", "js"),
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
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
