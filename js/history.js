let calculationHistory = [];

function addToHistory(calculation) {
    calculationHistory.unshift(calculation);
    if (calculationHistory.length > 10) {
        calculationHistory.pop();
    }
    updateHistory();
}

function updateHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    
    calculationHistory.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.textContent = item;
        historyItem.onclick = () => {
            currentInput = item.split(' = ')[0];
            updateDisplay();
            toggleHistory();
        };
        historyList.appendChild(historyItem);
    });
}

function toggleHistory() {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('open');
}

// Close settings panel when clicking elsewhere
document.addEventListener('click', function(event) {
    const settingsPanel = document.querySelector('.settings-panel');
    const settingsLink = document.querySelector('.nav-item.settings .nav-link');
    
    if (!settingsPanel.contains(event.target) && event.target !== settingsLink && !settingsLink.contains(event.target)) {
        settingsPanel.style.display = 'none';
    }
});