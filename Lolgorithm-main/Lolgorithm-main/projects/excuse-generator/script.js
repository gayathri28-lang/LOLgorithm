const chatBox = document.getElementById('chatBox');
const excuseForm = document.getElementById('excuseForm');
const userInput = document.getElementById('userInput');

// Totally bogus, hilarious, wrong excuses
const fakeExcuses = [
  "Sorry, my pet dragon ate your homework 🐉🔥.",
  "I was abducted by aliens and they deleted my memory 👽🛸.",
  "The time-traveling hamster messed up my schedule ⏳🐹.",
  "I tried to teleport but ended up in Narnia 🦁❄️.",
  "The Wi-Fi fairy is on vacation, so no excuses today 🧚‍♂️📵.",
  "My socks had a fight and I couldn't find a matching pair 🧦🤼‍♂️.",
  "I accidentally switched brains with a goldfish 🐠💭.",
  "The office chair turned into a roller coaster 🎢🪑, no escape!",
  "I was busy arguing with my reflection 🤡🪞.",
  "The universe is just trolling me today 🌌🎭."
];

// Fake “typing” delay (milliseconds)
const typingDelay = 1500;

function addMessage(text, sender) {
  const msg = document.createElement('div');
  msg.classList.add('message');
  msg.classList.add(sender === 'user' ? 'user-msg' : 'bot-msg');
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function botTypingEffect(callback) {
  const typingMsg = document.createElement('div');
  typingMsg.classList.add('message', 'bot-msg');
  typingMsg.textContent = '🤖 Thinking hard...';
  chatBox.appendChild(typingMsg);
  chatBox.scrollTop = chatBox.scrollHeight;

  setTimeout(() => {
    chatBox.removeChild(typingMsg);
    callback();
  }, typingDelay);
}

excuseForm.addEventListener('submit', e => {
  e.preventDefault();
  const userText = userInput.value.trim();
  if (!userText) return;

  addMessage(userText, 'user');
  userInput.value = '';
  userInput.disabled = true;

  botTypingEffect(() => {
    // Pick a random wrong excuse regardless of user input (uselessness!)
    const excuse = fakeExcuses[Math.floor(Math.random() * fakeExcuses.length)];
    addMessage(excuse, 'bot');
    userInput.disabled = false;
    userInput.focus();
  });
});
