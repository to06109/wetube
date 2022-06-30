import express from "express";

const userRouter = express.Router();
const handleEditUder = (req, res) => res.send("Edit User");
userRouter.get("/edit", handleEditUder);

export default userRouter;
