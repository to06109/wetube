import mongoose from "mongoose";
// model의 타입 정의해주기
const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: Date,
  hashtags: [{ type: String }], // array 형식
  meta: {
    views: Number,
    rating: Number,
  },
});

// model 만들기
const Video = mongoose.model("video", videoSchema); // (모델의 이름, 스키마)

export default Video;
