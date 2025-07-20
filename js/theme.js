const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
if (localStorage.getItem('tema') === 'gelap') {
    body.classList.add('tema-gelap');
    themeToggle.checked = true;
}

themeToggle.addEventListener('change', function() {
    if (this.checked) {
        body.classList.add('tema-gelap');
        localStorage.setItem('tema', 'gelap');
    } else {
        body.classList.remove('tema-gelap');
        localStorage.setItem('tema', 'terang');
    }
});