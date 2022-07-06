// 가짜 비디오 객체 배열
let videos = [
  {
    title: "First Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 1,
  },
  {
    title: "Second Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 2,
  },
  {
    title: "Third Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 3,
  },
];

export const trendingVideos = (req, res) => {
  return res.render("home", { pageTitle: "Home", videos });
};
export const watch = (req, res) => {
  const { id } = req.params; // 링크로 id받음
  const video = videos[id - 1]; // 해당 id에 맞는 video 찾음
  return res.render("watch", { pageTitle: `Watching: ${video.title}`, video });
};
export const getEdit = (req, res) => {
  // 수정할 비디오 찾기
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  videos[id - 1].title = title; // 동영상 제목 수정해주기
  return res.redirect(`/videos/${id}`); // watch 화면으로 가기
};
