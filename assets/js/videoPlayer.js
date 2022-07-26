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

eval("var video = document.querySelector(\"video\");\nvar playBtn = document.getElementById(\"play\");\nvar muteBtn = document.getElementById(\"mute\");\nvar volumeRange = document.getElementById(\"volume\");\nvar currentTime = document.getElementById(\"currentTime\");\nvar totalTime = document.getElementById(\"totalTime\");\nvar volumeValue = 0.5; // 볼륨이 바뀔때마다 업데이트\n// volume default\n\nvideo.volume = volumeValue;\n\nvar handlePlayClick = function handlePlayClick(e) {\n  // if the video is playing, pause it,\n  // else play the video\n  if (video.paused) {\n    video.play();\n  } else {\n    video.pause();\n  }\n\n  playBtn.innerText = video.paused ? \"Play\" : \"Pause\";\n};\n\nvar handleMute = function handleMute(e) {\n  if (video.muted) {\n    video.muted = false;\n  } else {\n    video.muted = true;\n  }\n\n  muteBtn.innerText = video.muted ? \"Unmute\" : \"Mute\";\n  volumeRange.value = video.muted ? 0 : 1;\n};\n\nvar handleVolumeChange = function handleVolumeChange(event) {\n  var value = event.target.value; // 음소거한 상태에서 볼륨바 움직이면 음소거가 해제\n\n  if (video.muted) {\n    video.muted = false;\n    muteBtn.innerText = \"Mute\";\n  }\n\n  volumeValue = value;\n  video.volume = value;\n}; // 비디오 총 시간 설정\n\n\nvar handleLoadedMetadata = function handleLoadedMetadata() {\n  totalTime.innerText = Math.floor(video.duration);\n}; // 현재 비디오 시간 업데이트\n\n\nvar handleTimeUpdate = function handleTimeUpdate() {\n  currentTime.innerText = Math.floor(video.currentTime);\n};\n\nplayBtn.addEventListener(\"click\", handlePlayClick);\nmuteBtn.addEventListener(\"click\", handleMute);\nvolumeRange.addEventListener(\"change\", handleVolumeChange);\nvideo.addEventListener(\"loadedmetadata\", handleLoadedMetadata); // 동영상 시간이 바뀔때마다 실행\n\nvideo.addEventListener(\"timeupdate\", handleTimeUpdate);\n\n//# sourceURL=webpack://wetube/./src/client/js/videoPlayer.js?");

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