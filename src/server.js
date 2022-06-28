import express from "express";

///// 서버 만들기
const PORT = 4000;
const app = express(); // express 앱 만들기

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`); // 어느 함수가 어느 방향으로 가는지 알 수 있음
  next();
};
const privateMiddleware = (req, res, next) => {
  const url = req.url;
  console.log(url);
  if (url === "/protected") {
    return res.send("<h1>Not allowed</h1>");
  }
  console.log("Allowed, you may continue.");
  next();
};

///// 서버의 request 설정
// req, res: express에서 받은 object
const handleHome = (req, res) => {
  return res.end(); // request를 종료시킴
};

const handleProtected = (req, res) => {
  return res.send("Welcome to the private lounge.");
};

app.use(logger);
app.use(privateMiddleware);

app.get("/", handleHome);
app.get("/protected", handleProtected);

///// 외부 접속 listen
const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`);
app.listen(PORT, handleListening); // (listen할 port, callback)
