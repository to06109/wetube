const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;

// 녹화버튼 하나이기 때문에 이벤트를 삭제하고 추가하는 식으로 처리
const handleStop = () => {
  startBtn.innerText = "Start Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleStart);
};

const handleStart = () => {
  startBtn.innerText = "Stop Recording";
  // 버튼 다시 누르면 handleStop 실행하게
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);

  // 동영상 녹화
  const recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (e) => {
    console.log("recording done");
    console.log(e);
    console.log(e.data);
  };
  console.log(recorder);
  recorder.start();
  console.log(recorder);
  setTimeout(() => {
    recorder.stop();
  }, 10000);
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
