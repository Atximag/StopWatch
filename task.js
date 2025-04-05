const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const timerStatus = document.getElementById("timer");
const lapsList = document.getElementById("laps");
let isRunning = false;
let startTime = 0;
let stopTime = 0;
let interval = null;
function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const hundredths = Math.floor((ms % 1000) / 10);

    const mm = String(minutes).padStart(2, "0");
    const ss = String(seconds).padStart(2, "0");
    const hs = String(hundredths).padStart(2, "0");

    return `${mm}:${ss}:${hs}`;
}
function updateTimer() {
    const now = Date.now();
    const timePassed = now - startTime + stopTime;
    timerStatus.textContent = formatTime(timePassed);
}
startButton.addEventListener("click", () => {
    if (!isRunning) {
        startTime = Date.now();
        interval = setInterval(updateTimer, 10);
        isRunning = true;
    }
});
stopButton.addEventListener("click", () => {
    if (isRunning) {
        clearInterval(interval);
        stopTime += Date.now() - startTime;
        isRunning = false;
    }
});
resetButton.addEventListener("click", () => {
    clearInterval(interval);
    isRunning = false;
    stopTime = 0;
    timerStatus.textContent = "00:00:00";
    lapsList.innerHTML = ""
});
lapButton.addEventListener("click", () => {
    lapsList.innerHTML += `<li>${formatTime(Date.now() - startTime + stopTime)}</li>`;
})

