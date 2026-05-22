document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;

    const temp = parseFloat(document.getElementById("temp").textContent);
    const windSpeed = parseFloat(document.getElementById("wind").textContent);
    const chillElement = document.getElementById("chill");

    const calculateWindChill = (t, v) => (13.12 + (0.6215 * t) - (11.37 * Math.pow(v, 0.16)) + (0.3965 * t * Math.pow(v, 0.16))).toFixed(1);

    if (temp <= 10 && windSpeed > 4.8) {
        chillElement.textContent = `${calculateWindChill(temp, windSpeed)} °C`;
    } else {
        chillElement.textContent = "N/A";
    }
});