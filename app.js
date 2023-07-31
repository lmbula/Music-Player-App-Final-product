var playPauseBtn = document.querySelector(".playpause-track");
var audio = document.getElementById("audio");
var audioSource = document.getElementById("audioSource");
var playPauseIcon = document.getElementById("playpause-icon");
var playList = [
  "Forrest Frank-Altar.mp3",
  "Hulvey-Beautiful.mp3",
  "Sondae(ft. Isabelle Brown)-Air I Breathe.mp3",
];
var currentSongIndex = 0;
var prevBtn = document.querySelector(".prev-track");
var nextBtn = document.querySelector(".next-track");
var volumedwnBtn = document.getElementById("volumedwnBtn");
var previousVolume = audio.volume;
var volumeSlider = document.querySelector(".volume_slider");
var totalTimeDuration = document.querySelector(".total-duration");
var progressBar = document.querySelector(".seek_slider");
const seekSliderThumb = document.querySelector(
  ".seek_slider::-webkit-slider-thumb"
);

window.addEventListener("load", (event) => {
  updateTrackInfo();
});

// Function to play and pause the audio
function playpauseTrack() {
  //loading the song dynamically from the array
  var songUrl = playList[currentSongIndex];
  audioSource.src = songUrl;

  audio.load();
  audio.addEventListener("canplaythrough", function () {
    //canplaythrough event to ensure that the audio source has finished loading before calling the play() method
    if (audio.paused) {
      audio.play();
      playPauseIcon.classList.remove("fa-play-circle");
      playPauseIcon.classList.add("fa-pause-circle");
    } else {
      audio.pause();
      playPauseIcon.classList.remove("fa-pause-circle");
      playPauseIcon.classList.add("fa-play-circle");
    } // this loop is used to play and pause the audio and toggle the play and pause image
  });
  // updates the progress bar dynamically as the song plays
  audio
    .play()
    .then(function () {
      setInterval(function () {
        const currentTime = audio.currentTime;
        const duration = audio.duration;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.value = progressPercent;
        // progressBar.value = audio.currentTime;
      }, 100);
    })
    .catch(function (error) {
      console.log("Error occurred while trying to play the audio:", error);
    });
}

//Used to update the information of the current song playing
function updateTrackInfo() {
  var currentSong = playList[currentSongIndex];
  var trackNameElement = document.querySelector(".track-name");
  var trackArtistElement = document.querySelector(".track-artist");

  var songParts = currentSong.split("-");
  var trackName = songParts[1].split(".")[0].trim();
  var trackArtist = songParts[0].trim();

  trackNameElement.textContent = trackName;
  trackArtistElement.textContent = trackArtist;

  var nowPlaying = document.querySelector(".now-playing");
  nowPlaying.textContent = `Now Playing ${trackName} of ${trackArtist}`;
}

function prevTrack() {
  // prevBtn.addEventListener("click", function () {
  if (currentSongIndex == 0) {
    currentSongIndex = playList.length - 1;
  } else {
    currentSongIndex--;
  }
  playpauseTrack();
  updateTrackInfo();
  // });
}

function nextTrack() {
  // nextBtn.addEventListener("click", function () {
  if (currentSongIndex === playList.length - 1) {
    currentSongIndex = 0;
  } else {
    currentSongIndex++;
  }
  playpauseTrack();
  updateTrackInfo();
  // });
}

function setVolume() {
  // volumeSlider.addEventListener("input", function () {
  let rangeValue = volumeSlider.value;
  if (rangeValue <= 0.0) {
    audio.volume = 0.0;
  } else if (rangeValue <= 20) {
    audio.volume = 0.2;
  } else if (rangeValue <= 50) {
    audio.volume = 0.5;
  } else if (rangeValue <= 80) {
    audio.volume = 0.8;
  } else {
    audio.volume = 1.0;
  }
  // });
}
//function to increase the volume
volumeSlider.addEventListener("input", setVolume);
//function to reduce the volume
volumedwnBtn.addEventListener("click", function () {
  if (audio.volume === 0) {
    // If the volume is already muted, restore the previous volume level
    audio.volume = previousVolume;
  } else {
    // Otherwise, store the current volume level and set it to 0 to mute
    previousVolume = audio.volume;
    audio.volume = 0;
  }
});
//Function to format the time to minutes and seconds
function formatTime(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  return formattedTime;
}

// Function to update the current time dynamically
function updateCurrentTime() {
  var currentTimeElement = document.querySelector(".current-time");
  currentTime = audio.currentTime;
  const formattedTime = formatTime(currentTime);
  currentTimeElement.textContent = formattedTime;
}
audio.addEventListener("timeupdate", updateCurrentTime);

// Function to update the total duration dynamically
function updateTotalDuration() {
  const totalDuration = audio.duration;
  const formattedDuration = formatTime(totalDuration);
  // Perform any desired actions with the formatted duration, such as displaying it on the UI
  totalTimeDuration.textContent = formattedDuration;
}

audio.addEventListener("loadedmetadata", updateTotalDuration);

function seekTo() {
  progressBar.addEventListener("click", function (event) {
    const progressBarWidth = progressBar.offsetWidth; //calculates the width of the progress bar
    const clickPosition = event.offsetX; // gives the X-coordinate of the click relative to the progressBar
    const seekToTime = (clickPosition / progressBarWidth) * audio.duration;
    audio.currentTime = seekToTime;
  });
}
