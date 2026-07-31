const cityInput =
  document.getElementById("city-input");

const searchButton =
  document.getElementById("search-button");

const locationButton =
  document.getElementById("location-button");

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

const weatherIconElement =
  document.getElementById("weather-icon");

const forecastContainer =
  document.getElementById("forecast-container");


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


function getWeatherVisual(weatherCode) {
  if (weatherCode === 0) {
    return {
      icon: "☀️",
      className: "weather-clear"
    };
  }

  if (
    weatherCode >= 1 &&
    weatherCode <= 3
  ) {
    return {
      icon: "☁️",
      className: "weather-cloudy"
    };
  }

  if (
    weatherCode === 45 ||
    weatherCode === 48
  ) {
    return {
      icon: "🌫️",
      className: "weather-fog"
    };
  }

  if (
    weatherCode >= 51 &&
    weatherCode <= 67
  ) {
    return {
      icon: "🌧️",
      className: "weather-rain"
    };
  }

  if (
    weatherCode >= 71 &&
    weatherCode <= 86
  ) {
    return {
      icon: "❄️",
      className: "weather-snow"
    };
  }

  if (
    weatherCode >= 95 &&
    weatherCode <= 99
  ) {
    return {
      icon: "⛈️",
      className: "weather-storm"
    };
  }

  return {
    icon: "🌤️",
    className: "weather-clear"
  };
}


function updateWeatherVisual(weatherCode) {
  const visual =
    getWeatherVisual(weatherCode);

  weatherIconElement.textContent =
    visual.icon;

  document.body.className =
    visual.className;
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


function formatForecastDay(dateString) {
  const date =
    new Date(`${dateString}T12:00:00`);

  return date.toLocaleDateString(
    "ro-RO",
    {
      weekday: "short"
    }
  );
}


function formatForecastDate(dateString) {
  const date =
    new Date(`${dateString}T12:00:00`);

  return date.toLocaleDateString(
    "ro-RO",
    {
      day: "2-digit",
      month: "2-digit"
    }
  );
}


function setLoadingState(isLoading) {
  searchButton.disabled = isLoading;
  refreshButton.disabled = isLoading;
  locationButton.disabled = isLoading;

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


function createForecastCard(
  date,
  weatherCode,
  maximumTemperature,
  minimumTemperature,
  index
) {
  const visual =
    getWeatherVisual(weatherCode);

  const card =
    document.createElement("article");

  card.className = "forecast-card";

  if (index === 0) {
    card.classList.add("today");
  }

  const dayElement =
    document.createElement("p");

  dayElement.className = "forecast-day";

  dayElement.textContent =
    index === 0
      ? "Astăzi"
      : formatForecastDay(date);


  const dateElement =
    document.createElement("p");

  dateElement.className =
    "forecast-date";

  dateElement.textContent =
    formatForecastDate(date);


  const iconElement =
    document.createElement("div");

  iconElement.className =
    "forecast-icon";

  iconElement.textContent =
    visual.icon;


  const descriptionElement =
    document.createElement("p");

  descriptionElement.className =
    "forecast-description";

  descriptionElement.textContent =
    getWeatherDescription(weatherCode);


  const temperaturesElement =
    document.createElement("div");

  temperaturesElement.className =
    "forecast-temperatures";


  const maximumElement =
    document.createElement("span");

  maximumElement.className =
    "temperature-max";

  maximumElement.textContent =
    `${Math.round(maximumTemperature)}°`;


  const minimumElement =
    document.createElement("span");

  minimumElement.className =
    "temperature-min";

  minimumElement.textContent =
    `${Math.round(minimumTemperature)}°`;


  temperaturesElement.append(
    maximumElement,
    minimumElement
  );

  card.append(
    dayElement,
    dateElement,
    iconElement,
    descriptionElement,
    temperaturesElement
  );

  return card;
}


function displayForecast(dailyWeather) {
  forecastContainer.innerHTML = "";

  const dates =
    dailyWeather.time;

  const weatherCodes =
    dailyWeather.weather_code;

  const maximumTemperatures =
    dailyWeather.temperature_2m_max;

  const minimumTemperatures =
    dailyWeather.temperature_2m_min;

  for (
    let index = 0;
    index < dates.length;
    index++
  ) {
    const forecastCard =
      createForecastCard(
        dates[index],
        weatherCodes[index],
        maximumTemperatures[index],
        minimumTemperatures[index],
        index
      );

    forecastContainer.appendChild(
      forecastCard
    );
  }
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
    `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
    `&forecast_days=7` +
    `&timezone=auto`;

  clearError();

  statusElement.textContent =
    "Se încarcă datele meteo...";

  forecastContainer.innerHTML =
    `<p class="forecast-loading">
      Se încarcă prognoza...
    </p>`;

  setLoadingState(true);

  try {
    const response =
      await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(
        `Eroare HTTP: ${response.status}`
      );
    }

    const data =
      await response.json();

    if (!data.current || !data.daily) {
      throw new Error(
        "Răspunsul API este incomplet."
      );
    }

    const currentWeather =
      data.current;

    currentLatitude = latitude;
    currentLongitude = longitude;

    currentCity = cityName;
    currentCountry = countryName;

    cityElement.textContent =
      cityName;

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

    updateWeatherVisual(
      currentWeather.weather_code
    );

    displayForecast(data.daily);
  } catch (error) {
    console.error(
      "Eroare la încărcarea vremii:",
      error
    );

    showError(
      "Nu am putut încărca vremea."
    );

    forecastContainer.innerHTML =
      `<p class="forecast-loading">
        Prognoza nu a putut fi încărcată.
      </p>`;
  } finally {
    setLoadingState(false);

    locationButton.textContent =
      "📍 Folosește locația mea";
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

    const data =
      await response.json();

    if (
      !data.results ||
      data.results.length === 0
    ) {
      showError(
        "Orașul nu a fost găsit."
      );

      return;
    }

    const cityData =
      data.results[0];

    await loadWeather(
      cityData.latitude,
      cityData.longitude,
      cityData.name,
      cityData.country ||
        "Țară necunoscută"
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


function getLocationErrorMessage(error) {
  if (error.code === 1) {
    return (
      "Permisiunea pentru locație a fost refuzată."
    );
  }

  if (error.code === 2) {
    return (
      "Locația dispozitivului nu este disponibilă."
    );
  }

  if (error.code === 3) {
    return (
      "Localizarea a durat prea mult."
    );
  }

  return (
    "Nu am putut determina locația."
  );
}


function useCurrentLocation() {
  if (!navigator.geolocation) {
    showError(
      "Browserul nu acceptă geolocația."
    );

    return;
  }

  clearError();

  statusElement.textContent =
    "Determin locația dispozitivului...";

  locationButton.disabled = true;
  locationButton.textContent =
    "📍 Se caută locația...";

  navigator.geolocation.getCurrentPosition(
    function (position) {
      const latitude =
        position.coords.latitude;

      const longitude =
        position.coords.longitude;

      loadWeather(
        latitude,
        longitude,
        "Locația mea",
        "Poziție curentă"
      );
    },

    function (error) {
      console.error(
        "Eroare de geolocație:",
        error
      );

      showError(
        getLocationErrorMessage(error)
      );

      locationButton.disabled = false;

      locationButton.textContent =
        "📍 Folosește locația mea";
    },

    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000
    }
  );
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


locationButton.addEventListener(
  "click",
  useCurrentLocation
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