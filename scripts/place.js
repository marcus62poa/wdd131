
const temperature = 10; // degrees C (static value shown on page)
const windSpeed = 5; // km/h (static value shown on page)


function calculateWindChill(T, V) { return 13.12 + 0.6215 * T - 11.37 * Math.pow(V, 0.16) + 0.3965 * T * Math.pow(V, 0.16); }

const tempEl = document.getElementById('temp-value');
const windEl = document.getElementById('wind-value');
const windchillEl = document.getElementById('windchill-value');
const yearEl = document.getElementById('current-year');
const lastModifiedEl = document.getElementById('last-modified');


if (tempEl) tempEl.textContent = temperature;
if (windEl) windEl.textContent = windSpeed;


if (temperature <= 10 && windSpeed > 4.8) {
  
    const wc = calculateWindChill(temperature, windSpeed);
    windchillEl.textContent = `${Math.round(wc * 10) / 10} °C`;
} else {
    windchillEl.textContent = "N/A";
}


if (yearEl) yearEl.textContent = new Date().getFullYear();
if (lastModifiedEl) lastModifiedEl.textContent = document.lastModified || "Unknown";