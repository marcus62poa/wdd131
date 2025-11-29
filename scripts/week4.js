/* scripts.js
   JavaScript for the Filtered Temples assignment.
   All comments and code in English as requested.
*/

/* ---------------------------
   Temple array (original 7 + 3 added = 10 entries)
   ---------------------------
*/
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Peru",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // --- Three additional temples added by the student (matching required properties) ---
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 42000,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/400x250/rome-italy-temple-exterior.jpg"
    },
    {
        templeName: "Tokyo Japan",
        location: "Tokyo, Japan",
        dedicated: "1988, September, 18",
        area: 93000,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/tokyo-japan/400x250/tokyo-japan-temple.jpg"
    },
    {
        templeName: "São Paulo Brazil",
        location: "São Paulo, Brazil",
        dedicated: "1978, November, 5",
        area: 10250,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/sao-paulo-brazil/400x250/sao-paulo-temple.jpg"
    }
];

/* ---------------------------
   Utility helpers
   --------------------------- */

/**
 * Extract the year from the 'dedicated' string.
 * The dedicated string is like "2005, August, 7" or "1888, May, 21".
 * If parse fails, return NaN.
 */
function extractYear(dedicatedString) {
    const parts = String(dedicatedString).trim().split(",");
    const yearPart = parts[0] ? parts[0].trim() : "";
    const year = parseInt(yearPart, 10);
    return isNaN(year) ? NaN : year;
}

/* ---------------------------
   DOM references
   --------------------------- */
const container = document.getElementById("temples-container");
const filterButtons = document.querySelectorAll(".filter-btn");

/* ---------------------------
   Render function: create temple cards dynamically
   --------------------------- */
function createTempleCard(temple) {
    // Create main card element
    const card = document.createElement("article");
    card.className = "temple-card";
    card.setAttribute("tabindex", "0"); // make card focusable for keyboard users

    // Image (with lazy loading)
    const img = document.createElement("img");
    img.className = "temple-image";
    img.src = temple.imageUrl;
    img.alt = `${temple.templeName} - ${temple.location}`;
    img.loading = "lazy"; // native lazy loading
    img.decoding = "async";
    img.setAttribute("width", "400");
    img.setAttribute("height", "250");

    // Card body
    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("h2");
    title.className = "card-title";
    title.textContent = temple.templeName;

    const loc = document.createElement("p");
    loc.className = "meta";
    loc.textContent = `Location: ${temple.location}`;

    const dedicated = document.createElement("p");
    dedicated.className = "meta";
    dedicated.textContent = `Dedicated: ${temple.dedicated}`;

    // area and optional year display
    const metaRow = document.createElement("div");
    metaRow.className = "card-meta";

    const area = document.createElement("span");
    area.textContent = `${temple.area.toLocaleString()} sq ft`;

    const yearSpan = document.createElement("span");
    const year = extractYear(temple.dedicated);
    yearSpan.textContent = isNaN(year) ? "" : `Year: ${year}`;

    metaRow.appendChild(area);
    metaRow.appendChild(yearSpan);

    // Assemble
    body.appendChild(title);
    body.appendChild(loc);
    body.appendChild(dedicated);
    body.appendChild(metaRow);

    card.appendChild(img);
    card.appendChild(body);

    return card;
}

/* ---------------------------
   Display function (takes array of temple objects)
   --------------------------- */
function displayTemples(templeArray) {
    // Clear container
    container.innerHTML = "";

    if (!Array.isArray(templeArray) || templeArray.length === 0) {
        const emptyMsg = document.createElement("p");
        emptyMsg.textContent = "No temples match the selected filter.";
        emptyMsg.className = "meta";
        container.appendChild(emptyMsg);
        return;
    }

    // Create fragment for better performance
    const fragment = document.createDocumentFragment();

    templeArray.forEach((temple) => {
        const card = createTempleCard(temple);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

/* ---------------------------
   Filter logic
   - Old: before 1900
   - New: after 2000
   - Large: area > 90,000
   - Small: area < 10,000
   - Home: all
   --------------------------- */
function filterTemples(filterKey) {
    switch (filterKey) {
        case "old":
            return temples.filter((t) => {
                const y = extractYear(t.dedicated);
                return !isNaN(y) && y < 1900;
            });
        case "new":
            return temples.filter((t) => {
                const y = extractYear(t.dedicated);
                return !isNaN(y) && y > 2000;
            });
        case "large":
            return temples.filter((t) => Number(t.area) > 90000);
        case "small":
            return temples.filter((t) => Number(t.area) < 10000);
        case "all":
        default:
            return temples.slice(); // shallow copy of all temples
    }
}

/* ---------------------------
   Event handlers for filter buttons
   --------------------------- */
filterButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const selected = e.currentTarget;
        const filterKey = selected.dataset.filter;

        // update aria-pressed for accessibility
        filterButtons.forEach((b) => b.setAttribute("aria-pressed", "false"));
        selected.setAttribute("aria-pressed", "true");

        const results = filterTemples(filterKey);
        displayTemples(results);

        // Move keyboard focus to first result for assistive tech
        const firstCard = container.querySelector(".temple-card");
        if (firstCard) {
            firstCard.focus();
        }
    });
});

/* ---------------------------
   Footer content: copyright and last modified
   Include student's name (Marcus de Souza Gomes)
   --------------------------- */
(function populateFooter() {
    const name = "Marcus de Souza Gomes";
    const copyrightEl = document.getElementById("copyright");
    const modifiedEl = document.getElementById("lastModified");

    const year = new Date().getFullYear();
    copyrightEl.textContent = `© ${year} ${name}. All rights reserved.`;

    // document.lastModified returns an empty string in some setups (e.g., file://),
    // but for GitHub Pages it typically contains the last commit / build time.
    const lastModified = document.lastModified || "Document last modified date not available";
    modifiedEl.textContent = `Last modified: ${lastModified}`;
})();

/* ---------------------------
   Initial render: show all (Home)
   --------------------------- */
displayTemples(temples);