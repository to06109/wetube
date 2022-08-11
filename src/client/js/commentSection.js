const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

// fake comment
const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  // 최신댓글이 위로 붙게 append 대신 prepend
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  // 사용자가 입력한 댓글
  const text = textarea.value;
  // 어느 동영상 댓글인지 알아야함
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  // backend POST request
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // req.body에 들어가는거임
    body: JSON.stringify({
      text,
    }),
  });
  textarea.value = "";
  // response 안에서 json 추출
  const { newCommentId } = await response.json();
  // 댓글 생성 시 fake댓글 작성
  if (response.status === 201) {
    addComment(text, newCommentId);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
