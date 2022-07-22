import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // unique: email과 username은 딱 하나만 존재해야함
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false }, // 깃허브로 로그인 여부 파악 위함
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: String,
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "video" }],
});

// password hashing
userSchema.pre("save", async function () {
  // this: create 되는 User객체를 가리킴
  // (암호화 할 데이터, saltRounds)
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
