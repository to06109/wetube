import express from "express";
import { join, login } from "../controllers/userController";
import { trendingVideos } from "../controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", trendingVideos);
globalRouter.get("/join", join);
globalRouter.get("/login", login);

export default globalRouter;
