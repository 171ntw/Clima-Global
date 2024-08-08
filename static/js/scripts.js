document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = getCookie('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
    }

    updateIcons(savedTheme);

    themeToggleButton.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            setCookie('theme', 'dark-theme', 365);
            updateIcons('dark-theme');
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            setCookie('theme', 'light-theme', 365);
            updateIcons('light-theme');
        }
    });

    function setCookie(name, value, days) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
    }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
    }

    function updateIcons(theme) {
        const sunIcon = document.querySelector('.bx-sun');
        const moonIcon = document.querySelector('.bx-moon');
        if (theme === 'dark-theme') {
            sunIcon.classList.remove('active');
            moonIcon.classList.add('active');
        } else {
            sunIcon.classList.add('active');
            moonIcon.classList.remove('active');
        }
    }
});