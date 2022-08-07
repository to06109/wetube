import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

// 로그인 된 사용자만 접근할 수 있게 하는 미들웨어
export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    // 로그인 되어있으면 진행하던 request 계속 하게 함
    return next();
  } else {
    // 로그인 안돼있으면 로그인 페이지로 redirect
    req.flash("error", "Log in first.");
    return res.redirect("/login");
  }
};

// 로그인 안 된 사용자만 접근할 수 있게 하는 미들웨어
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 3000000,
  },
});
export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 25000000,
  },
});
