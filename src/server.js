// server와 관련된 일만 하는 파일
import express from "express";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

// Create server
const app = express();
const logger = morgan("dev");

app.set("view engine", "pug"); // 퍼그를 뷰엔진으로 설정
app.set("views", process.cwd() + "/src/views"); // cwd 디폴트값 변경
app.use(logger); // 미들웨어
app.use(express.urlencoded({ extended: true })); // 바디 파싱 미들웨어

// init session
app.use(
  session({
    secret: "Hello!",
    // 오류 해결
    resave: true,
    saveUninitialized: true,
  })
);

// check backend session
app.use((req, res, next) => {
  req.sessionStore.all((error, sessions) => {
    console.log(sessions);
    next();
  });
});

// Use routers
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
