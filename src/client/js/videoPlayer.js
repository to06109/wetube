const video = document.querySelector("video");
// element찾기
const playBtn = document.getElementById("play");
// element안에서 i 찾기
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let constrolsMovementTimeout = null;
let volumeValue = 0.5; // 볼륨이 바뀔때마다 업데이트

// volume default
video.volume = volumeValue;

const handlePlayClick = (e) => {
  // if the video is playing, pause it,
  // else play the video
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  // 음소거한 상태에서 볼륨바 움직이면 음소거가 해제
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = value;
  video.volume = value;
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(14, 5);

// 비디오 총 시간 설정
const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  // range에 비디오 총 시간 설정
  timeline.max = Math.floor(video.duration);
};

// 현재 비디오 시간 업데이트
const handleTimeUpdate = () => {
  currenTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handelTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  // 비디오와 재생바 시간 연결
  video.currentTime = value;
};

const handelFullScreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen(); // 전체화면 종료
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen(); // 전체화면
    fullScreenIcon.classList = "fas fa-compress";
  }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  // 3초 지나기 전에 마우스 다시들어오면 controlsTimeout 초기화
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }

  // 비디오에서 마우스 멈추면 컨트롤러 숨기기
  // 오래된 timeout은 취소
  if (constrolsMovementTimeout) {
    clearTimeout(constrolsMovementTimeout);
    constrolsMovementTimeout = null;
  }
  // 새로운 timeout 만듬
  videoControls.classList.add("showing");
  constrolsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  // 나가면 3초 뒤에 사라짐
  controlsTimeout = setTimeout(hideControls, 3000);
};

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("change", handleVolumeChange);
video.addEventListener("loadeddata", handleLoadedMetadata);
// 동영상 시간이 바뀔때마다 실행
video.addEventListener("timeupdate", handleTimeUpdate);
// 동영상 조회수 이벤트 -> video에만 있는 이벤트
video.addEventListener("ended", handleEnded);
timeline.addEventListener("input", handelTimelineChange);
fullScreenBtn.addEventListener("click", handelFullScreen);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
