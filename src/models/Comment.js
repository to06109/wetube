import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  // 누가 작성했는지
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  // 어떤 동영상에 달린 댓글인지
  video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Video" },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
