// ---------- Footer: current year and last modified date ----------
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#last-modified').textContent = document.lastModified;

// ---------- Weather: static inputs (metric, since Peru uses °C / km/h) ----------
const currentTemp = 8;       // °C
const currentWindSpeed = 15; // km/h

document.querySelector('#temp').textContent = currentTemp;
document.querySelector('#wind-speed').textContent = currentWindSpeed;

// Wind chill formula (metric), one-line calculation as required
function calculateWindChill(tempC, windKmh) {
  return 13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKmh, 0.16) + 0.3965 * tempC * Math.pow(windKmh, 0.16);
}

// Only calculate wind chill when conditions make it a valid measurement
const windChillDisplay = document.querySelector('#wind-chill');

if (currentTemp <= 10 && currentWindSpeed > 4.8) {
  const windChill = calculateWindChill(currentTemp, currentWindSpeed);
  windChillDisplay.textContent = `${windChill.toFixed(1)} \u00B0C`;
} else {
  windChillDisplay.textContent = 'N/A';
}