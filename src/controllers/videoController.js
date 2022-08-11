import User from "../models/User";
import Comment from "../models/Comment";
import Video from "../models/Video";
import mongoose from "mongoose";
import session from "express-session";

export const home = async (req, res) => {
  // video 날짜별 내림차순 정렬
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params; // 링크로 id받음
  // id로 video 찾기
  const video = await Video.findById(id).populate("owner").populate("comments");
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
    // 로그인 안 된 사용자만 접근할 수 있게 하는 미들웨어
    req.flash("error", "You are not the owner of the video.");
    // 403: forbidden
    return res.status(403).redirect("/");
  }
  // (id, 업데이트할 내용)
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  req.flash("success", "Changes saved.");
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
  const { video, thumb } = req.files;
  const { title, description, hashtags } = req.body;
  console.log(thumb);
  // video document 생성
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl: video[0].path,
      thumbUrl: thumb[0].destination + thumb[0].filename,
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
    }).populate("owner");
  }
  return res.render("search", { pageTitle: "Search", videos });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

export const createComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  // DB에 보낼 댓글 객체
  const comment = await Comment.create({
    text,
    owner: user._id,
    video: id,
  });
  // 비디오 객체에 업데이트
  video.comments.push(comment._id);
  video.save();
  // 201: Created
  return res.status(201).json({ newCommentId: comment._id });
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const {
    user: { _id },
  } = req.session;
  const comment = await Comment.findById(commentId).populate("owner");
  if (!comment) {
    return res.status(404).render("404", { pageTitle: "Comment not found" });
  }
  // 사용자가 댓글의 작성자인지 확인
  if (String(comment.owner._id) !== String(_id)) {
    return res.status(404).render("404", { pageTitle: "forbidden delete" });
  }
  // DB에서 댓글 지우기
  await Comment.findByIdAndDelete(commentId);
  res.end();
};
