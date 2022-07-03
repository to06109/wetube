import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

// Create server
const PORT = 4000;

console.log(process.cwd()); // 현재 작업 디렉토리 경로 출력
const app = express();
const logger = morgan("dev");
app.set("view engine", "pug"); // 퍼그를 뷰엔진으로 설정
app.use(logger); // 미들웨어

// Use routers
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

// Listen external connections
const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`);
app.listen(PORT, handleListening);
