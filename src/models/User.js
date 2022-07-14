import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // unique: email과 username은 딱 하나만 존재해야함
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  location: String,
});

// password hashing
userSchema.pre("save", async function () {
  // this: create 되는 User객체를 가리킴
  // (암호화 할 데이터, saltRounds)
  this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("User", userSchema);

export default User;
