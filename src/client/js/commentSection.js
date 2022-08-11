const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

// fake comment
const addComment = (text) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  newComment.appendChild(icon);
  newComment.appendChild(span);
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
  const { status } = await fetch(`/api/videos/${videoId}/comment`, {
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
  // 댓글 생성 시 fake댓글 작성
  if (status === 201) {
    addComment(text);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
