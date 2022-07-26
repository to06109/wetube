/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/videoPlayer.js":
/*!**************************************!*\
  !*** ./src/client/js/videoPlayer.js ***!
  \**************************************/
/***/ (() => {

eval("var video = document.querySelector(\"video\");\nvar playBtn = document.getElementById(\"play\");\nvar muteBtn = document.getElementById(\"mute\");\nvar volumeRange = document.getElementById(\"volume\");\nvar currentTime = document.getElementById(\"currentTime\");\nvar totalTime = document.getElementById(\"totalTime\");\nvar timeline = document.getElementById(\"timeline\");\nvar fullScreenBtn = document.getElementById(\"fullScreen\");\nvar videoContainer = document.getElementById(\"videoContainer\");\nvar videoControls = document.getElementById(\"videoControls\");\nvar controlsTimeout = null;\nvar volumeValue = 0.5; // 볼륨이 바뀔때마다 업데이트\n// volume default\n\nvideo.volume = volumeValue;\n\nvar handlePlayClick = function handlePlayClick(e) {\n  // if the video is playing, pause it,\n  // else play the video\n  if (video.paused) {\n    video.play();\n  } else {\n    video.pause();\n  }\n\n  playBtn.innerText = video.paused ? \"Play\" : \"Pause\";\n};\n\nvar handleMute = function handleMute(e) {\n  if (video.muted) {\n    video.muted = false;\n  } else {\n    video.muted = true;\n  }\n\n  muteBtn.innerText = video.muted ? \"Unmute\" : \"Mute\";\n  volumeRange.value = video.muted ? 0 : 1;\n};\n\nvar handleVolumeChange = function handleVolumeChange(event) {\n  var value = event.target.value; // 음소거한 상태에서 볼륨바 움직이면 음소거가 해제\n\n  if (video.muted) {\n    video.muted = false;\n    muteBtn.innerText = \"Mute\";\n  }\n\n  volumeValue = value;\n  video.volume = value;\n};\n\nvar formatTime = function formatTime(seconds) {\n  return new Date(seconds * 1000).toISOString().substr(11, 8);\n}; // 비디오 총 시간 설정\n\n\nvar handleLoadedMetadata = function handleLoadedMetadata() {\n  totalTime.innerText = formatTime(Math.floor(video.duration)); // range에 비디오 총 시간 설정\n\n  timeline.max = Math.floor(video.duration);\n}; // 현재 비디오 시간 업데이트\n\n\nvar handleTimeUpdate = function handleTimeUpdate() {\n  currentTime.innerText = formatTime(Math.floor(video.currentTime));\n  timeline.value = Math.floor(video.currentTime);\n};\n\nvar handelTimelineChange = function handelTimelineChange(event) {\n  var value = event.target.value; // 비디오와 재생바 시간 연결\n\n  video.currentTime = value;\n};\n\nvar handelFullScreen = function handelFullScreen() {\n  var fullscreen = document.fullscreenElement;\n\n  if (fullscreen) {\n    document.exitFullscreen(); // 전체화면 종료\n\n    fullScreenBtn.innerText = \"Enter Full Screen\";\n  } else {\n    videoContainer.requestFullscreen(); // 전체화면\n\n    fullScreenBtn.innerText = \"Exit Full Screen\";\n  }\n};\n\nvar handleMouseMove = function handleMouseMove() {\n  // 3초 지나기 전에 마우스 다시들어오면 controlsTimeout 초기화\n  if (controlsTimeout) {\n    clearTimeout(controlsTimeout);\n    controlsTimeout = null;\n  }\n\n  videoControls.classList.add(\"showing\");\n};\n\nvar handleMouseLeave = function handleMouseLeave() {\n  // 나가면 3초 뒤에 사라짐\n  controlsTimeout = setTimeout(function () {\n    videoControls.classList.remove(\"showing\");\n  }, 3000);\n};\n\nplayBtn.addEventListener(\"click\", handlePlayClick);\nmuteBtn.addEventListener(\"click\", handleMute);\nvolumeRange.addEventListener(\"change\", handleVolumeChange);\nvideo.addEventListener(\"loadedmetadata\", handleLoadedMetadata); // 동영상 시간이 바뀔때마다 실행\n\nvideo.addEventListener(\"timeupdate\", handleTimeUpdate);\ntimeline.addEventListener(\"input\", handelTimelineChange);\nfullScreenBtn.addEventListener(\"click\", handelFullScreen);\nvideo.addEventListener(\"mousemove\", handleMouseMove);\nvideo.addEventListener(\"mouseleave\", handleMouseLeave);\n\n//# sourceURL=webpack://wetube/./src/client/js/videoPlayer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/videoPlayer.js"]();
/******/ 	
/******/ })()
;