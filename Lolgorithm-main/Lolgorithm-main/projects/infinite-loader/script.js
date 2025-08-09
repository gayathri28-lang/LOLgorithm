const chatBox = document.getElementById('chatBox');
const excuseForm = document.getElementById('excuseForm');
const userInput = document.getElementById('userInput');

// Sarcastic, realistic-ish fake excuses making fun of user problems
const sarcasticExcuses = [
  "Oh sure, because your alarm clock magically turned into a disco ball and kept you up all night. 🕺⏰",
  "Sounds like your boss didn't get the memo that 'procrastination' is your superpower. 💪⌛",
  "I bet your dog ate your motivation again. That sneaky little furball! 🐶🍕",
  "Classic case of 'Netflix binged too hard' syndrome. Happens to the best of us. 📺😴",
  "Your internet probably took a coffee break just when you needed it most. ☕📶",
  "Ah, the old 'my pen ran out of ink during the big moment' excuse. So original! 🖊️💥",
  "Clearly your brain decided to take a vacation without telling you first. 🧠🏝️",
  "Blaming the weather? Yeah, because a little rain totally cancels your responsibilities. ☔🙄",
  "Your shoes tied themselves together in a sabotage attempt. Sneaky footwear! 👟🔗",
  "Let's be honest, your calendar just loves to play hide and seek with your deadlines. 📅🤡",
  "The coffee machine conspired against you, didn’t it? No caffeine, no productivity! ☕🚫",
  "Your email must have gone on a secret mission to the spam folder. Mission failed. 📧🕵️‍♂️",
  "Your motivation took a wrong turn at Albuquerque. Happens all the time. 🛣️🤷‍♂️",
  "Seems like your phone's autocorrect decided to sabotage your excuses. Classic. 📱❌",
  "Oh no, your socks formed a union and refused to help you today. 🧦✊",
];

// Fake “typing” delay (milliseconds)
const typingDelay = 1600;

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
    // Pick a sarcastic excuse regardless of user input (uselessness!)
    const excuse = sarcasticExcuses[Math.floor(Math.random() * sarcasticExcuses.length)];
    addMessage(excuse, 'bot');
    userInput.disabled = false;
    userInput.focus();
  });
});
