const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

const handleStart = async () => {
  // 사용자의 실시간 stream 받아오기
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  // 받아온 stream을 비디오 element에 넘겨주기
  video.srcObject = stream;
  // 비디오가 stream을 재생시킴
  video.play();
};

startBtn.addEventListener("click", handleStart);
