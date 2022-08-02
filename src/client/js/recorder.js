import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

// 여러 function에서 공유되는 variables
let stream;
let recorder;
let videoFile;

// 4. 녹화동영상 다운로드
const handleDownload = async () => {
  // ffmpeg 객체 생성
  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();

  // ffmpeg에 "recording.webm" 파일 생성
  // 파일처리타입, 파일이름, binaryData 함수(fetchFile 이용)
  ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));

  // ffmpeg 명령어 실행 -> 가상 폴더에 인코딩된 "output.mp4" 파일 생김
  await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");

  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "MyRecording.webm";
  document.body.appendChild(a);
  a.click();
};

// 3. 녹화종료
// 녹화버튼 하나이기 때문에 이벤트를 삭제하고 추가하는 식으로 처리
const handleStop = () => {
  startBtn.innerText = "Download Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);

  recorder.stop();
};

// 2. 버튼을 누르면 녹화시작
const handleStart = () => {
  startBtn.innerText = "Stop Recording";
  // 버튼 다시 누르면 handleStop 실행하게
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);

  // 동영상 녹화
  recorder = new MediaRecorder(stream);

  // 녹화가 멈추면 발생되는 이벤트
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    console.log(event.data);
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

// 1. 사용자 마이크, 카메라에 접근 / 실시간 미리보기
const init = async () => {
  // 사용자의 실시간 stream 받아오기
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  // 받아온 stream을 비디오 element에 넘겨주기
  // (stream 형식이라서 src가 아닌 srcObject에 넣음)
  video.srcObject = stream;
  // 비디오가 stream을 재생시킴
  video.play();
};

init();

startBtn.addEventListener("click", handleStart);
