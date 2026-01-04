/* script.js */

// 1. Language Handling
// Defaults to English if no preference is saved
let currentLang = localStorage.getItem('lang') || 'en';

function updateContent() {
    // 1. Get dictionary for current language
    const langData = translations[currentLang];
    
    // 2. Update all elements with 'data-lang' attribute
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (langData[key]) {
            element.innerText = langData[key];
        }
    });

    // 3. Update the dropdown text to show current language
    document.getElementById('currentLang').innerText = currentLang.toUpperCase();
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang); // Save preference
    updateContent();
}

// 2. Theme Handling
// Check saved theme or system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.body.setAttribute('data-theme', 'dark');
    document.getElementById('themeIcon').classList.replace('fa-moon', 'fa-sun');
}

function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('themeIcon');
    
    if (body.getAttribute('data-theme') === 'dark') {
        // Switch to Light
        body.removeAttribute('data-theme');
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        // Switch to Dark
        body.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    updateContent();
});

