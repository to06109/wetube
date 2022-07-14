import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // unique: email과 username은 딱 하나만 존재해야함
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  location: String,
});

const User = mongoose.model("User", userSchema);

export default User;
