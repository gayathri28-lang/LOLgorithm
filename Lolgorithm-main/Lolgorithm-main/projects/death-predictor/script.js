// Start Button Click
document.getElementById("startBtn").addEventListener("click", function() {
    const scareSound = document.getElementById("scareSound");
    document.body.classList.add("flash");
    scareSound.play();

    setTimeout(() => {
        document.querySelector(".start-screen").classList.add("hidden");
        document.getElementById("predictionContainer").classList.remove("hidden");
        document.body.classList.remove("flash");
    }, 500); // short delay for effect
});

// Predict Button Click
document.getElementById("predictBtn").addEventListener("click", function() {
    const birthday = document.getElementById("birthday").value;
    const mood = document.getElementById("mood").value;

    if (!birthday) {
        alert("Enter your birthday before summoning fate.");
        return;
    }

    const deathDate = generateDeathDate(birthday, mood);
    const cause = getCreepyCause(mood);
    const daysRemaining = calculateDaysRemaining(deathDate);

    document.getElementById("deathDate").textContent = `Death Date: ${deathDate}`;
    document.getElementById("deathCause").textContent = `Cause of Death: ${cause}`;
    document.getElementById("daysRemaining").textContent = `Days Remaining: ${daysRemaining}`;
});

function generateDeathDate(birthday, mood) {
    const birth = new Date(birthday);
    const lifespan = Math.floor(Math.random() * 40) + 20; // age 20–60
    birth.setFullYear(birth.getFullYear() + lifespan);
    return birth.toDateString();
}

function getCreepyCause(mood) {
    const causes = {
        calm: [
            "Your breath will stop in your sleep as unseen eyes watch.",
            "You will fade quietly into the shadows, leaving no trace."
        ],
        sad: [
            "A figure will call your name from the darkness, and you will follow.",
            "You will drown in silence, beneath a sky without stars."
        ],
        angry: [
            "You will be found in a locked room, walls scratched from within.",
            "Blood will cover the floor, yet none will be yours."
        ],
        fearful: [
            "Your reflection will smile back before dragging you in.",
            "At 3:17 AM, a shadow will stand at your bedside until your last breath."
        ]
    };
    return causes[mood][Math.floor(Math.random() * causes[mood].length)];
}

function calculateDaysRemaining(deathDate) {
    const now = new Date();
    const death = new Date(deathDate);
    const diff = death - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
