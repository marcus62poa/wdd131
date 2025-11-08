// temples.js - external javascript
// Accessibility-friendly hamburger toggle and footer dynamic text

document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('menu-toggle');
    var nav = document.getElementById('main-nav');

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            var isOpen = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(isOpen));
            // change hamburger to X and vice versa without printing to console
            toggle.innerHTML = isOpen ? '&#10005;' : '&#9776;';
        });
    }

    // Footer dynamic content
    var c = document.getElementById('copyright');
    var m = document.getElementById('last-modified');

    if (c) {
        var year = new Date().getFullYear();
        c.textContent = '© ' + year + ' Marcus de Souza Gomes';
    }

    if (m) {
        // document.lastModified may return empty in some servers; fall back gracefully
        var lm = document.lastModified || '';
        if (lm) {
            m.textContent = 'Last modification: ' + lm;
        } else {
            m.textContent = 'Last modification date not available';
        }
    }
});