// server와 관련된 일만 하는 파일
import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";
import apiRouter from "./routers/apiRouter";

// Create server
const app = express();
const logger = morgan("dev");

app.set("view engine", "pug"); // 퍼그를 뷰엔진으로 설정
app.set("views", process.cwd() + "/src/views"); // cwd 디폴트값 변경

// 동영상 녹화 시 SharedArrayBuffer 오류 해결
app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

app.use(logger); // 미들웨어
app.use(express.urlencoded({ extended: true })); // 바디 파싱 미들웨어

// init session middleware
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    // 로그인했을 때만 세션을 DB에 저장
    resave: false,
    saveUninitialized: false,
    // 세션 담을 저장소DB 연결
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

// middleware
app.use(flash());
app.use(localsMiddleware);

// Use routers
app.use("/uploads", express.static("uploads"));
app.use("/assets", express.static("assets"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);

export default app;
