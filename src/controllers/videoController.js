import User from "../models/User";
import Video from "../models/Video";

export const home = async (req, res) => {
  // video 날짜별 내림차순 정렬
  const videos = await Video.find({}).sort({ createdAt: "desc" });
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params; // 링크로 id받음
  // id로 video 찾기
  const video = await Video.findById(id).populate("owner");
  console.log(video);
  if (!video) {
    return res.render("404", { pageTitle: "Video not found" });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  // 수정할 비디오 찾기
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  // 에러처리
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  // 영상 소유주가 아니면 접근불가
  if (String(video.owner) !== String(_id)) {
    // 403: forbidden
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `Edit ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  // 에러처리
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  // 영상 소유주가 아니면 접근불가
  if (String(video.owner) !== String(_id)) {
    // 403: forbidden
    return res.status(403).redirect("/");
  }
  // (id, 업데이트할 내용)
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`); // watch 화면으로 가기
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  // 현재 로그인된 유저의 id
  const {
    user: { _id },
  } = req.session;
  const file = req.file;
  const { title, description, hashtags } = req.body;
  // video document 생성
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl: file.path,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    // owner의 id를 video 객체에 추가
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    // 에러나면 다시 upload 페이지 render
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message, // upload 화면에 errorMessage 띄워주기
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  // 영상 소유주가 아니면 접근불가
  if (String(video.owner) !== String(_id)) {
    // 403: forbidden
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  // delete video
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = []; // init videos array
  if (keyword) {
    // find including keyword videos
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    });
  }
  return res.render("search", { pageTitle: "Search", videos });
};
