const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const handleSubmit = (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  // 사용자가 입력한 댓글
  const text = textarea.value;
  // 어느 동영상 댓글인지 알아야함
  const videoId = videoContainer.dataset.id;
  // backend POST request
  fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    // req.body에 들어가는거임
    body: {
      text,
    },
  });
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
