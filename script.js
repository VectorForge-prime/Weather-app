const temperatureElement =
  document.getElementById("temperature");

const statusElement =
  document.getElementById("status");

const windSpeedElement =
  document.getElementById("wind-speed");

const weatherTimeElement =
  document.getElementById("weather-time");

const refreshButton =
  document.getElementById("refresh-button");


const latitude = 44.43;
const longitude = 26.10;


function getWeatherDescription(weatherCode) {
  const weatherDescriptions = {
    0: "Cer senin",
    1: "În mare parte senin",
    2: "Parțial noros",
    3: "Înnorat",

    45: "Ceață",
    48: "Ceață cu chiciură",

    51: "Burniță slabă",
    53: "Burniță moderată",
    55: "Burniță puternică",

    61: "Ploaie slabă",
    63: "Ploaie moderată",
    65: "Ploaie puternică",

    71: "Ninsoare slabă",
    73: "Ninsoare moderată",
    75: "Ninsoare puternică",

    80: "Averse slabe",
    81: "Averse moderate",
    82: "Averse puternice",

    95: "Furtună",
    96: "Furtună cu grindină",
    99: "Furtună puternică cu grindină"
  };

  return weatherDescriptions[weatherCode]
    || "Condiții meteo necunoscute";
}


function formatWeatherTime(dateString) {
  const date = new Date(dateString);

  return date.toLocaleTimeString("ro-RO", {
    hour: "2-digit",
    minute: "2-digit"
  });
}


async function loadWeather() {
  const apiUrl =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,weather_code,wind_speed_10m` +
    `&timezone=auto`;

  statusElement.textContent =
    "Se încarcă datele meteo...";

  refreshButton.disabled = true;
  refreshButton.textContent = "Se încarcă...";

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(
        `Eroare HTTP: ${response.status}`
      );
    }

    const data = await response.json();

    console.log(data);

    const currentWeather = data.current;

    temperatureElement.textContent =
      Math.round(currentWeather.temperature_2m);

    windSpeedElement.textContent =
      Math.round(currentWeather.wind_speed_10m);

    weatherTimeElement.textContent =
      formatWeatherTime(currentWeather.time);

    statusElement.textContent =
      getWeatherDescription(
        currentWeather.weather_code
      );
  } catch (error) {
    console.error("Eroare:", error);

    temperatureElement.textContent = "--";
    windSpeedElement.textContent = "--";
    weatherTimeElement.textContent = "--";

    statusElement.textContent =
      "Nu am putut încărca vremea. Încearcă din nou.";
  } finally {
    refreshButton.disabled = false;
    refreshButton.textContent =
      "Actualizează vremea";
  }
}


refreshButton.addEventListener(
  "click",
  loadWeather
);


loadWeather();