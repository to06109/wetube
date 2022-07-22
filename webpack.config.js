module.exports = {
  entry: "./src/client/js/main.js",
  output: {
    // 결과파일 이름과 저장경로(절대경로여야 하는데 지금은 상대경로가 오류님)
    filename: "main.js",
    path: "./assets/js",
  },
};
