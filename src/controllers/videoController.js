import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({});
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params; // 링크로 id받음
  // id로 video 찾기
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "Video not found" });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  // 수정할 비디오 찾기
  const { id } = req.params;
  const video = await Video.findById(id);
  // 에러처리
  if (!video) {
    return res.render("404", { pageTitle: "Video not found" });
  }
  return res.render("edit", { pageTitle: `Edit ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exist({ _id: id });
  // 에러처리
  if (!video) {
    return res.render("404", { pageTitle: "Video not found" });
  }
  // (id, 업데이트할 내용)
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: hashtags
      .split(",")
      .map((word) => (word.startsWith("#") ? word : `#${word}`)),
  });
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
      hashtags,
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
