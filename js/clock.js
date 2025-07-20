function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('id-ID');
    document.getElementById('clock').textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock();