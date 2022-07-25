const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");

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

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("change", handleVolumeChange);
