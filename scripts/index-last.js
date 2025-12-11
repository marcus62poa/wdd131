document.addEventListener("DOMContentLoaded", () => {
    // Footer year and last modified
    const yearEl = document.getElementById("current-year");
    const lastEl = document.getElementById("last-modified");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (lastEl) lastEl.textContent = document.lastModified || "Unknown";

    // Gallery dynamic content
    const galleryContainer = document.getElementById("gallery-container");
    if (galleryContainer) {
        const places = [
            { name: "Grand Canyon", img: "https://source.unsplash.com/400x250/?canyon" },
            { name: "Mount Fuji", img: "https://source.unsplash.com/400x250/?mountain,japan" },
            { name: "Niagara Falls", img: "https://source.unsplash.com/400x250/?waterfall" },
            { name: "Paris", img: "https://source.unsplash.com/400x250/?paris" },
            { name: "Sahara Desert", img: "https://source.unsplash.com/400x250/?desert" }
        ];

        places.forEach(place => {
            const card = document.createElement("div");
            card.className = "gallery-card";
            card.innerHTML = `
                <img src="${place.img}" alt="${place.name}" loading="lazy">
                <h3>${place.name}</h3>
            `;
            galleryContainer.appendChild(card);
        });
    }

    // Review form handling
    const form = document.getElementById("reviewForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const placeName = document.getElementById("placeName").value;
            const rating = document.getElementById("rating").value;
            if (!placeName || !rating) {
                alert("Please fill required fields!");
                return;
            }
            const reviewText = document.getElementById("reviewText").value;
            const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
            reviews.push({ placeName, rating, reviewText, date: new Date().toLocaleString() });
            localStorage.setItem("reviews", JSON.stringify(reviews));
            form.reset();
            document.getElementById("reviewMessage").textContent = "Review submitted successfully!";
        });
    }
});