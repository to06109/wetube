export const trendingVideos = (req, res) => {
  // 가짜 비디오 배열
  const videos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // const videos = [];
  return res.render("home", { pageTitle: "Home", videos });
};
export const see = (req, res) => res.render("watch");
export const edit = (req, res) => res.render("edit");
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => res.send("Delete Video");
