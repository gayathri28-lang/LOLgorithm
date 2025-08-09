const generateBtn = document.getElementById("generateBtn");
const moodSelect = document.getElementById("moodSelect");
const loadingDiv = document.getElementById("loading");
const loadingMessage = document.getElementById("loadingMessage");
const memeOutput = document.getElementById("memeOutput");

const loadingMessages = [
  "Calibrating brainwaves...",
  "Reticulating splines...",
  "Consulting meme archives...",
  "Aligning chakras...",
  "Loading nonsense...",
  "Checking vibes...",
  "Rebooting mood sensors...",
  "Summoning the meme gods...",
];

const memes = {
  happy: [
    "Why so happy? You just lost your keys again! 🔑😂\nMaybe check the fridge next time. 🥶🍕",
    "Smiling like you won the lottery... but you didn’t even buy a ticket! 🎫😜\nBetter luck next time! 🍀💸",
    "Happiness overload! Warning: May cause spontaneous dance moves! 💃🤣\nNeighbors might call the cops. 🚔👮‍♂️",
  ],
  sad: [
    "Feeling sad? Maybe your pizza is cold and the WiFi is slow. 🍕📶😭\nTime for a reboot, or a nap! 😴🛌",
    "Tears incoming because your favorite show got canceled! 📺💔😢\nLife’s cruel like that sometimes. 🎭☔️",
    "Sadness level: Lost your phone and it’s on silent. 📱🔕😭\nGood luck finding it now! 🕵️‍♀️😵",
  ],
  angry: [
    "So angry you could roast a marshmallow on your forehead! 🔥😡🔥\nCareful, or you’ll start a fire! 🔥🚒",
    "Rage mode: Activated. Objects may be thrown at will! 🏀💥🤬\nBetter find a punching bag ASAP! 🥊😤",
    "Fuming like a dragon that lost its treasure! 🐉💰😠\nMaybe try some chamomile tea? 🍵🧘‍♂️",
  ],
  bored: [
    "Bored enough to count the cracks in the ceiling. 🏠😑\nTile number 7 looks suspicious! 👀🔍",
    "Talking to your plants because humans are boring. 🌿😐🗣️\nThey don’t talk back though... yet. 🤖🌱",
    "Watching paint dry is thrilling, said no one ever. 🎨😴\nMaybe try watching water boil next! 💧🔥",
  ],
  confused: [
    "Brain.exe has stopped working. Please wait... 🤯🧠❓\nOr just give up and eat snacks! 🍿😵",
    "Left is right, and right is... where? 🤔🔄🤷‍♂️\nWho even knows anymore? 🤷‍♀️🌪️",
    "Lost in your own thoughts like a tourist without a map. 🗺️🤪😕\nGood luck finding the exit! 🚪😵",
  ],
};

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function showLoading(callback) {
  loadingDiv.classList.remove("hidden");
  memeOutput.classList.add("hidden");
  let count = 0;
  const maxCount = 7;
  
  const interval = setInterval(() => {
    loadingMessage.textContent = loadingMessages[count % loadingMessages.length];
    count++;
    if (count > maxCount) {
      clearInterval(interval);
      loadingDiv.classList.add("hidden");
      callback();
    }
  }, 800);
}

generateBtn.addEventListener("click", () => {
  const mood = moodSelect.value;
  showLoading(() => {
    // Show wrong meme (useless!):
    const wrongMeme = getRandomItem(memes[mood]);
    memeOutput.textContent = wrongMeme;
    memeOutput.classList.remove("hidden");
  });
});
