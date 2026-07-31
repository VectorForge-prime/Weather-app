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

const temperatureUnitElement =
  document.getElementById("temperature-unit");

const statusElement =
  document.getElementById("status");

const windSpeedElement =
  document.getElementById("wind-speed");

const weatherTimeElement =
  document.getElementById("weather-time");

const refreshButton =
  document.getElementById("refresh-button");

const favoriteButton =
  document.getElementById("favorite-button");

const weatherIconElement =
  document.getElementById("weather-icon");

const forecastContainer =
  document.getElementById("forecast-container");

const favoritesContainer =
  document.getElementById("favorites-container");

const recentContainer =
  document.getElementById("recent-container");

const clearFavoritesButton =
  document.getElementById("clear-favorites-button");

const clearRecentButton =
  document.getElementById("clear-recent-button");

const unitButton =
  document.getElementById("unit-button");

const themeButton =
  document.getElementById("theme-button");


let currentLatitude = 44.43;
let currentLongitude = 26.10;

let currentCity = "București";
let currentCountry = "România";

let currentTemperatureCelsius = null;
let currentDailyWeather = null;
let currentWeatherClass = "weather-clear";

let temperatureUnit =
  localStorage.getItem("temperatureUnit") || "C";

let darkMode =
  localStorage.getItem("darkMode") === "true";

let favoriteCities =
  getStoredArray("favoriteCities");

let recentCities =
  getStoredArray("recentCities");


function getStoredArray(storageKey) {
  try {
    const storedValue =
      localStorage.getItem(storageKey);

    return storedValue
      ? JSON.parse(storedValue)
      : [];
  } catch (error) {
    console.error(
      `Eroare la citirea ${storageKey}:`,
      error
    );

    return [];
  }
}


function saveStoredArray(storageKey, array) {
  localStorage.setItem(
    storageKey,
    JSON.stringify(array)
  );
}


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


function updateBodyClasses() {
  document.body.className =
    currentWeatherClass;

  if (darkMode) {
    document.body.classList.add(
      "dark-mode"
    );
  }
}


function updateWeatherVisual(weatherCode) {
  const visual =
    getWeatherVisual(weatherCode);

  weatherIconElement.textContent =
    visual.icon;

  currentWeatherClass =
    visual.className;

  updateBodyClasses();
}


function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}


function convertTemperature(celsius) {
  if (temperatureUnit === "F") {
    return Math.round(
      celsiusToFahrenheit(celsius)
    );
  }

  return Math.round(celsius);
}


function updateCurrentTemperature() {
  if (currentTemperatureCelsius === null) {
    return;
  }

  temperatureElement.textContent =
    convertTemperature(
      currentTemperatureCelsius
    );

  temperatureUnitElement.textContent =
    `°${temperatureUnit}`;

  unitButton.textContent =
    temperatureUnit === "C"
      ? "°F"
      : "°C";
}


function toggleTemperatureUnit() {
  temperatureUnit =
    temperatureUnit === "C"
      ? "F"
      : "C";

  localStorage.setItem(
    "temperatureUnit",
    temperatureUnit
  );

  updateCurrentTemperature();

  if (currentDailyWeather) {
    displayForecast(
      currentDailyWeather
    );
  }
}


function updateThemeButton() {
  themeButton.textContent =
    darkMode ? "☀️" : "🌙";

  themeButton.title =
    darkMode
      ? "Activează modul luminos"
      : "Activează modul întunecat";
}


