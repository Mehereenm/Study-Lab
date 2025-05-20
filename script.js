let pomoTitle = document.getElementById("Pomodoro");
let sbreakTitle = document.getElementById("Short");
let lbreakTitle = document.getElementById("Long");

// Default times
let pomoTime = 25; // Study time in minutes
let sbreakTime = 5; // Short break time in minutes
let lbreakTime = 15; // Long break time in minutes

let seconds = 0;
let minutes = pomoTime;
let interval;
let isRunning = false;
let breakCount = 0;

//SESSION TRACKING
let sessionCount = 0;
const notificationSound = new Audio('sweet_alarm_tone.mp3');

// Update display function
function updateDisplay() {
    document.getElementById("minutes").innerHTML = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerHTML = String(seconds).padStart(2, '0');
}

function playNotificationSound() {
    if (!notificationSound.paused) {
        notificationSound.pause();        // Pause the sound if it's already playing
        notificationSound.currentTime = 0; // Reset the sound to the beginning
    }
    notificationSound.play();            // Play the sound
}

// Select session (Pomodoro, Short Break, Long Break)
function selectSession(session) {
    clearInterval(interval);
    isRunning = false;
    // Update the active session
    if (session === 'Pomodoro') {
        minutes = pomoTime;
        pomoTitle.classList.add("active");
        sbreakTitle.classList.remove("active");
        lbreakTitle.classList.remove("active");
    } else if (session === 'Short') {
        minutes = sbreakTime;
        sbreakTitle.classList.add("active");
        pomoTitle.classList.remove("active");
        lbreakTitle.classList.remove("active");
    } else if (session === 'Long') {
        minutes = lbreakTime;
        lbreakTitle.classList.add("active");
        sbreakTitle.classList.remove("active");
        pomoTitle.classList.remove("active");
    }
    seconds = 0;
    updateDisplay();
}

// Timer function
function timer() {
    if (seconds === 0) {
        if (minutes === 0) {
            if (breakCount % 2 === 0) {
                playNotificationSound();
                alert("Great job! Time to take a well deserved break. (^o^)/");
                minutes = sbreakTime;
                seconds = 0;
                breakCount++;
                sbreakTitle.classList.add("active");
                pomoTitle.classList.remove("active");
            } else if (breakCount % 2 !== 0 && breakCount === 1) {
                alert("Short break over! Start working!");
                playNotificationSound();
                minutes = pomoTime;
                seconds = 0;
                breakCount++;
                sbreakTitle.classList.remove("active");
                pomoTitle.classList.add("active");
            } else {
                alert("Time's up! Take a long break.");
                minutes = lbreakTime;
                seconds = 0;
                breakCount = 0;
                lbreakTitle.classList.add("active");
                sbreakTitle.classList.remove("active");
            }
        } else {
            seconds = 59;
            minutes--;
        }
    } else {
        seconds--;
    }

    updateDisplay();
}

// Start function
function start() {
    if (!isRunning) {
        interval = setInterval(timer, 1000);
        isRunning = true;
        document.getElementById("start").innerHTML = `<i class="fa-solid fa-pause"></i>`;
    } else {
        clearInterval(interval);
        isRunning = false;
        document.getElementById("start").innerHTML = `<i class="fa-solid fa-play"></i>`;
        notificationSound.pause();        // Stop the sound when paused
        notificationSound.currentTime = 0;
    }
}

// Reset function
function reset() {
    clearInterval(interval);
    isRunning = false;
    selectSession('Pomodoro'); // Reset to Pomodoro session
    document.getElementById("start").innerHTML = `<i class="fa-solid fa-play"></i>`;
}

// Function to update times based on user input
function updateTimerSettings() {
    pomoTime = parseInt(document.getElementById("studyTime").value) || 25;
    sbreakTime = parseInt(document.getElementById("shortBreakTime").value) || 5;
    lbreakTime = parseInt(document.getElementById("longBreakTime").value) || 15;
    selectSession('Pomodoro'); // Reset to Pomodoro session after updating times
}

// Event listeners for buttons
document.getElementById("start").addEventListener("click", start);
document.getElementById("reset").addEventListener("click", reset);

// Event listener for time input changes
document.getElementById("studyTime").addEventListener("input", updateTimerSettings);
document.getElementById("shortBreakTime").addEventListener("input", updateTimerSettings);
document.getElementById("longBreakTime").addEventListener("input", updateTimerSettings);

// Initialize display on page load
window.onload = () => {
    updateDisplay(); // Set initial display
    selectSession('Pomodoro'); // Start with Pomodoro session
};

// Function to open the sidebar
function toggleSidebar() {
    const sidebar = document.getElementById("mySidebar");
    sidebar.style.width = "250px"; 
}

// Function to close the sidebar
function closeNav() {
    const sidebar = document.getElementById("mySidebar");
    sidebar.style.width = "0"; 
}
