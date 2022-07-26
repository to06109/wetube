const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");

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
  playBtn.innerText = video.paused ? "Play" : "Pause";
};

const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : 1;
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
  new Date(seconds * 1000).toISOString().substr(11, 8);

// 비디오 총 시간 설정
const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  // range에 비디오 총 시간 설정
  timeline.max = Math.floor(video.duration);
};

// 현재 비디오 시간 업데이트
const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
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
    document.exitFullscreen();
    fullScreenBtn.innerText = "Enter Full Screen";
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtn.innerText = "Exit Full Screen";
  }
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("change", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
// 동영상 시간이 바뀔때마다 실행
video.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("input", handelTimelineChange);
fullScreenBtn.addEventListener("click", handelFullScreen);
