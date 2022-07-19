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
    next();
  } else {
    // 로그인 안돼있으면 로그인 페이지로 redirect
    return res.redirect("/login");
  }
};

// 로그인 안 된 사용자만 접근할 수 있게 하는 미들웨어
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};
