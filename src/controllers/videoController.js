import Video from "../models/Video";

export const home = (req, res) => {
  // callback 함수를 이용
  Video.find({}, (error, videos) => {
    return res.render("home", { pageTitle: "Home", videos });
  });
};

export const watch = (req, res) => {
  const { id } = req.params; // 링크로 id받음
  return res.render("watch", { pageTitle: `Watching` });
};
export const getEdit = (req, res) => {
  // 수정할 비디오 찾기
  const { id } = req.params;
  return res.render("edit", { pageTitle: `Editing` });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/videos/${id}`); // watch 화면으로 가기
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = (req, res) => {
  // here we will add a video to the videos array.
  const { title } = req.body;
  return res.redirect("/");
};
