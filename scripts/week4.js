
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
    location: "Lima, Perú",
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

  // 🔥 NEW TEMPLES ADDED (required by assignment)
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41000,
    imageUrl: "https://churchofjesuschrist.org/imgs/rome-italy-temple.jpg"
  },
  {
    templeName: "Tokyo Japan",
    location: "Tokyo, Japan",
    dedicated: "1980, October, 27",
    area: 52900,
    imageUrl: "https://churchofjesuschrist.org/imgs/tokyo-japan-temple.jpg"
  },
  {
    templeName: "São Paulo Brazil",
    location: "São Paulo, Brazil",
    dedicated: "1978, October, 30",
    area: 59246,
    imageUrl: "https://churchofjesuschrist.org/imgs/sao-paulo-brazil-temple.jpg"
  }
];

function extractYear(dedicatedString) {
    const parts = String(dedicatedString).trim().split(",");
    const yearPart = parts[0] ? parts[0].trim() : "";
    const year = parseInt(yearPart, 10);
    return isNaN(year) ? NaN : year;
}


const container = document.getElementById("temples-container");
const filterButtons = document.querySelectorAll(".filter-btn");


function createTempleCard(temple) {
 
    const card = document.createElement("article");
    card.className = "temple-card";
    card.setAttribute("tabindex", "0"); 

    
    const img = document.createElement("img");
    img.className = "temple-image";
    img.src = temple.imageUrl;
    img.alt = `${temple.templeName} - ${temple.location}`;
    img.loading = "lazy"; 
    img.decoding = "async";
    img.setAttribute("width", "400");
    img.setAttribute("height", "250");

    
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


function displayTemples(templeArray) {
   
    container.innerHTML = "";

    if (!Array.isArray(templeArray) || templeArray.length === 0) {
        const emptyMsg = document.createElement("p");
        emptyMsg.textContent = "No temples match the selected filter.";
        emptyMsg.className = "meta";
        container.appendChild(emptyMsg);
        return;
    }

   
    const fragment = document.createDocumentFragment();

    templeArray.forEach((temple) => {
        const card = createTempleCard(temple);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

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
            return temples.slice(); 
    }
}


filterButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const selected = e.currentTarget;
        const filterKey = selected.dataset.filter;

       
        filterButtons.forEach((b) => b.setAttribute("aria-pressed", "false"));
        selected.setAttribute("aria-pressed", "true");

        const results = filterTemples(filterKey);
        displayTemples(results);

        
        const firstCard = container.querySelector(".temple-card");
        if (firstCard) {
            firstCard.focus();
        }
    });
});


(function populateFooter() {
    const name = "Marcus de Souza Gomes";
    const copyrightEl = document.getElementById("copyright");
    const modifiedEl = document.getElementById("lastModified");

    const year = new Date().getFullYear();
    copyrightEl.textContent = `© ${year} ${name}. All rights reserved.`;

 
    const lastModified = document.lastModified || "Document last modified date not available";
    modifiedEl.textContent = `Last modified: ${lastModified}`;
})();


displayTemples(temples);