import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const actionBtn = document.getElementById("actionBtn");
const video = document.getElementById("preview");

// 여러 function에서 공유되는 variables
let stream;
let recorder;
let videoFile;

const files = {
  input: "recording.webm",
  output: "output.mp4",
  thumb: "thumbnail.jpg",
};

const downloadFile = (fileUrl, fileName) => {
  // 파일 download
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
};

// 4. 녹화동영상 다운로드
const handleDownload = async () => {
  // 재다운로드 방지
  actionBtn.removeEventListener("click", handleDownload);
  actionBtn.innerText = "Transcoding...";
  actionBtn.disabled = true;

  // ffmpeg 객체 생성
  const ffmpeg = createFFmpeg({
    corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
    log: true,
  });
  await ffmpeg.load();

  // ffmpeg에 "recording.webm" 파일 생성
  // 파일처리타입, 파일이름, binaryData 함수(fetchFile 이용)
  ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));

  // 영상 인코딩
  await ffmpeg.run("-i", files.input, "-r", "60", files.output);
  // 썸네일 생성
  await ffmpeg.run(
    "-i",
    files.input,
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    files.thumb
  );

  // 파일 불러오기
  const mp4File = ffmpeg.FS("readFile", files.output);
  const thumbFile = ffmpeg.FS("readFile", files.thumb);

  // blob 생성
  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

  // 파일에 접근하기 위한 url 만들기
  const mp4Url = URL.createObjectURL(mp4Blob);
  const thumbUrl = URL.createObjectURL(thumbBlob);

  // 파일 download
  downloadFile(mp4Url, "MyRecording.mp4");
  downloadFile(thumbUrl, "MyThumbnail.jpg");

  // 파일 삭제(input, output)
  ffmpeg.FS("unlink", files.input);
  ffmpeg.FS("unlink", files.output);
  ffmpeg.FS("unlink", files.thumb);

  // URL 삭제
  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(thumbUrl);
  URL.revokeObjectURL(videoFile);

  actionBtn.disabled = false;
  actionBtn.innerText = "Record Again";
  actionBtn.addEventListener("click", handleDownload);
};

// 2. 버튼을 누르면 녹화시작
const handleStart = () => {
  actionBtn.innerText = "Recording";
  actionBtn.disabled = true;
  actionBtn.removeEventListener("click", handleStart);

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
    actionBtn.innerText = "Download";
    actionBtn.disabled = false;
    actionBtn.addEventListener("click", handleDownload);
  };
  recorder.start();
  // 3. 5초 뒤에 녹화 종료
  setTimeout(() => {
    recorder.stop();
  }, 5000);
};

// 1. 사용자 마이크, 카메라에 접근 / 실시간 미리보기
const init = async () => {
  // 사용자의 실시간 stream 받아오기
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: 1024,
      height: 576,
    },
  });
  // 받아온 stream을 비디오 element에 넘겨주기
  // (stream 형식이라서 src가 아닌 srcObject에 넣음)
  video.srcObject = stream;
  // 비디오가 stream을 재생시킴
  video.play();
};

init();

actionBtn.addEventListener("click", handleStart);
