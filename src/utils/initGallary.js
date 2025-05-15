import "../styles/about/style.scss";


const images = Array.from({ length: 3 }, (_, i) => `human-${i+1}.png`);
const sounds = Array.from({ length: 10 }, (_, i) => new Audio(`./1.mp3`));
const mainImage = document.getElementById("mainImage");
const playerStatus = document.getElementById("playerStatus");
const volumeControl = document.getElementById("volumeControl");

let currentAudio = null;

function getRandomIndex() {
  return Math.floor(Math.random() * images.length);
}

function changeMedia() {
  const index = getRandomIndex();

  mainImage.classList.add("gallery__image--fade-out");
  setTimeout(() => {
    mainImage.src = images[index];
    mainImage.classList.remove("gallery__image--fade-out");
  }, 300);


  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  currentAudio = sounds[index];
  currentAudio.volume = volumeControl.value;
  currentAudio.play();

  playerStatus.textContent = "▶ Играет";

  currentAudio.onended = () => {
    playerStatus.textContent = "⏸ Пауза";
  };
}

document.getElementById("btn1").addEventListener("click", changeMedia);
document.getElementById("btn2").addEventListener("click", changeMedia);

volumeControl.addEventListener("input", () => {
  if (currentAudio) {
    currentAudio.volume = volumeControl.value;
  }
});
