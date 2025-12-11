document.addEventListener("DOMContentLoaded", function () {
    /* ===== FOOTER DYNAMIC ===== */
    const yearEls = document.querySelectorAll("#currentyear, #current-year, #copyright");
    yearEls.forEach(el => el.textContent = new Date().getFullYear());

    const modifiedEls = document.querySelectorAll("#lastModified, #last-modified, #m");
    modifiedEls.forEach(el => el.textContent = `Last modified: ${document.lastModified || "Unknown"}`);

    /* ===== FORM FUNCTIONALITY ===== */
    const form = document.getElementById("reviewForm");
    if (form) {
        const select = document.getElementById("productName");
        form.addEventListener("submit", function (e) {
            const ratingChecked = document.querySelector('input[name="rating"]:checked');
            const productSelected = select.value;
            const dateInput = document.getElementById("installDate");

            if (!ratingChecked || !productSelected || !dateInput.value) {
                e.preventDefault();
                alert("Please complete all required fields.");
                return false;
            }

            sessionStorage.setItem("submittedReview", "true");
            localStorage.setItem("reviewSubmitted", "true");
            return true;
        });
    }

    /* ===== TEMPLES FUNCTIONALITY ===== */
    const temples = [
        { templeName: "Aba Nigeria", location: "Aba, Nigeria", dedicated: "2005, August, 7", area: 11500, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg" },
        { templeName: "Manti Utah", location: "Manti, Utah, United States", dedicated: "1888, May, 21", area: 74792, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg" },
        { templeName: "Payson Utah", location: "Payson, Utah, United States", dedicated: "2015, June, 7", area: 96630, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg" },
        { templeName: "Yigo Guam", location: "Yigo, Guam", dedicated: "2020, May, 2", area: 6861, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg" }
    ];

    const container = document.getElementById("temples-container");
    const filterButtons = document.querySelectorAll(".filter-btn");

    function extractYear(dedicatedString) {
        const parts = String(dedicatedString).trim().split(",");
        const yearPart = parts[0] ? parts[0].trim() : "";
        const year = parseInt(yearPart, 10);
        return isNaN(year) ? NaN : year;
    }

    function createTempleCard(temple) {
        const card = document.createElement("article");
        card.className = "temple-card";
        card.setAttribute("tabindex", "0");
        card.innerHTML = `
            <img src="${temple.imageUrl}" alt="${temple.templeName} - ${temple.location}" loading="lazy">
            <div class="card-body">
                <h2 class="card-title">${temple.templeName}</h2>
                <p class="meta">Location: ${temple.location}</p>
                <p class="meta">Dedicated: ${temple.dedicated}</p>
                <div class="card-meta">
                    <span>${temple.area.toLocaleString()} sq ft</span>
                    <span>Year: ${extractYear(temple.dedicated)}</span>
                </div>
            </div>
        `;
        return card;
    }

    function displayTemples(templeArray) {
        if (!container) return;
        container.innerHTML = "";
        if (!Array.isArray(templeArray) || templeArray.length === 0) {
            const emptyMsg = document.createElement("p");
            emptyMsg.textContent = "No temples match the selected filter.";
            emptyMsg.className = "meta";
            container.appendChild(emptyMsg);
            return;
        }
        templeArray.forEach((temple) => container.appendChild(createTempleCard(temple)));
    }

    function filterTemples(filterKey) {
        switch (filterKey) {
            case "old": return temples.filter(t => extractYear(t.dedicated) < 1900);
            case "new": return temples.filter(t => extractYear(t.dedicated) > 2000);
            case "large": return temples.filter(t => t.area > 90000);
            case "small": return temples.filter(t => t.area < 10000);
            case "all": default: return temples.slice();
        }
    }

    filterButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            filterButtons.forEach(b => b.setAttribute("aria-pressed", "false"));
            btn.setAttribute("aria-pressed", "true");
            const results = filterTemples(btn.dataset.filter);
            displayTemples(results);
        });
    });

    displayTemples(temples);

    /* ===== NAV TOGGLE (temples.js) ===== */
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(isOpen));
            toggle.innerHTML = isOpen ? '&#10005;' : '&#9776;';
        });
    }

    /* ===== PLACE.JS (wind chill example) ===== */
    const temperature = 10;
    const windSpeed = 5;
    const tempEl = document.getElementById('temp-value');
    const windEl = document.getElementById('wind-value');
    const windchillEl = document.getElementById('windchill-value');

    function calculateWindChill(T, V) {
        return 13.12 + 0.6215 * T - 11.37 * Math.pow(V, 0.16) + 0.3965 * T * Math.pow(V, 0.16);
    }

    if (tempEl) tempEl.textContent = temperature;
    if (windEl) windEl.textContent = windSpeed;
    if (windchillEl) windchillEl.textContent = (temperature <= 10 && windSpeed > 4.8) ? `${Math.round(calculateWindChill(temperature, windSpeed) * 10) / 10} °C` : "N/A";
});