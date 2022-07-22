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
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
};
