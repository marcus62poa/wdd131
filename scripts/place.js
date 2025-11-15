// js/script.js

// Static, displayed weather values (must match the content shown in HTML)
const temperature = 10; // degrees C (static value shown on page)
const windSpeed = 5; // km/h (static value shown on page)

// One-line function that returns wind chill for metric units (°C, km/h)
// Formula: 13.12 + 0.6215*T - 11.37*V^0.16 + 0.3965*T*V^0.16
function calculateWindChill(T, V) { return 13.12 + 0.6215 * T - 11.37 * Math.pow(V, 0.16) + 0.3965 * T * Math.pow(V, 0.16); }

// DOM elements
const tempEl = document.getElementById('temp-value');
const windEl = document.getElementById('wind-value');
const windchillEl = document.getElementById('windchill-value');
const yearEl = document.getElementById('current-year');
const lastModifiedEl = document.getElementById('last-modified');

// Display static values
if (tempEl) tempEl.textContent = temperature;
if (windEl) windEl.textContent = windSpeed;

// Only calculate wind chill when conditions are met:
// Metric conditions: Temperature <= 10 °C and Wind speed > 4.8 km/h
if (temperature <= 10 && windSpeed > 4.8) {
    // compute and show with one decimal
    const wc = calculateWindChill(temperature, windSpeed);
    windchillEl.textContent = `${Math.round(wc * 10) / 10} °C`;
} else {
    windchillEl.textContent = "N/A";
}

// Footer: display current year and last modified date
if (yearEl) yearEl.textContent = new Date().getFullYear();
if (lastModifiedEl) lastModifiedEl.textContent = document.lastModified || "Unknown";