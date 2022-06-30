import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

// Create server
const PORT = 4000;
const app = express();
const logger = morgan("dev");
app.use(logger); // 미들웨어

// Use routers
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

// Listen external connections
const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`);
app.listen(PORT, handleListening);
