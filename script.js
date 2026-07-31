const cityInput =
  document.getElementById("city-input");

const searchButton =
  document.getElementById("search-button");

const searchResults =
  document.getElementById("search-results");

const locationButton =
  document.getElementById("location-button");

const cityElement =
  document.getElementById("city");

const countryElement =
  document.getElementById("country");

const latitudeElement =
  document.getElementById("latitude-value");

const longitudeElement =
  document.getElementById("longitude-value");

const timezoneElement =
  document.getElementById("timezone-value");

const temperatureElement =
  document.getElementById("temperature");

const temperatureUnitElement =
  document.getElementById("temperature-unit");

const apparentTemperatureElement =
  document.getElementById(
    "apparent-temperature"
  );

const apparentUnitElement =
  document.getElementById("apparent-unit");

const humidityElement =
  document.getElementById("humidity");

const precipitationElement =
  document.getElementById("precipitation");

const sunriseElement =
  document.getElementById("sunrise");

const sunsetElement =
  document.getElementById("sunset");

const statusElement =
  document.getElementById("status");

const windSpeedElement =
  document.getElementById("wind-speed");

const windDirectionElement =
  document.getElementById("wind-direction");

const weatherTimeElement =
  document.getElementById("weather-time");

const refreshButton =
  document.getElementById("refresh-button");

const favoriteButton =
  document.getElementById("favorite-button");

const weatherIconElement =
  document.getElementById("weather-icon");

const forecastContainer =
  document.getElementById(
    "forecast-container"
  );

const hourlyContainer =
  document.getElementById("hourly-container");

const favoritesContainer =
  document.getElementById(
    "favorites-container"
  );

const recentContainer =
  document.getElementById("recent-container");

const clearFavoritesButton =
  document.getElementById(
    "clear-favorites-button"
  );

const clearRecentButton =
  document.getElementById(
    "clear-recent-button"
  );

const unitButton =
  document.getElementById("unit-button");

const themeButton =
  document.getElementById("theme-button");

const centerMapButton =
  document.getElementById(
    "center-map-button"
  );

const scrollTopButton =
  document.getElementById(
    "scroll-top-button"
  );

/* Elemente V10 */

const aqiBadge =
  document.getElementById("aqi-badge");

const aqiValueElement =
  document.getElementById("aqi-value");

const airQualityIconElement =
  document.getElementById(
    "air-quality-icon"
  );

const airQualityLabelElement =
  document.getElementById(
    "air-quality-label"
  );

const airQualityMessageElement =
  document.getElementById(
    "air-quality-message"
  );

const pm25Element =
  document.getElementById("pm25-value");

const pm10Element =
  document.getElementById("pm10-value");

const no2Element =
  document.getElementById("no2-value");

const ozoneElement =
  document.getElementById("ozone-value");

const carbonMonoxideElement =
  document.getElementById(
    "carbon-monoxide-value"
  );

const uvIndexElement =
  document.getElementById("uv-index-value");

const uvLevelElement =
  document.getElementById("uv-level");

const airRecommendationElement =
  document.getElementById(
    "air-recommendation"
  );

const uvRecommendationElement =
  document.getElementById(
    "uv-recommendation"
  );


let currentLatitude = 44.4268;
let currentLongitude = 26.1025;

let currentCity = "București";
let currentCountry = "România";
let currentTimezone = "Europe/Bucharest";

let currentTemperatureCelsius = null;
let currentApparentTemperatureCelsius = null;

let currentDailyWeather = null;
let currentHourlyWeather = null;

let currentWeatherClass = "weather-clear";

let weatherMap = null;
let weatherMarker = null;

let temperatureUnit =
  localStorage.getItem(
    "temperatureUnit"
  ) || "C";

let darkMode =
  localStorage.getItem("darkMode") ===
  "true";

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


function saveStoredArray(
  storageKey,
  array
) {
  localStorage.setItem(
    storageKey,
    JSON.stringify(array)
  );
}


function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


/* Vreme */

