import Video from "../models/Video";

// callback 함수를 이용
/*
console.log("start")
Video.find({}, (error, videos) => {
  if(error){
    return res.render("server-error");
  }
  return res.render("home", { pageTitle: "Home", videos });
});
console.log("finished")
*/

// promise 이용
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

export const postUpload = (req, res) => {
  // here we will add a video to the videos array.
  const { title, description, hashtags } = req.body;
  const video = new Video({
    title,
    description,
    createdAt: Date.now(),
    hashtags: hashtags.split(",").map((word) => `#${word}`),
    meta: {
      views: 0,
      rating: 0,
    },
  });
  console.log(video);
  return res.redirect("/");
};
