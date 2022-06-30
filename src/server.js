import express from "express";
import morgan from "morgan";

// Create server
const PORT = 4000;
const app = express();
const logger = morgan("dev");
app.use(logger); // 미들웨어

// Create router
const globalRouter = express.Router();
const handleHome = (req, res) => res.send("Home");
globalRouter.get("/", handleHome);

const userRouter = express.Router();
const handleEditUder = (req, res) => res.send("Edit User");
userRouter.get("/edit", handleEditUder);

const videoRouter = express.Router();
const handleWatchVideo = (req, res) => res.send("Watch Video");
videoRouter.get("/watch", handleWatchVideo);

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

// Listen external connections
const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`);
app.listen(PORT, handleListening);
