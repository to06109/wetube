import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({});
  return res.render("home", { pageTitle: "Home", videos });
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

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  // video document 생성
  try {
    await Video.create({
      title,
      description,
      hashtags: hashtags.split(",").map((word) => `#${word}`),
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    // 에러나면 다시 upload 페이지 render
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message, // upload 화면에 errorMessage 띄워주기
    });
  }
};
