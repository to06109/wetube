import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

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
  const user = await User.findOne({ username, socialOnly: false });
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
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  // url 완성하기 -> UrlSearchParams
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  // 깃허브에서 준 코드로 access token 받기
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();

  // json에 access_token이 있는 경우, user API에 접근
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    // user 정보를 받음
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    // email 정보를 받음
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    // email 중에 primary와 verified가 모두 true인 이메일 찾기
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.render("/login");
    }

    // DB에서 동일한 email 가진 user 찾기
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      // 없다면 create an account
      user = await User.create({
        avatarUrl: userData.avatar_url,
        name: `${userData.name ? userData.name : "null"}`,
        username: userData.login,
        email: emailObj.email,
        password: "",
        socialOnly: true,
        location: userData.location,
      });
    }

    // 있다면 success login!
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};
export const getEdit = (req, res) => {
  return res.render("edit-profile", {
    pageTitle: "Edit Profile",
  });
};
export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    // form으로 받은 수정할 데이터
    body: { name, email, username, location },
  } = req;

  if (email !== req.session.email || username !== req.session.username) {
    // 중복 이메일이나 username 있는지 확인
    const exists = await User.exists({ $or: [{ username }, { email }] });
    if (exists) {
      return res.status(400).render("edit-profile", {
        errorMessage: "This username/email is already taken",
      });
    }
  }

  // 데이터 업데이트
  const updateUser = await User.findByIdAndUpdate(
    _id,
    {
      name,
      email,
      username,
      location,
    },
    { new: true }
  );
  // 세션도 업데이트 해줘야함
  req.session.user = updateUser;

  return res.redirect("/users/edit");
};
export const logout = (req, res) => {
  // session을 끝내주기
  req.session.destroy();
  return res.redirect("/");
};

export const getChangePassword = (req, res) => {
  // 깃헙 로그인 유저는 비밀번호 변경 페이지 못들어오게함
  if (req.session.user.socialOnly === true) {
    return res.redirect("/");
  }
  return res.render("users/change-password", { pageTitle: "Change Password" });
};
export const postChangePassword = async (req, res) => {
  // req에서 form 데이터 꺼내기
  const {
    session: {
      user: { _id, password }, // 현재 로그인된 사용자
    },
    body: { oldPassword, newPassword, newPasswordConfirmation },
  } = req;
  // 옛날 비밀번호 올바른지 확인
  const ok = await bcrypt.compare(oldPassword, password);
  if (!ok) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "The current password is incorrect",
    });
  }
  // 바꿀 비밀번호 확인
  if (newPassword !== newPasswordConfirmation) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "The password dows not match the confirmation",
    });
  }
  // 비밀번호 변경
  const user = await User.findById(_id);
  user.password = newPassword;
  await user.save(); // pre("save") 작동 -> 그래야 password hash
  // 세션 업데이트
  req.session.user.password = user.password;
  return res.redirect("/users/logout"); // logout
};
export const see = (req, res) => res.send("See User");
