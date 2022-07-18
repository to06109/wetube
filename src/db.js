import mongoose from "mongoose";

// mongoDB에 wetube DB 만들어주기
mongoose.connect(process.env.DB_URL, {
  // warning 해결
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("DB Error", error);

// connection에 event 붙여주기 -> 에러나면 에러메세지 출력
db.on("error", handleError);
// open: DB에 연결 성공 -> 성공 메세지 출력
db.once("open", handleOpen);
