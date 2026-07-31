const cityInput =
  document.getElementById("city-input");

const searchButton =
  document.getElementById("search-button");

const cityElement =
  document.getElementById("city");

const countryElement =
  document.getElementById("country");

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


let currentLatitude = 44.43;
let currentLongitude = 26.10;

let currentCity = "București";
let currentCountry = "România";


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

    56: "Burniță înghețată slabă",
    57: "Burniță înghețată puternică",

    61: "Ploaie slabă",
    63: "Ploaie moderată",
    65: "Ploaie puternică",

    66: "Ploaie înghețată slabă",
    67: "Ploaie înghețată puternică",

    71: "Ninsoare slabă",
    73: "Ninsoare moderată",
    75: "Ninsoare puternică",

    77: "Granule de zăpadă",

    80: "Averse slabe",
    81: "Averse moderate",
    82: "Averse puternice",

    85: "Averse de ninsoare slabe",
    86: "Averse de ninsoare puternice",

    95: "Furtună",

    96: "Furtună cu grindină",
    99: "Furtună puternică cu grindină"
  };

  return (
    weatherDescriptions[weatherCode] ||
    "Condiții meteo necunoscute"
  );
}


function formatWeatherTime(dateString) {
  const date = new Date(dateString);

  return date.toLocaleTimeString(
    "ro-RO",
    {
      hour: "2-digit",
      minute: "2-digit"
    }
  );
}


function setLoadingState(isLoading) {
  searchButton.disabled = isLoading;
  refreshButton.disabled = isLoading;

  searchButton.textContent =
    isLoading ? "Se caută..." : "Caută";

  refreshButton.textContent =
    isLoading
      ? "Se încarcă..."
      : "Actualizează vremea";
}


function showError(message) {
  statusElement.textContent = message;

  statusElement.classList.add(
    "error-message"
  );
}


function clearError() {
  statusElement.classList.remove(
    "error-message"
  );
}


async function loadWeather(
  latitude,
  longitude,
  cityName,
  countryName
) {
  const apiUrl =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,weather_code,wind_speed_10m` +
    `&timezone=auto`;

  clearError();

  statusElement.textContent =
    "Se încarcă datele meteo...";

  setLoadingState(true);

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(
        `Eroare HTTP: ${response.status}`
      );
    }

    const data = await response.json();

    const currentWeather = data.current;

    currentLatitude = latitude;
    currentLongitude = longitude;

    currentCity = cityName;
    currentCountry = countryName;

    cityElement.textContent = cityName;

    countryElement.textContent =
      countryName;

    temperatureElement.textContent =
      Math.round(
        currentWeather.temperature_2m
      );

    windSpeedElement.textContent =
      Math.round(
        currentWeather.wind_speed_10m
      );

    weatherTimeElement.textContent =
      formatWeatherTime(
        currentWeather.time
      );

    statusElement.textContent =
      getWeatherDescription(
        currentWeather.weather_code
      );
  } catch (error) {
    console.error(
      "Eroare la încărcarea vremii:",
      error
    );

    showError(
      "Nu am putut încărca vremea."
    );
  } finally {
    setLoadingState(false);
  }
}


async function searchCity() {
  const cityName =
    cityInput.value.trim();

  if (cityName === "") {
    showError(
      "Introdu numele unui oraș."
    );

    cityInput.focus();

    return;
  }

  clearError();

  statusElement.textContent =
    "Caut orașul...";

  setLoadingState(true);

  try {
    const geocodingUrl =
      `https://geocoding-api.open-meteo.com/v1/search` +
      `?name=${encodeURIComponent(cityName)}` +
      `&count=1` +
      `&language=ro` +
      `&format=json`;

    const response =
      await fetch(geocodingUrl);

    if (!response.ok) {
      throw new Error(
        `Eroare HTTP: ${response.status}`
      );
    }

    const data = await response.json();

    if (
      !data.results ||
      data.results.length === 0
    ) {
      showError(
        "Orașul nu a fost găsit."
      );

      return;
    }

    const cityData = data.results[0];

    const latitude =
      cityData.latitude;

    const longitude =
      cityData.longitude;

    const foundCity =
      cityData.name;

    const foundCountry =
      cityData.country || "Țară necunoscută";

    await loadWeather(
      latitude,
      longitude,
      foundCity,
      foundCountry
    );

    cityInput.value = "";
  } catch (error) {
    console.error(
      "Eroare la căutarea orașului:",
      error
    );

    showError(
      "A apărut o eroare la căutare."
    );
  } finally {
    setLoadingState(false);
  }
}


searchButton.addEventListener(
  "click",
  searchCity
);


cityInput.addEventListener(
  "keydown",
  function (event) {
    if (event.key === "Enter") {
      searchCity();
    }
  }
);


refreshButton.addEventListener(
  "click",
  function () {
    loadWeather(
      currentLatitude,
      currentLongitude,
      currentCity,
      currentCountry
    );
  }
);


loadWeather(
  currentLatitude,
  currentLongitude,
  currentCity,
  currentCountry
);