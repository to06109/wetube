import mongoose from "mongoose";
// model의 타입 정의해주기
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  // 디폴트값 지정, mongoose가 새로운 video를 생성했을 때만 알아서 실행하게 ()안붙여서 넣어줌
  createdAt: { type: Date, required: true, defalt: Date.now },
  hashtags: [{ type: String }], // array 형식
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

// model 만들기
const Video = mongoose.model("video", videoSchema); // (모델의 이름, 스키마)
export default Video;