function getWeatherDescription(
  weatherCode
) {
  const descriptions = {
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
    99: "Furtună puternică"
  };

  return (
    descriptions[weatherCode] ||
    "Condiții necunoscute"
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

  if (weatherCode >= 95) {
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


function updateWeatherVisual(
  weatherCode
) {
  const visual =
    getWeatherVisual(weatherCode);

  weatherIconElement.textContent =
    visual.icon;

  currentWeatherClass =
    visual.className;

  updateBodyClasses();
}


/* Temperatură și temă */

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


function updateCurrentTemperatures() {
  if (
    currentTemperatureCelsius !== null
  ) {
    temperatureElement.textContent =
      convertTemperature(
        currentTemperatureCelsius
      );
  }

  if (
    currentApparentTemperatureCelsius !==
    null
  ) {
    apparentTemperatureElement.textContent =
      convertTemperature(
        currentApparentTemperatureCelsius
      );
  }

  temperatureUnitElement.textContent =
    `°${temperatureUnit}`;

  apparentUnitElement.textContent =
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

  updateCurrentTemperatures();

  if (currentDailyWeather) {
    displayForecast(
      currentDailyWeather
    );
  }

  if (currentHourlyWeather) {
    displayHourlyForecast(
      currentHourlyWeather
    );
  }
}


function updateThemeButton() {
  themeButton.textContent =
    darkMode ? "☀️" : "🌙";
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


/* Formatarea datelor */

function formatTime(dateString) {
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


function getWindDirection(degrees) {
  const directions = [
    "N",
    "NE",
    "E",
    "SE",
    "S",
    "SV",
    "V",
    "NV"
  ];

  const normalized =
    ((degrees % 360) + 360) % 360;

  const index =
    Math.round(normalized / 45) % 8;

  return (
    `${directions[index]} ` +
    `(${Math.round(normalized)}°)`
  );
}


/* Starea aplicației */

function setLoadingState(isLoading) {
  searchButton.disabled = isLoading;
  refreshButton.disabled = isLoading;
  locationButton.disabled = isLoading;

  searchButton.textContent =
    isLoading
      ? "Se caută..."
      : "Caută";

  refreshButton.textContent =
    isLoading
      ? "Se încarcă..."
      : "Actualizează toate datele";
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


/* V10 – Calitatea aerului */

function getAirQualityInformation(aqi) {
  if (aqi <= 20) {
    return {
      label: "Aer bun",
      message:
        "Calitatea aerului este bună.",
      icon: "🌿",
      className: "aqi-good",
      recommendation:
        "Poți desfășura activități în aer liber în condiții normale."
    };
  }

  if (aqi <= 40) {
    return {
      label: "Aer acceptabil",
      message:
        "Calitatea aerului este în general acceptabilă.",
      icon: "🙂",
      className: "aqi-fair",
      recommendation:
        "Activitățile în aer liber sunt potrivite pentru majoritatea persoanelor."
    };
  }

  if (aqi <= 60) {
    return {
      label: "Aer moderat",
      message:
        "Persoanele sensibile pot resimți un disconfort.",
      icon: "😐",
      className: "aqi-moderate",
      recommendation:
        "Persoanele sensibile ar trebui să reducă efortul intens în aer liber."
    };
  }

  if (aqi <= 80) {
    return {
      label: "Aer slab",
      message:
        "Poluarea aerului este ridicată.",
      icon: "😷",
      className: "aqi-poor",
      recommendation:
        "Redu activitățile fizice intense și timpul petrecut în zone aglomerate."
    };
  }

  if (aqi <= 100) {
    return {
      label: "Aer foarte slab",
      message:
        "Calitatea aerului poate afecta sănătatea.",
      icon: "⚠️",
      className: "aqi-very-poor",
      recommendation:
        "Limitează timpul petrecut în exterior și evită exercițiile intense."
    };
  }

  return {
    label: "Aer extrem de slab",
    message:
      "Nivelul de poluare este foarte ridicat.",
    icon: "☣️",
    className: "aqi-extreme",
    recommendation:
      "Evită activitățile în aer liber și ține ferestrele închise când este posibil."
  };
}


function getUvInformation(uvIndex) {
  if (uvIndex < 3) {
    return {
      level: "Scăzut",
      recommendation:
        "Protecția solară obișnuită este suficientă."
    };
  }

  if (uvIndex < 6) {
    return {
      level: "Moderat",
      recommendation:
        "Folosește cremă cu protecție solară și ochelari de soare."
    };
  }

  if (uvIndex < 8) {
    return {
      level: "Ridicat",
      recommendation:
        "Folosește SPF ridicat și evită expunerea prelungită la prânz."
    };
  }

  if (uvIndex < 11) {
    return {
      level: "Foarte ridicat",
      recommendation:
        "Redu expunerea la soare, poartă pălărie și folosește SPF ridicat."
    };
  }

  return {
    level: "Extrem",
    recommendation:
      "Evită expunerea directă la soare în orele de vârf."
  };
}


function displayAirQuality(airData) {
  if (!airData.current) {
    throw new Error(
      "Datele despre aer sunt incomplete."
    );
  }

  const current = airData.current;

  const aqi =
    Math.round(current.european_aqi);

  const uvIndex =
    Number(current.uv_index).toFixed(1);

  const airInformation =
    getAirQualityInformation(aqi);

  const uvInformation =
    getUvInformation(
      Number(current.uv_index)
    );

  aqiValueElement.textContent = aqi;

  aqiBadge.className =
    `aqi-badge ${airInformation.className}`;

  airQualityIconElement.textContent =
    airInformation.icon;

  airQualityLabelElement.textContent =
    airInformation.label;

  airQualityMessageElement.textContent =
    airInformation.message;

  pm25Element.textContent =
    Number(current.pm2_5).toFixed(1);

  pm10Element.textContent =
    Number(current.pm10).toFixed(1);

  no2Element.textContent =
    Number(
      current.nitrogen_dioxide
    ).toFixed(1);

  ozoneElement.textContent =
    Number(current.ozone).toFixed(1);

  carbonMonoxideElement.textContent =
    Math.round(
      current.carbon_monoxide
    );

  uvIndexElement.textContent =
    uvIndex;

  uvLevelElement.textContent =
    uvInformation.level;

  airRecommendationElement.textContent =
    airInformation.recommendation;

  uvRecommendationElement.textContent =
    uvInformation.recommendation;
}


function resetAirQualityDisplay() {
  aqiValueElement.textContent = "--";

  aqiBadge.className =
    "aqi-badge aqi-unknown";

  airQualityIconElement.textContent =
    "🌿";

  airQualityLabelElement.textContent =
    "Date indisponibile";

  airQualityMessageElement.textContent =
    "Nu am putut încărca datele despre aer.";

  pm25Element.textContent = "--";
  pm10Element.textContent = "--";
  no2Element.textContent = "--";
  ozoneElement.textContent = "--";

  carbonMonoxideElement.textContent =
    "--";

  uvIndexElement.textContent = "--";

  uvLevelElement.textContent =
    "Nivel necunoscut";

  airRecommendationElement.textContent =
    "Date insuficiente pentru recomandare.";

  uvRecommendationElement.textContent =
    "Date insuficiente pentru recomandare.";
}


async function loadAirQuality(
  latitude,
  longitude
) {
  const airQualityUrl =
    `https://air-quality-api.open-meteo.com/v1/air-quality` +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=european_aqi,pm2_5,pm10,nitrogen_dioxide,ozone,carbon_monoxide,uv_index` +
    `&timezone=auto`;

  try {
    const response =
      await fetch(airQualityUrl);

    if (!response.ok) {
      throw new Error(
        `Eroare aer HTTP: ${response.status}`
      );
    }

    const data =
      await response.json();

    displayAirQuality(data);
  } catch (error) {
    console.error(
      "Eroare calitatea aerului:",
      error
    );

    resetAirQualityDisplay();
  }
}


/* Hartă */

function initializeMap() {
  weatherMap =
    L.map("weather-map").setView(
      [
        currentLatitude,
        currentLongitude
      ],
      8
    );

  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
      attribution:
        "&copy; OpenStreetMap contributors"
    }
  ).addTo(weatherMap);

  weatherMarker =
    L.marker([
      currentLatitude,
      currentLongitude
    ])
      .addTo(weatherMap)
      .bindPopup("București")
      .openPopup();

  weatherMap.on(
    "click",
    function (event) {
      loadAllData(
        event.latlng.lat,
        event.latlng.lng,
        "Punct selectat",
        "Hartă interactivă",
        false
      );
    }
  );

  setTimeout(
    function () {
      weatherMap.invalidateSize();
    },
    200
  );
}


function updateMap(
  latitude,
  longitude,
  cityName
) {
  if (!weatherMap || !weatherMarker) {
    return;
  }

  weatherMarker.setLatLng([
    latitude,
    longitude
  ]);

  weatherMarker
    .bindPopup(
      `<strong>${escapeHtml(cityName)}</strong><br>` +
      `${latitude.toFixed(4)}, ` +
      `${longitude.toFixed(4)}`
    )
    .openPopup();

  weatherMap.setView(
    [latitude, longitude],
    9,
    {
      animate: true
    }
  );
}


/* Prognoza pe șapte zile */

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

  card.innerHTML = `
    <p class="forecast-day">
      ${
        index === 0
          ? "Astăzi"
          : formatForecastDay(date)
      }
    </p>

    <p class="forecast-date">
      ${formatForecastDate(date)}
    </p>

    <div class="forecast-icon">
      ${visual.icon}
    </div>

    <p class="forecast-description">
      ${getWeatherDescription(weatherCode)}
    </p>

    <div class="forecast-temperatures">
      <span class="temperature-max">
        ${convertTemperature(maximumTemperature)}°
      </span>

      <span class="temperature-min">
        ${convertTemperature(minimumTemperature)}°
      </span>
    </div>
  `;

  return card;
}


function displayForecast(dailyWeather) {
  currentDailyWeather = dailyWeather;

  forecastContainer.innerHTML = "";

  for (
    let index = 0;
    index < dailyWeather.time.length;
    index++
  ) {
    forecastContainer.appendChild(
      createForecastCard(
        dailyWeather.time[index],
        dailyWeather.weather_code[index],
        dailyWeather
          .temperature_2m_max[index],
        dailyWeather
          .temperature_2m_min[index],
        index
      )
    );
  }
}


/* Prognoza orară */

function createHourlyCard(
  time,
  temperature,
  weatherCode,
  precipitationProbability,
  index
) {
  const visual =
    getWeatherVisual(weatherCode);

  const card =
    document.createElement("article");

  card.className = "hourly-card";

  if (index === 0) {
    card.classList.add(
      "current-hour"
    );
  }

  card.innerHTML = `
    <p class="hourly-time">
      ${
        index === 0
          ? "Acum"
          : formatTime(time)
      }
    </p>

    <div class="hourly-icon">
      ${visual.icon}
    </div>

    <p class="hourly-temperature">
      ${convertTemperature(temperature)}°
    </p>

    <p class="hourly-precipitation">
      💧 ${precipitationProbability ?? 0}%
    </p>
  `;

  return card;
}


function displayHourlyForecast(
  hourlyWeather
) {
  currentHourlyWeather =
    hourlyWeather;

  hourlyContainer.innerHTML = "";

  const currentTime = new Date();

  let startIndex =
    hourlyWeather.time.findIndex(
      function (time) {
        return (
          new Date(time).getTime() >=
          currentTime.getTime()
        );
      }
    );

  if (startIndex === -1) {
    startIndex = 0;
  }

  const endIndex =
    Math.min(
      startIndex + 24,
      hourlyWeather.time.length
    );

  for (
    let index = startIndex;
    index < endIndex;
    index++
  ) {
    hourlyContainer.appendChild(
      createHourlyCard(
        hourlyWeather.time[index],
        hourlyWeather
          .temperature_2m[index],
        hourlyWeather
          .weather_code[index],
        hourlyWeather
          .precipitation_probability[
            index
          ],
        index - startIndex
      )
    );
  }
}


/* Favorite și istoric */

function citiesAreEqual(
  firstCity,
  secondCity
) {
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
    longitude: currentLongitude,
    timezone: currentTimezone
  };
}


function isCurrentCityFavorite() {
  const current =
    getCurrentCityObject();

  return favoriteCities.some(
    function (favoriteCity) {
      return citiesAreEqual(
        favoriteCity,
        current
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
      loadAllData(
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
    container.innerHTML = `
      <p class="empty-message">
        ${emptyMessage}
      </p>
    `;

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


/* Căutarea localităților */

function hideSearchResults() {
  searchResults.classList.add(
    "hidden"
  );

  searchResults.innerHTML = "";
}


function displaySearchResults(results) {
  searchResults.innerHTML = "";

  if (!results?.length) {
    searchResults.innerHTML = `
      <p class="search-result-empty">
        Nu a fost găsită nicio localitate.
      </p>
    `;

    searchResults.classList.remove(
      "hidden"
    );

    return;
  }

  results.forEach(
    function (location) {
      const button =
        document.createElement("button");

      button.type = "button";

      button.className =
        "search-result-button";

      const adminArea =
        location.admin1
          ? `, ${location.admin1}`
          : "";

      button.innerHTML = `
        <span class="search-result-name">
          ${escapeHtml(location.name)}
        </span>

        <span class="search-result-details">
          ${escapeHtml(
            location.country ||
            "Țară necunoscută"
          )}${escapeHtml(adminArea)}

          · ${location.latitude.toFixed(3)},
          ${location.longitude.toFixed(3)}
        </span>
      `;

      button.addEventListener(
        "click",
        function () {
          hideSearchResults();

          cityInput.value = "";

          loadAllData(
            location.latitude,
            location.longitude,
            location.name,
            location.country ||
              "Țară necunoscută",
            true
          );
        }
      );

      searchResults.appendChild(button);
    }
  );

  searchResults.classList.remove(
    "hidden"
  );
}


async function searchCity() {
  const cityName =
    cityInput.value.trim();

  if (!cityName) {
    showError(
      "Introdu numele unui oraș."
    );

    cityInput.focus();

    return;
  }

  clearError();
  hideSearchResults();

  statusElement.textContent =
    "Caut localitățile...";

  setLoadingState(true);

  try {
    const geocodingUrl =
      `https://geocoding-api.open-meteo.com/v1/search` +
      `?name=${encodeURIComponent(cityName)}` +
      `&count=5` +
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

    displaySearchResults(
      data.results || []
    );

    statusElement.textContent =
      data.results?.length
        ? "Alege localitatea corectă."
        : "Localitatea nu a fost găsită.";
  } catch (error) {
    console.error(error);

    showError(
      "A apărut o eroare la căutare."
    );
  } finally {
    setLoadingState(false);
  }
}


/* Încărcarea datelor meteo */

async function loadWeather(
  latitude,
  longitude,
  cityName,
  countryName,
  saveToRecent
) {
  const weatherUrl =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m` +
    `&hourly=temperature_2m,weather_code,precipitation_probability` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset` +
    `&forecast_days=7` +
    `&timezone=auto`;

  const response =
    await fetch(weatherUrl);

  if (!response.ok) {
    throw new Error(
      `Eroare meteo HTTP: ${response.status}`
    );
  }

  const data =
    await response.json();

  if (
    !data.current ||
    !data.hourly ||
    !data.daily
  ) {
    throw new Error(
      "Date meteo incomplete."
    );
  }

  currentLatitude = latitude;
  currentLongitude = longitude;

  currentCity = cityName;
  currentCountry = countryName;

  currentTimezone =
    data.timezone || "Necunoscut";

  currentTemperatureCelsius =
    data.current.temperature_2m;

  currentApparentTemperatureCelsius =
    data.current.apparent_temperature;

  cityElement.textContent =
    currentCity;

  countryElement.textContent =
    currentCountry;

  latitudeElement.textContent =
    `${Number(latitude).toFixed(4)}°`;

  longitudeElement.textContent =
    `${Number(longitude).toFixed(4)}°`;

  timezoneElement.textContent =
    currentTimezone;

  updateCurrentTemperatures();

  humidityElement.textContent =
    Math.round(
      data.current.relative_humidity_2m
    );

  precipitationElement.textContent =
    Number(
      data.current.precipitation
    ).toFixed(1);

  windSpeedElement.textContent =
    Math.round(
      data.current.wind_speed_10m
    );

  windDirectionElement.textContent =
    getWindDirection(
      data.current.wind_direction_10m
    );

  weatherTimeElement.textContent =
    formatTime(data.current.time);

  sunriseElement.textContent =
    formatTime(data.daily.sunrise[0]);

  sunsetElement.textContent =
    formatTime(data.daily.sunset[0]);

  statusElement.textContent =
    getWeatherDescription(
      data.current.weather_code
    );

  updateWeatherVisual(
    data.current.weather_code
  );

  displayHourlyForecast(data.hourly);
  displayForecast(data.daily);

  updateMap(
    latitude,
    longitude,
    cityName
  );

  updateFavoriteButton();

  if (saveToRecent) {
    addRecentCity(
      getCurrentCityObject()
    );
  }
}


/* Încarcă vremea + calitatea aerului */

async function loadAllData(
  latitude,
  longitude,
  cityName,
  countryName,
  saveToRecent = false
) {
  clearError();
  hideSearchResults();

  statusElement.textContent =
    "Se încarcă toate datele...";

  hourlyContainer.innerHTML = `
    <p class="loading-message">
      Se încarcă prognoza orară...
    </p>
  `;

  forecastContainer.innerHTML = `
    <p class="loading-message">
      Se încarcă prognoza...
    </p>
  `;

  airQualityLabelElement.textContent =
    "Se încarcă...";

  airQualityMessageElement.textContent =
    "Se încarcă informațiile despre aer.";

  setLoadingState(true);

  try {
    await Promise.all([
      loadWeather(
        latitude,
        longitude,
        cityName,
        countryName,
        saveToRecent
      ),

      loadAirQuality(
        latitude,
        longitude
      )
    ]);
  } catch (error) {
    console.error(
      "Eroare la încărcare:",
      error
    );

    showError(
      "Nu am putut încărca toate datele."
    );
  } finally {
    setLoadingState(false);

    locationButton.textContent =
      "📍 Folosește locația mea";
  }
}


/* Geolocație */

function getLocationErrorMessage(error) {
  if (error.code === 1) {
    return (
      "Permisiunea pentru locație a fost refuzată."
    );
  }

  if (error.code === 2) {
    return (
      "Locația nu este disponibilă."
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

  statusElement.textContent =
    "Determin locația...";

  locationButton.disabled = true;

  locationButton.textContent =
    "📍 Se caută locația...";

  navigator.geolocation.getCurrentPosition(
    function (position) {
      loadAllData(
        position.coords.latitude,
        position.coords.longitude,
        "Locația mea",
        "Poziție curentă",
        false
      );
    },

    function (error) {
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


/* Evenimente */

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

    if (event.key === "Escape") {
      hideSearchResults();
    }
  }
);

document.addEventListener(
  "click",
  function (event) {
    if (
      !event.target.closest(
        ".search-section"
      )
    ) {
      hideSearchResults();
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
    loadAllData(
      currentLatitude,
      currentLongitude,
      currentCity,
      currentCountry,
      false
    );
  }
);

centerMapButton.addEventListener(
  "click",
  function () {
    weatherMap.setView(
      [
        currentLatitude,
        currentLongitude
      ],
      9,
      {
        animate: true
      }
    );

    weatherMarker.openPopup();
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

scrollTopButton.addEventListener(
  "click",
  function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
);

window.addEventListener(
  "scroll",
  function () {
    scrollTopButton.classList.toggle(
      "visible",
      window.scrollY > 400
    );
  }
);


/* Pornirea aplicației */

updateThemeButton();
updateBodyClasses();

renderFavorites();
renderRecentCities();

initializeMap();

loadAllData(
  currentLatitude,
  currentLongitude,
  currentCity,
  currentCountry,
  false
);