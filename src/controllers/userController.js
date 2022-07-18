import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  const pageTitle = "Join";
  // 비밀번호 확인
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Password confirmation does not match.",
    });
  }
  // 중복 계정 확인
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "This username/email is already taken.",
    });
  }
  // 에러처리
  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    // 에러나면 다시 join 페이지 render
    return res.status(400).render("join", {
      pageTitle: "Upload Video",
      errorMessage: error._message, // upload 화면에 errorMessage 띄워주기
    });
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Login";
  const user = await User.findOne({ username });
  // check if account exists
  if (!user) {
    return res.status(404).render("login", {
      pageTitle,
      errorMessage: "An account with this username does not exists.",
    });
  }
  // check if password correct
  // (user가 입력한 password, DB에 있는 password)
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(404).render("login", {
      pageTitle,
      errorMessage: "Wrong password",
    });
  }
  // success login!
  req.session.loggedIn = true;
  req.session.user = user; // User info
  return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  // 깃허브 요청 객체
  const config = {
    client_id: "6f05ce699e8b76665128",
    allow_signup: false,
    scope: "read:user user:email",
  };
  // url 완성하기 -> UrlSearchParams
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = (req, res) => {};

export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Delete User");
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See User");