function toggleTheme() {
  darkMode = !darkMode;

  localStorage.setItem(
    "darkMode",
    darkMode
  );

  updateBodyClasses();
  updateThemeButton();
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
    `${convertTemperature(
      maximumTemperature
    )}°`;


  const minimumElement =
    document.createElement("span");

  minimumElement.className =
    "temperature-min";

  minimumElement.textContent =
    `${convertTemperature(
      minimumTemperature
    )}°`;


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
  currentDailyWeather =
    dailyWeather;

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


function citiesAreEqual(firstCity, secondCity) {
  return (
    Math.abs(
      firstCity.latitude -
      secondCity.latitude
    ) < 0.001 &&
    Math.abs(
      firstCity.longitude -
      secondCity.longitude
    ) < 0.001
  );
}


function getCurrentCityObject() {
  return {
    name: currentCity,
    country: currentCountry,
    latitude: currentLatitude,
    longitude: currentLongitude
  };
}


function isCurrentCityFavorite() {
  const currentCityObject =
    getCurrentCityObject();

  return favoriteCities.some(
    function (favoriteCity) {
      return citiesAreEqual(
        favoriteCity,
        currentCityObject
      );
    }
  );
}


function updateFavoriteButton() {
  const isFavorite =
    isCurrentCityFavorite();

  favoriteButton.textContent =
    isFavorite ? "★" : "☆";

  favoriteButton.classList.toggle(
    "active",
    isFavorite
  );

  favoriteButton.title =
    isFavorite
      ? "Elimină din favorite"
      : "Adaugă la favorite";
}


function toggleFavoriteCity() {
  const city =
    getCurrentCityObject();

  const existingIndex =
    favoriteCities.findIndex(
      function (favoriteCity) {
        return citiesAreEqual(
          favoriteCity,
          city
        );
      }
    );

  if (existingIndex >= 0) {
    favoriteCities.splice(
      existingIndex,
      1
    );
  } else {
    favoriteCities.unshift(city);
  }

  saveStoredArray(
    "favoriteCities",
    favoriteCities
  );

  renderFavorites();
  updateFavoriteButton();
}


function addRecentCity(city) {
  recentCities =
    recentCities.filter(
      function (recentCity) {
        return !citiesAreEqual(
          recentCity,
          city
        );
      }
    );

  recentCities.unshift(city);

  recentCities =
    recentCities.slice(0, 6);

  saveStoredArray(
    "recentCities",
    recentCities
  );

  renderRecentCities();
}


function createSavedCityButton(city) {
  const button =
    document.createElement("button");

  button.type = "button";

  button.className =
    "saved-city-button";

  button.textContent =
    `${city.name}, ${city.country}`;

  button.addEventListener(
    "click",
    function () {
      loadWeather(
        city.latitude,
        city.longitude,
        city.name,
        city.country,
        false
      );
    }
  );

  return button;
}


function renderCityList(
  container,
  cities,
  emptyMessage
) {
  container.innerHTML = "";

  if (cities.length === 0) {
    const message =
      document.createElement("p");

    message.className =
      "empty-message";

    message.textContent =
      emptyMessage;

    container.appendChild(message);

    return;
  }

  cities.forEach(
    function (city) {
      container.appendChild(
        createSavedCityButton(city)
      );
    }
  );
}


function renderFavorites() {
  renderCityList(
    favoritesContainer,
    favoriteCities,
    "Nu ai orașe favorite."
  );
}


function renderRecentCities() {
  renderCityList(
    recentContainer,
    recentCities,
    "Nu există căutări recente."
  );
}


function clearFavorites() {
  favoriteCities = [];

  saveStoredArray(
    "favoriteCities",
    favoriteCities
  );

  renderFavorites();
  updateFavoriteButton();
}


function clearRecentCities() {
  recentCities = [];

  saveStoredArray(
    "recentCities",
    recentCities
  );

  renderRecentCities();
}


async function loadWeather(
  latitude,
  longitude,
  cityName,
  countryName,
  saveToRecent = false
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

    currentTemperatureCelsius =
      currentWeather.temperature_2m;

    cityElement.textContent =
      cityName;

    countryElement.textContent =
      countryName;

    updateCurrentTemperature();

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

    updateFavoriteButton();

    if (saveToRecent) {
      addRecentCity(
        getCurrentCityObject()
      );
    }
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
        "Țară necunoscută",
      true
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
      loadWeather(
        position.coords.latitude,
        position.coords.longitude,
        "Locația mea",
        "Poziție curentă",
        false
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
      currentCountry,
      false
    );
  }
);


favoriteButton.addEventListener(
  "click",
  toggleFavoriteCity
);


unitButton.addEventListener(
  "click",
  toggleTemperatureUnit
);


themeButton.addEventListener(
  "click",
  toggleTheme
);


clearFavoritesButton.addEventListener(
  "click",
  clearFavorites
);


clearRecentButton.addEventListener(
  "click",
  clearRecentCities
);


updateThemeButton();
updateBodyClasses();
updateCurrentTemperature();

renderFavorites();
renderRecentCities();


loadWeather(
  currentLatitude,
  currentLongitude,
  currentCity,
  currentCountry,
  false
);