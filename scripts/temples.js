

document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('menu-toggle');
    var nav = document.getElementById('main-nav');

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            var isOpen = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(isOpen));
            
            toggle.innerHTML = isOpen ? '&#10005;' : '&#9776;';
        });
    }

    
    var c = document.getElementById('copyright');
    var m = document.getElementById('last-modified');

    if (c) {
        var year = new Date().getFullYear();
        c.textContent = '© ' + year + ' Marcus de Souza Gomes';
    }

    if (m) {
        
        var lm = document.lastModified || '';
        if (lm) {
            m.textContent = 'Last modification: ' + lm;
        } else {
            m.textContent = 'Last modification date not available';
        }
    }
});