const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = () => {
  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "MyRecording.webm";
  document.body.appendChild(a);
  a.click();
};

// 녹화버튼 하나이기 때문에 이벤트를 삭제하고 추가하는 식으로 처리
const handleStop = () => {
  startBtn.innerText = "Download Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);

  recorder.stop();
};

const handleStart = () => {
  startBtn.innerText = "Stop Recording";
  // 버튼 다시 누르면 handleStop 실행하게
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);

  // 동영상 녹화
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    // 미리보기 소스 초기화
    video.srcObject = null;
    // 녹화한 동영상으로 동영상 대체
    video.src = videoFile;
    // 해당 동영상 반복재생
    video.loop = true;
    video.play();
  };
  recorder.start();
};

const init = async () => {
  // 사용자의 실시간 stream 받아오기
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  // 받아온 stream을 비디오 element에 넘겨주기
  video.srcObject = stream;
  // 비디오가 stream을 재생시킴
  video.play();
};

init();

startBtn.addEventListener("click", handleStart);
