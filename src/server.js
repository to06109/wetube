// server와 관련된 일만 하는 파일
import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

// Create server
const app = express();
const logger = morgan("dev");

app.set("view engine", "pug"); // 퍼그를 뷰엔진으로 설정
app.set("views", process.cwd() + "/src/views"); // cwd 디폴트값 변경
app.use(logger); // 미들웨어
app.use(express.urlencoded({ extended: true })); // 바디 파싱 미들웨어

// init session middleware
app.use(
  session({
    secret: "Hello!",
    // 로그인했을 때만 세션을 DB에 저장
    resave: false,
    saveUninitialized: false,
    // 세션 담을 저장소DB 연결
    store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/wetube" }),
  })
);

// middleware
app.use(localsMiddleware);

// Use routers
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
