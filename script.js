const $ = (id) =>
  document.getElementById(id);


/* =========================
   ELEMENTE DOM
========================= */

const cityInput =
  $("city-input");

const searchButton =
  $("search-button");

const searchResults =
  $("search-results");

const locationButton =
  $("location-button");

const weatherCard =
  $("weather-card");

const weatherContent =
  $("weather-content");

const weatherSkeleton =
  $("weather-skeleton");

const weatherEffects =
  $("weather-effects");

const toastContainer =
  $("toast-container");


const cityElement =
  $("city");

const countryElement =
  $("country");

const latitudeElement =
  $("latitude-value");

const longitudeElement =
  $("longitude-value");

const timezoneElement =
  $("timezone-value");


const temperatureElement =
  $("temperature");

const temperatureUnitElement =
  $("temperature-unit");

const apparentTemperatureElement =
  $("apparent-temperature");

const apparentUnitElement =
  $("apparent-unit");

const humidityElement =
  $("humidity");

const precipitationElement =
  $("precipitation");

const sunriseElement =
  $("sunrise");

const sunsetElement =
  $("sunset");

const statusElement =
  $("status");

const windSpeedElement =
  $("wind-speed");

const windDirectionElement =
  $("wind-direction");

const windArrow =
  $("wind-arrow");

const weatherTimeElement =
  $("weather-time");

const refreshButton =
  $("refresh-button");

const refreshIcon =
  $("refresh-icon");

const favoriteButton =
  $("favorite-button");

const weatherIconElement =
  $("weather-icon");


const hourlyContainer =
  $("hourly-container");

const forecastContainer =
  $("forecast-container");

const hourlySkeleton =
  $("hourly-skeleton");

const dailySkeleton =
  $("daily-skeleton");


const favoritesContainer =
  $("favorites-container");

const recentContainer =
  $("recent-container");

const clearFavoritesButton =
  $("clear-favorites-button");

const clearRecentButton =
  $("clear-recent-button");


const unitButton =
  $("unit-button");

const themeButton =
  $("theme-button");

const centerMapButton =
  $("center-map-button");

const scrollTopButton =
  $("scroll-top-button");


const aqiBadge =
  $("aqi-badge");

const aqiValueElement =
  $("aqi-value");

const airQualityIconElement =
  $("air-quality-icon");

const airQualityLabelElement =
  $("air-quality-label");

const airQualityMessageElement =
  $("air-quality-message");

const pm25Element =
  $("pm25-value");

const pm10Element =
  $("pm10-value");

const no2Element =
  $("no2-value");

const ozoneElement =
  $("ozone-value");

const carbonMonoxideElement =
  $("carbon-monoxide-value");

const uvIndexElement =
  $("uv-index-value");

const uvLevelElement =
  $("uv-level");

const airRecommendationElement =
  $("air-recommendation");

const uvRecommendationElement =
  $("uv-recommendation");


const totalSearchesStat =
  $("total-searches-stat");

const uniqueCitiesStat =
  $("unique-cities-stat");

const lastSearchStat =
  $("last-search-stat");

const maximumTemperatureStat =
  $("maximum-temperature-stat");

const maximumTemperatureUnit =
  $("maximum-temperature-unit");

const maximumCityStat =
  $("maximum-city-stat");

const minimumTemperatureStat =
  $("minimum-temperature-stat");

const minimumTemperatureUnit =
  $("minimum-temperature-unit");

const minimumCityStat =
  $("minimum-city-stat");

const resetStatisticsButton =
  $("reset-statistics-button");


const weatherChartCanvas =
  $("weather-chart");

const chartSkeleton =
  $("chart-skeleton");

const chartTabs =
  document.querySelectorAll(
    ".chart-tab"
  );

const averageTemperatureElement =
  $("average-temperature");

const maximumRainChanceElement =
  $("maximum-rain-chance");

const averageHumidityElement =
  $("average-humidity");

const maximumWindElement =
  $("maximum-wind");


const installButton =
  $("install-button");

const secondaryInstallButton =
  $("secondary-install-button");

const connectionStatus =
  $("connection-status");

const connectionText =
  $("connection-text");

const updateNotification =
  $("update-notification");

const updateButton =
  $("update-button");


/* =========================
   VARIABILE GLOBALE
========================= */

let currentLatitude =
  44.4268;

let currentLongitude =
  26.1025;

let currentCity =
  "București";

let currentCountry =
  "România";

let currentTimezone =
  "Europe/Bucharest";


let currentTemperatureCelsius =
  null;

let currentApparentTemperatureCelsius =
  null;

let currentDailyWeather =
  null;

let currentHourlyWeather =
  null;

let currentWeatherClass =
  "weather-clear";

let currentWeatherCode =
  0;


let map =
  null;

let marker =
  null;

let weatherChart =
  null;

let activeChartType =
  "temperature";

let deferredInstallPrompt =
  null;

let waitingWorker =
  null;

let refreshing =
  false;


let temperatureUnit =
  localStorage.getItem(
    "temperatureUnit"
  ) || "C";

let darkMode =
  localStorage.getItem(
    "darkMode"
  ) === "true";

let favoriteCities =
  readStoredArray(
    "favoriteCities"
  );

let recentCities =
  readStoredArray(
    "recentCities"
  );

let weatherStatistics =
  readStatistics();


/* =========================
   STORAGE
========================= */

function readStoredArray(key) {
  try {
    const storedValue =
      localStorage.getItem(key);

    return storedValue
      ? JSON.parse(storedValue)
      : [];
  } catch (error) {
    console.error(
      `Eroare la citirea ${key}:`,
      error
    );

    return [];
  }
}


function saveStoredArray(
  key,
  value
) {
  localStorage.setItem(
    key,
    JSON.stringify(value)
  );
}


function getDefaultStatistics() {
  return {
    totalSearches:
      0,

    uniqueCities:
      [],

    lastSearch:
      null,

    maximumTemperature:
      null,

    maximumCity:
      null,

    minimumTemperature:
      null,

    minimumCity:
      null
  };
}


function readStatistics() {
  try {
    const storedStatistics =
      localStorage.getItem(
        "weatherStatistics"
      );

    return storedStatistics
      ? {
          ...getDefaultStatistics(),
          ...JSON.parse(
            storedStatistics
          )
        }
      : getDefaultStatistics();
  } catch (error) {
    console.error(
      "Eroare la citirea statisticilor:",
      error
    );

    return getDefaultStatistics();
  }
}


function saveStatistics() {
  localStorage.setItem(
    "weatherStatistics",
    JSON.stringify(
      weatherStatistics
    )
  );
}


/* =========================
   FUNCȚII GENERALE
========================= */

function escapeHtml(value) {
  return String(value)
    .replaceAll(
      "&",
      "&amp;"
    )
    .replaceAll(
      "<",
      "&lt;"
    )
    .replaceAll(
      ">",
      "&gt;"
    )
    .replaceAll(
      '"',
      "&quot;"
    )
    .replaceAll(
      "'",
      "&#039;"
    );
}


function roundNumber(
  value,
  decimals = 0
) {
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(
      Number(value)
    )
  ) {
    return "--";
  }

  return Number(value).toFixed(
    decimals
  );
}


function calculateAverage(values) {
  const validValues =
    values.filter(
      function (value) {
        return Number.isFinite(
          Number(value)
        );
      }
    );

  if (!validValues.length) {
    return 0;
  }

  const sum =
    validValues.reduce(
      function (
        accumulator,
        value
      ) {
        return (
          accumulator +
          Number(value)
        );
      },
      0
    );

  return (
    sum /
    validValues.length
  );
}


/* =========================
   TOAST-URI
========================= */

function showToast(
  type,
  title,
  message,
  duration = 4200
) {
  const icons = {
    success:
      "✅",

    error:
      "❌",

    warning:
      "⚠️",

    info:
      "ℹ️"
  };

  const toast =
    document.createElement(
      "article"
    );

  toast.className =
    `toast toast-${type}`;

  toast.innerHTML = `
    <span class="toast-icon">
      ${icons[type] || icons.info}
    </span>

    <div class="toast-content">
      <strong class="toast-title">
        ${escapeHtml(title)}
      </strong>

      <p class="toast-message">
        ${escapeHtml(message)}
      </p>
    </div>

    <button
      class="toast-close"
      type="button"
      aria-label="Închide notificarea"
    >
      ×
    </button>
  `;

  toastContainer.appendChild(
    toast
  );

  const removeToast =
    function () {
      toast.classList.add(
        "toast-leaving"
      );

      window.setTimeout(
        function () {
          toast.remove();
        },
        300
      );
    };

  toast
    .querySelector(
      ".toast-close"
    )
    .addEventListener(
      "click",
      removeToast
    );

  window.setTimeout(
    removeToast,
    duration
  );
}


/* =========================
   VREME
========================= */

function getWeatherDescription(code) {
  const descriptions = {
    0:
      "Cer senin",

    1:
      "În mare parte senin",

    2:
      "Parțial noros",

    3:
      "Înnorat",

    45:
      "Ceață",

    48:
      "Ceață cu chiciură",

    51:
      "Burniță slabă",

    53:
      "Burniță moderată",

    55:
      "Burniță puternică",

    56:
      "Burniță înghețată slabă",

    57:
      "Burniță înghețată puternică",

    61:
      "Ploaie slabă",

    63:
      "Ploaie moderată",

    65:
      "Ploaie puternică",

    66:
      "Ploaie înghețată slabă",

    67:
      "Ploaie înghețată puternică",

    71:
      "Ninsoare slabă",

    73:
      "Ninsoare moderată",

    75:
      "Ninsoare puternică",

    77:
      "Granule de zăpadă",

    80:
      "Averse slabe",

    81:
      "Averse moderate",

    82:
      "Averse puternice",

    85:
      "Averse de ninsoare slabe",

    86:
      "Averse de ninsoare puternice",

    95:
      "Furtună",

    96:
      "Furtună cu grindină",

    99:
      "Furtună puternică"
  };

  return (
    descriptions[code] ||
    "Condiții necunoscute"
  );
}


function getWeatherVisual(code) {
  if (code === 0) {
    return {
      icon:
        "☀️",

      className:
        "weather-clear",

      effect:
        "clear"
    };
  }

  if (
    code >= 1 &&
    code <= 3
  ) {
    return {
      icon:
        code === 1
          ? "🌤️"
          : "☁️",

      className:
        "weather-cloudy",

      effect:
        "cloud"
    };
  }

  if (
    code === 45 ||
    code === 48
  ) {
    return {
      icon:
        "🌫️",

      className:
        "weather-fog",

      effect:
        "cloud"
    };
  }

  if (
    code >= 51 &&
    code <= 67
  ) {
    return {
      icon:
        "🌧️",

      className:
        "weather-rain",

      effect:
        "rain"
    };
  }

  if (
    code >= 71 &&
    code <= 86
  ) {
    return {
      icon:
        "❄️",

      className:
        "weather-snow",

      effect:
        "snow"
    };
  }

  if (code >= 95) {
    return {
      icon:
        "⛈️",

      className:
        "weather-storm",

      effect:
        "storm"
    };
  }

  return {
    icon:
      "🌤️",

    className:
      "weather-clear",

    effect:
      "clear"
  };
}


function updateWeatherVisual(code) {
  const visual =
    getWeatherVisual(code);

  currentWeatherCode =
    code;

  currentWeatherClass =
    visual.className;

  weatherIconElement.textContent =
    visual.icon;

  updateBodyClasses();

  createWeatherEffect(
    visual.effect
  );
}


function updateBodyClasses() {
  document.body.className =
    currentWeatherClass;

  document.body.classList.toggle(
    "dark-mode",
    darkMode
  );
}


/* =========================
   ANIMAȚII METEO
========================= */

function clearWeatherEffects() {
  weatherEffects.innerHTML =
    "";
}


function createWeatherEffect(effect) {
  clearWeatherEffects();

  if (effect === "rain") {
    createRainEffect(
      55
    );

    return;
  }

  if (effect === "snow") {
    createSnowEffect(
      42
    );

    return;
  }

  if (effect === "cloud") {
    createCloudEffect(
      3
    );

    return;
  }

  if (effect === "storm") {
    createRainEffect(
      70
    );

    const flash =
      document.createElement(
        "div"
      );

    flash.className =
      "lightning-flash";

    weatherEffects.appendChild(
      flash
    );
  }
}


function createRainEffect(count) {
  for (
    let index = 0;
    index < count;
    index += 1
  ) {
    const rainDrop =
      document.createElement(
        "span"
      );

    rainDrop.className =
      "rain-drop";

    rainDrop.style.left =
      `${Math.random() * 100}%`;

    rainDrop.style.animationDuration =
      `${
        0.6 +
        Math.random() * 0.8
      }s`;

    rainDrop.style.animationDelay =
      `${
        Math.random() * 2
      }s`;

    rainDrop.style.opacity =
      `${
        0.25 +
        Math.random() * 0.6
      }`;

    weatherEffects.appendChild(
      rainDrop
    );
  }
}


function createSnowEffect(count) {
  for (
    let index = 0;
    index < count;
    index += 1
  ) {
    const snowFlake =
      document.createElement(
        "span"
      );

    snowFlake.className =
      "snow-flake";

    snowFlake.textContent =
      Math.random() > 0.5
        ? "❄"
        : "•";

    snowFlake.style.left =
      `${Math.random() * 100}%`;

    snowFlake.style.fontSize =
      `${
        8 +
        Math.random() * 17
      }px`;

    snowFlake.style.animationDuration =
      `${
        5 +
        Math.random() * 8
      }s`;

    snowFlake.style.animationDelay =
      `${
        Math.random() * 5
      }s`;

    weatherEffects.appendChild(
      snowFlake
    );
  }
}


function createCloudEffect(count) {
  for (
    let index = 0;
    index < count;
    index += 1
  ) {
    const cloud =
      document.createElement(
        "span"
      );

    cloud.className =
      "animated-cloud";

    cloud.textContent =
      "☁";

    cloud.style.top =
      `${
        8 +
        index * 22
      }%`;

    cloud.style.animationDuration =
      `${
        28 +
        index * 10
      }s`;

    cloud.style.animationDelay =
      `${index * -9}s`;

    weatherEffects.appendChild(
      cloud
    );
  }
}


/* =========================
   TEMPERATURĂ ȘI TEMĂ
========================= */

function celsiusToFahrenheit(
  value
) {
  return (
    value * 9 / 5 +
    32
  );
}


function convertTemperature(value) {
  if (
    value === null ||
    value === undefined
  ) {
    return "--";
  }

  const convertedValue =
    temperatureUnit === "F"
      ? celsiusToFahrenheit(
          Number(value)
        )
      : Number(value);

  return Math.round(
    convertedValue
  );
}


function updateCurrentTemperatures() {
  if (
    currentTemperatureCelsius !==
    null
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

  renderStatistics();
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

  if (currentHourlyWeather) {
    displayHourlyForecast(
      currentHourlyWeather
    );

    updateChart();
  }

  if (currentDailyWeather) {
    displayDailyForecast(
      currentDailyWeather
    );
  }

  showToast(
    "info",
    "Unitate schimbată",
    `Temperaturile sunt afișate acum în °${temperatureUnit}.`
  );
}


function updateThemeButton() {
  themeButton.textContent =
    darkMode
      ? "☀️"
      : "🌙";
}


function toggleTheme() {
  darkMode =
    !darkMode;

  localStorage.setItem(
    "darkMode",
    String(darkMode)
  );

  updateBodyClasses();

  updateThemeButton();

  updateChart();

  showToast(
    "info",
    darkMode
      ? "Mod întunecat"
      : "Mod luminos",
    "Tema aplicației a fost actualizată."
  );
}


/* =========================
   FORMATĂRI
========================= */

function formatTime(value) {
  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "--";
  }

  return date.toLocaleTimeString(
    "ro-RO",
    {
      hour:
        "2-digit",

      minute:
        "2-digit"
    }
  );
}


function formatDay(value) {
  return new Date(
    `${value}T12:00:00`
  ).toLocaleDateString(
    "ro-RO",
    {
      weekday:
        "short"
    }
  );
}


function formatDate(value) {
  return new Date(
    `${value}T12:00:00`
  ).toLocaleDateString(
    "ro-RO",
    {
      day:
        "2-digit",

      month:
        "2-digit"
    }
  );
}


function formatDateTime(value) {
  if (!value) {
    return "Nicio căutare";
  }

  return new Date(
    value
  ).toLocaleString(
    "ro-RO",
    {
      day:
        "2-digit",

      month:
        "2-digit",

      year:
        "numeric",

      hour:
        "2-digit",

      minute:
        "2-digit"
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
    (
      (
        Number(degrees) %
        360
      ) +
      360
    ) %
    360;

  const index =
    Math.round(
      normalized /
      45
    ) %
    8;

  return (
    `${directions[index]} ` +
    `(${Math.round(normalized)}°)`
  );
}


/* =========================
   LOADING ȘI SKELETON
========================= */

function setLoadingState(isLoading) {
  searchButton.disabled =
    isLoading;

  refreshButton.disabled =
    isLoading;

  locationButton.disabled =
    isLoading;

  centerMapButton.disabled =
    isLoading;

  searchButton.textContent =
    isLoading
      ? "Se caută..."
      : "🔎 Caută";

  refreshIcon.classList.toggle(
    "spinning",
    isLoading
  );

  weatherContent.classList.toggle(
    "loading",
    isLoading
  );

  weatherContent.classList.toggle(
    "hidden",
    isLoading
  );

  weatherSkeleton.classList.toggle(
    "hidden",
    !isLoading
  );

  hourlyContainer.classList.toggle(
    "hidden",
    isLoading
  );

  hourlySkeleton.classList.toggle(
    "hidden",
    !isLoading
  );

  forecastContainer.classList.toggle(
    "hidden",
    isLoading
  );

  dailySkeleton.classList.toggle(
    "hidden",
    !isLoading
  );

  chartSkeleton.classList.toggle(
    "hidden",
    !isLoading
  );
}


function animateCityChange() {
  weatherCard.classList.remove(
    "switching-city"
  );

  void weatherCard.offsetWidth;

  weatherCard.classList.add(
    "switching-city"
  );
}


function showError(message) {
  statusElement.textContent =
    message;

  statusElement.classList.add(
    "error-message"
  );

  showToast(
    "error",
    "A apărut o problemă",
    message
  );
}


function clearError() {
  statusElement.classList.remove(
    "error-message"
  );
}


/* =========================
   STATISTICI
========================= */

function createCityStatisticsKey(
  latitude,
  longitude
) {
  return (
    `${Number(latitude).toFixed(3)},` +
    `${Number(longitude).toFixed(3)}`
  );
}


function updateStatistics(
  cityName,
  countryName,
  latitude,
  longitude,
  currentTemperature,
  dailyMinimum,
  dailyMaximum,
  countSearch
) {
  if (countSearch) {
    weatherStatistics.totalSearches +=
      1;

    weatherStatistics.lastSearch = {
      city:
        cityName,

      country:
        countryName,

      date:
        new Date().toISOString()
    };
  }

  const cityKey =
    createCityStatisticsKey(
      latitude,
      longitude
    );

  const cityAlreadyStored =
    weatherStatistics.uniqueCities.some(
      function (city) {
        return city.key ===
          cityKey;
      }
    );

  if (!cityAlreadyStored) {
    weatherStatistics.uniqueCities.push({
      key:
        cityKey,

      city:
        cityName,

      country:
        countryName
    });
  }

  const possibleMaximums = [
    currentTemperature,
    dailyMaximum
  ].filter(
    function (value) {
      return Number.isFinite(
        Number(value)
      );
    }
  );

  const possibleMinimums = [
    currentTemperature,
    dailyMinimum
  ].filter(
    function (value) {
      return Number.isFinite(
        Number(value)
      );
    }
  );

  const foundMaximum =
    possibleMaximums.length
      ? Math.max(
          ...possibleMaximums
        )
      : null;

  const foundMinimum =
    possibleMinimums.length
      ? Math.min(
          ...possibleMinimums
        )
      : null;

  if (
    foundMaximum !== null &&
    (
      weatherStatistics.maximumTemperature ===
        null ||
      foundMaximum >
        weatherStatistics.maximumTemperature
    )
  ) {
    weatherStatistics.maximumTemperature =
      foundMaximum;

    weatherStatistics.maximumCity =
      `${cityName}, ${countryName}`;
  }

  if (
    foundMinimum !== null &&
    (
      weatherStatistics.minimumTemperature ===
        null ||
      foundMinimum <
        weatherStatistics.minimumTemperature
    )
  ) {
    weatherStatistics.minimumTemperature =
      foundMinimum;

    weatherStatistics.minimumCity =
      `${cityName}, ${countryName}`;
  }

  saveStatistics();

  renderStatistics();
}


function renderStatistics() {
  totalSearchesStat.textContent =
    weatherStatistics.totalSearches;

  uniqueCitiesStat.textContent =
    weatherStatistics.uniqueCities.length;

  if (
    weatherStatistics.lastSearch
  ) {
    lastSearchStat.textContent =
      `${weatherStatistics.lastSearch.city}, ` +
      `${weatherStatistics.lastSearch.country} · ` +
      `${formatDateTime(
        weatherStatistics.lastSearch.date
      )}`;
  } else {
    lastSearchStat.textContent =
      "Nicio căutare";
  }

  maximumTemperatureUnit.textContent =
    `°${temperatureUnit}`;

  minimumTemperatureUnit.textContent =
    `°${temperatureUnit}`;

  if (
    weatherStatistics.maximumTemperature !==
    null
  ) {
    maximumTemperatureStat.textContent =
      convertTemperature(
        weatherStatistics.maximumTemperature
      );

    maximumCityStat.textContent =
      weatherStatistics.maximumCity ||
      "--";
  } else {
    maximumTemperatureStat.textContent =
      "--";

    maximumCityStat.textContent =
      "--";
  }

  if (
    weatherStatistics.minimumTemperature !==
    null
  ) {
    minimumTemperatureStat.textContent =
      convertTemperature(
        weatherStatistics.minimumTemperature
      );

    minimumCityStat.textContent =
      weatherStatistics.minimumCity ||
      "--";
  } else {
    minimumTemperatureStat.textContent =
      "--";

    minimumCityStat.textContent =
      "--";
  }
}


function resetStatistics() {
  const confirmed =
    window.confirm(
      "Sigur vrei să ștergi toate statisticile?"
    );

  if (!confirmed) {
    return;
  }

  weatherStatistics =
    getDefaultStatistics();

  saveStatistics();

  renderStatistics();

  showToast(
    "success",
    "Statistici resetate",
    "Toate statisticile locale au fost șterse."
  );
}


/* =========================
   CALITATEA AERULUI
========================= */

function getAirInfo(aqi) {
  if (aqi <= 20) {
    return {
      label:
        "Aer bun",

      message:
        "Calitatea aerului este bună.",

      icon:
        "🌿",

      className:
        "aqi-good",

      recommendation:
        "Poți desfășura activități în aer liber în condiții normale."
    };
  }

  if (aqi <= 40) {
    return {
      label:
        "Aer acceptabil",

      message:
        "Calitatea aerului este în general acceptabilă.",

      icon:
        "🙂",

      className:
        "aqi-fair",

      recommendation:
        "Activitățile în aer liber sunt potrivite pentru majoritatea persoanelor."
    };
  }

  if (aqi <= 60) {
    return {
      label:
        "Aer moderat",

      message:
        "Persoanele sensibile pot resimți disconfort.",

      icon:
        "😐",

      className:
        "aqi-moderate",

      recommendation:
        "Persoanele sensibile ar trebui să reducă efortul intens în aer liber."
    };
  }

  if (aqi <= 80) {
    return {
      label:
        "Aer slab",

      message:
        "Poluarea aerului este ridicată.",

      icon:
        "😷",

      className:
        "aqi-poor",

      recommendation:
        "Redu activitățile intense și timpul petrecut în zone aglomerate."
    };
  }

  if (aqi <= 100) {
    return {
      label:
        "Aer foarte slab",

      message:
        "Calitatea aerului poate afecta sănătatea.",

      icon:
        "⚠️",

      className:
        "aqi-very-poor",

      recommendation:
        "Limitează timpul în exterior și evită exercițiile intense."
    };
  }

  return {
    label:
      "Aer extrem de slab",

    message:
      "Nivelul de poluare este foarte ridicat.",

    icon:
      "☣️",

    className:
      "aqi-extreme",

    recommendation:
      "Evită activitățile în aer liber și ține ferestrele închise când este posibil."
  };
}


function getUvInfo(uv) {
  if (uv < 3) {
    return {
      level:
        "Scăzut",

      recommendation:
        "Protecția solară obișnuită este suficientă."
    };
  }

  if (uv < 6) {
    return {
      level:
        "Moderat",

      recommendation:
        "Folosește cremă cu protecție solară și ochelari."
    };
  }

  if (uv < 8) {
    return {
      level:
        "Ridicat",

      recommendation:
        "Folosește SPF ridicat și evită expunerea prelungită la prânz."
    };
  }

  if (uv < 11) {
    return {
      level:
        "Foarte ridicat",

      recommendation:
        "Redu expunerea, poartă pălărie și folosește SPF ridicat."
    };
  }

  return {
    level:
      "Extrem",

    recommendation:
      "Evită expunerea directă la soare în orele de vârf."
  };
}


function displayAirQuality(data) {
  const current =
    data.current;

  if (!current) {
    throw new Error(
      "Date incomplete despre aer."
    );
  }

  const aqi =
    Math.round(
      current.european_aqi
    );

  const uv =
    Number(
      current.uv_index
    );

  const air =
    getAirInfo(aqi);

  const uvInfo =
    getUvInfo(uv);

  aqiValueElement.textContent =
    aqi;

  aqiBadge.className =
    `aqi-badge ${air.className}`;

  airQualityIconElement.textContent =
    air.icon;

  airQualityLabelElement.textContent =
    air.label;

  airQualityMessageElement.textContent =
    air.message;

  pm25Element.textContent =
    roundNumber(
      current.pm2_5,
      1
    );

  pm10Element.textContent =
    roundNumber(
      current.pm10,
      1
    );

  no2Element.textContent =
    roundNumber(
      current.nitrogen_dioxide,
      1
    );

  ozoneElement.textContent =
    roundNumber(
      current.ozone,
      1
    );

  carbonMonoxideElement.textContent =
    Math.round(
      Number(
        current.carbon_monoxide
      )
    );

  uvIndexElement.textContent =
    roundNumber(
      uv,
      1
    );

  uvLevelElement.textContent =
    uvInfo.level;

  airRecommendationElement.textContent =
    air.recommendation;

  uvRecommendationElement.textContent =
    uvInfo.recommendation;
}


function resetAirQuality() {
  aqiValueElement.textContent =
    "--";

  aqiBadge.className =
    "aqi-badge aqi-unknown";

  airQualityIconElement.textContent =
    "🌿";

  airQualityLabelElement.textContent =
    "Date indisponibile";

  airQualityMessageElement.textContent =
    "Nu am putut încărca datele despre aer.";

  [
    pm25Element,
    pm10Element,
    no2Element,
    ozoneElement,
    carbonMonoxideElement,
    uvIndexElement
  ].forEach(
    function (element) {
      element.textContent =
        "--";
    }
  );

  uvLevelElement.textContent =
    "Necunoscut";

  airRecommendationElement.textContent =
    "Date insuficiente pentru recomandare.";

  uvRecommendationElement.textContent =
    "Date insuficiente pentru recomandare.";
}


async function loadAirQuality(
  latitude,
  longitude
) {
  const url =
    `https://air-quality-api.open-meteo.com/v1/air-quality` +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=european_aqi,pm2_5,pm10,nitrogen_dioxide,ozone,carbon_monoxide,uv_index` +
    `&timezone=auto`;

  try {
    const response =
      await fetch(url);

    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}`
      );
    }

    const data =
      await response.json();

    displayAirQuality(data);
  } catch (error) {
    console.error(
      "Calitatea aerului:",
      error
    );

    resetAirQuality();

    showToast(
      "warning",
      "Calitatea aerului indisponibilă",
      "Datele despre aer nu au putut fi încărcate."
    );
  }
}


/* =========================
   HARTĂ
========================= */

function initializeMap() {
  if (
    typeof L ===
    "undefined"
  ) {
    showToast(
      "error",
      "Harta nu este disponibilă",
      "Biblioteca Leaflet nu a fost încărcată."
    );

    return;
  }

  map =
    L.map(
      "weather-map"
    ).setView(
      [
        currentLatitude,
        currentLongitude
      ],
      8
    );

  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom:
        19,

      attribution:
        "&copy; OpenStreetMap contributors"
    }
  ).addTo(map);

  marker =
    L.marker(
      [
        currentLatitude,
        currentLongitude
      ]
    )
      .addTo(map)
      .bindPopup(
        "București"
      )
      .openPopup();

  map.on(
    "click",
    function (event) {
      loadAllData(
        event.latlng.lat,
        event.latlng.lng,
        "Punct selectat",
        "Hartă interactivă",
        true,
        "map"
      );
    }
  );

  window.setTimeout(
    function () {
      map.invalidateSize();
    },
    300
  );
}


function updateMap(
  latitude,
  longitude,
  cityName
) {
  if (!map || !marker) {
    return;
  }

  marker
    .setLatLng(
      [
        latitude,
        longitude
      ]
    )
    .bindPopup(
      `<strong>${escapeHtml(cityName)}</strong><br>` +
      `${Number(latitude).toFixed(4)}, ` +
      `${Number(longitude).toFixed(4)}`
    )
    .openPopup();

  map.setView(
    [
      latitude,
      longitude
    ],
    9,
    {
      animate:
        true
    }
  );
}


/* =========================
   PROGNOZA ORARĂ
========================= */

function getCurrentHourlyRange(
  hourly
) {
  const currentTime =
    Date.now();

  let startIndex =
    hourly.time.findIndex(
      function (value) {
        return (
          new Date(value).getTime() >=
          currentTime
        );
      }
    );

  if (startIndex === -1) {
    startIndex =
      0;
  }

  const endIndex =
    Math.min(
      startIndex + 24,
      hourly.time.length
    );

  return {
    startIndex,
    endIndex
  };
}


function displayHourlyForecast(
  hourly
) {
  currentHourlyWeather =
    hourly;

  hourlyContainer.innerHTML =
    "";

  const {
    startIndex,
    endIndex
  } =
    getCurrentHourlyRange(
      hourly
    );

  for (
    let index = startIndex;
    index < endIndex;
    index += 1
  ) {
    const visual =
      getWeatherVisual(
        hourly.weather_code[index]
      );

    const card =
      document.createElement(
        "article"
      );

    card.className =
      `hour-card${
        index === startIndex
          ? " current"
          : ""
      }`;

    card.style.animationDelay =
      `${
        (
          index -
          startIndex
        ) *
        45
      }ms`;

    card.innerHTML = `
      <strong>
        ${
          index === startIndex
            ? "Acum"
            : formatTime(
                hourly.time[index]
              )
        }
      </strong>

      <div class="icon">
        ${visual.icon}
      </div>

      <strong>
        ${
          convertTemperature(
            hourly.temperature_2m[index]
          )
        }°
      </strong>

      <small>
        💧 ${
          hourly.precipitation_probability[index]
          ?? 0
        }%
      </small>

      <small>
        💨 ${
          Math.round(
            hourly.wind_speed_10m[index]
            ?? 0
          )
        } km/h
      </small>
    `;

    hourlyContainer.appendChild(
      card
    );
  }
}


/* =========================
   PROGNOZA ZILNICĂ
========================= */

function displayDailyForecast(
  daily
) {
  currentDailyWeather =
    daily;

  forecastContainer.innerHTML =
    "";

  daily.time.forEach(
    function (
      date,
      index
    ) {
      const visual =
        getWeatherVisual(
          daily.weather_code[index]
        );

      const card =
        document.createElement(
          "article"
        );

      card.className =
        `day-card${
          index === 0
            ? " today"
            : ""
        }`;

      card.style.animationDelay =
        `${index * 65}ms`;

      card.innerHTML = `
        <strong>
          ${
            index === 0
              ? "Astăzi"
              : formatDay(date)
          }
        </strong>

        <small>
          ${formatDate(date)}
        </small>

        <div class="icon">
          ${visual.icon}
        </div>

        <small>
          ${
            getWeatherDescription(
              daily.weather_code[index]
            )
          }
        </small>

        <p>
          <strong>
            ${
              convertTemperature(
                daily.temperature_2m_max[index]
              )
            }°
          </strong>

          <span>
            ${
              convertTemperature(
                daily.temperature_2m_min[index]
              )
            }°
          </span>
        </p>
      `;

      forecastContainer.appendChild(
        card
      );
    }
  );
}


/* =========================
   GRAFICE CHART.JS
========================= */

function getChartData() {
  if (!currentHourlyWeather) {
    return null;
  }

  const {
    startIndex,
    endIndex
  } =
    getCurrentHourlyRange(
      currentHourlyWeather
    );

  const labels =
    currentHourlyWeather.time
      .slice(
        startIndex,
        endIndex
      )
      .map(
        function (time, index) {
          return index === 0
            ? "Acum"
            : formatTime(time);
        }
      );

  const temperatures =
    currentHourlyWeather
      .temperature_2m
      .slice(
        startIndex,
        endIndex
      )
      .map(
        function (value) {
          return convertTemperature(
            value
          );
        }
      );

  const precipitation =
    currentHourlyWeather
      .precipitation_probability
      .slice(
        startIndex,
        endIndex
      )
      .map(
        function (value) {
          return Number(value) ||
            0;
        }
      );

  const humidity =
    currentHourlyWeather
      .relative_humidity_2m
      .slice(
        startIndex,
        endIndex
      )
      .map(
        function (value) {
          return Number(value) ||
            0;
        }
      );

  const wind =
    currentHourlyWeather
      .wind_speed_10m
      .slice(
        startIndex,
        endIndex
      )
      .map(
        function (value) {
          return Number(value) ||
            0;
        }
      );

  return {
    labels,
    temperatures,
    precipitation,
    humidity,
    wind
  };
}


function getChartConfiguration(
  type,
  data
) {
  const commonDataset = {
    borderWidth:
      3,

    pointRadius:
      3,

    pointHoverRadius:
      7,

    tension:
      0.35,

    fill:
      true
  };

  if (
    type ===
    "temperature"
  ) {
    return {
      title:
        `Temperatura următoarelor 24h (°${temperatureUnit})`,

      label:
        `Temperatură °${temperatureUnit}`,

      values:
        data.temperatures,

      chartType:
        "line",

      dataset: {
        ...commonDataset,

        borderColor:
          "rgba(255, 255, 255, 0.95)",

        backgroundColor:
          "rgba(255, 255, 255, 0.12)",

        pointBackgroundColor:
          "rgba(255, 255, 255, 1)"
      },

      beginAtZero:
        false
    };
  }

  if (
    type ===
    "precipitation"
  ) {
    return {
      title:
        "Probabilitatea precipitațiilor",

      label:
        "Probabilitate %",

      values:
        data.precipitation,

      chartType:
        "bar",

      dataset: {
        borderWidth:
          1,

        borderRadius:
          7,

        backgroundColor:
          "rgba(56, 189, 248, 0.65)",

        borderColor:
          "rgba(186, 230, 253, 1)"
      },

      beginAtZero:
        true,

      suggestedMax:
        100
    };
  }

  if (
    type ===
    "humidity"
  ) {
    return {
      title:
        "Umiditatea următoarelor 24h",

      label:
        "Umiditate %",

      values:
        data.humidity,

      chartType:
        "line",

      dataset: {
        ...commonDataset,

        borderColor:
          "rgba(103, 232, 249, 1)",

        backgroundColor:
          "rgba(103, 232, 249, 0.12)",

        pointBackgroundColor:
          "rgba(103, 232, 249, 1)"
      },

      beginAtZero:
        true,

      suggestedMax:
        100
    };
  }

  return {
    title:
      "Viteza vântului în următoarele 24h",

    label:
      "Vânt km/h",

    values:
      data.wind,

    chartType:
      "line",

    dataset: {
      ...commonDataset,

      borderColor:
        "rgba(196, 181, 253, 1)",

      backgroundColor:
        "rgba(196, 181, 253, 0.12)",

      pointBackgroundColor:
        "rgba(196, 181, 253, 1)"
    },

    beginAtZero:
      true
  };
}


function updateChart() {
  if (
    typeof Chart ===
    "undefined" ||
    !currentHourlyWeather
  ) {
    return;
  }

  const chartData =
    getChartData();

  if (!chartData) {
    return;
  }

  const configuration =
    getChartConfiguration(
      activeChartType,
      chartData
    );

  if (weatherChart) {
    weatherChart.destroy();
  }

  const computedStyles =
    getComputedStyle(
      document.documentElement
    );

  const gridColor =
    computedStyles
      .getPropertyValue(
        "--chart-grid"
      )
      .trim();

  const textColor =
    computedStyles
      .getPropertyValue(
        "--chart-text"
      )
      .trim();

  weatherChart =
    new Chart(
      weatherChartCanvas,
      {
        type:
          configuration.chartType,

        data: {
          labels:
            chartData.labels,

          datasets: [
            {
              label:
                configuration.label,

              data:
                configuration.values,

              ...configuration.dataset
            }
          ]
        },

        options: {
          responsive:
            true,

          maintainAspectRatio:
            false,

          interaction: {
            intersect:
              false,

            mode:
              "index"
          },

          animation: {
            duration:
              700,

            easing:
              "easeOutQuart"
          },

          plugins: {
            legend: {
              labels: {
                color:
                  textColor,

                usePointStyle:
                  true
              }
            },

            title: {
              display:
                true,

              text:
                configuration.title,

              color:
                textColor,

              font: {
                size:
                  17,

                weight:
                  "bold"
              },

              padding: {
                bottom:
                  20
              }
            },

            tooltip: {
              backgroundColor:
                "rgba(15, 23, 42, 0.95)",

              titleColor:
                "#ffffff",

              bodyColor:
                "#ffffff",

              padding:
                12,

              cornerRadius:
                10
            }
          },

          scales: {
            x: {
              ticks: {
                color:
                  textColor,

                maxRotation:
                  0,

                autoSkip:
                  true,

                maxTicksLimit:
                  12
              },

              grid: {
                color:
                  gridColor
              }
            },

            y: {
              beginAtZero:
                configuration.beginAtZero,

              suggestedMax:
                configuration.suggestedMax,

              ticks: {
                color:
                  textColor
              },

              grid: {
                color:
                  gridColor
              }
            }
          }
        }
      }
    );

  updateChartSummaries(
    chartData
  );
}


function updateChartSummaries(
  chartData
) {
  const averageTemperature =
    calculateAverage(
      chartData.temperatures
    );

  const maximumRainChance =
    Math.max(
      ...chartData.precipitation
    );

  const averageHumidity =
    calculateAverage(
      chartData.humidity
    );

  const maximumWind =
    Math.max(
      ...chartData.wind
    );

  averageTemperatureElement.textContent =
    `${Math.round(averageTemperature)}°${temperatureUnit}`;

  maximumRainChanceElement.textContent =
    `${Math.round(maximumRainChance)}%`;

  averageHumidityElement.textContent =
    `${Math.round(averageHumidity)}%`;

  maximumWindElement.textContent =
    `${Math.round(maximumWind)} km/h`;
}


function changeActiveChart(type) {
  activeChartType =
    type;

  chartTabs.forEach(
    function (tab) {
      tab.classList.toggle(
        "active",
        tab.dataset.chart ===
          type
      );
    }
  );

  updateChart();
}


/* =========================
   FAVORITE ȘI ISTORIC
========================= */

function citiesAreEqual(
  first,
  second
) {
  return (
    Math.abs(
      first.latitude -
      second.latitude
    ) <
      0.001 &&
    Math.abs(
      first.longitude -
      second.longitude
    ) <
      0.001
  );
}


function getCurrentCityObject() {
  return {
    name:
      currentCity,

    country:
      currentCountry,

    latitude:
      currentLatitude,

    longitude:
      currentLongitude,

    timezone:
      currentTimezone
  };
}


function updateFavoriteButton() {
  const currentCityObject =
    getCurrentCityObject();

  const isFavorite =
    favoriteCities.some(
      function (city) {
        return citiesAreEqual(
          city,
          currentCityObject
        );
      }
    );

  favoriteButton.textContent =
    isFavorite
      ? "★"
      : "☆";

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
      function (item) {
        return citiesAreEqual(
          item,
          city
        );
      }
    );

  if (existingIndex >= 0) {
    favoriteCities.splice(
      existingIndex,
      1
    );

    showToast(
      "info",
      "Eliminat din favorite",
      `${city.name} a fost eliminat din favorite.`
    );
  } else {
    favoriteCities.unshift(
      city
    );

    showToast(
      "success",
      "Adăugat la favorite",
      `${city.name} a fost salvat în favorite.`
    );
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
      function (item) {
        return !citiesAreEqual(
          item,
          city
        );
      }
    );

  recentCities.unshift(
    city
  );

  recentCities =
    recentCities.slice(
      0,
      6
    );

  saveStoredArray(
    "recentCities",
    recentCities
  );

  renderRecentCities();
}


function createCityButton(city) {
  const button =
    document.createElement(
      "button"
    );

  button.type =
    "button";

  button.className =
    "chip";

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
        true,
        "saved"
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
  container.innerHTML =
    "";

  if (!cities.length) {
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
        createCityButton(city)
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


/* =========================
   CĂUTAREA LOCALITĂȚILOR
========================= */

function hideSearchResults() {
  searchResults.classList.add(
    "hidden"
  );

  searchResults.innerHTML =
    "";
}


function displaySearchResults(
  results
) {
  searchResults.innerHTML =
    "";

  if (!results.length) {
    searchResults.innerHTML = `
      <p
        style="
          padding: 16px;
          text-align: center;
        "
      >
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
        document.createElement(
          "button"
        );

      button.type =
        "button";

      button.className =
        "search-result-button";

      const adminArea =
        location.admin1
          ? `, ${location.admin1}`
          : "";

      button.innerHTML = `
        <strong>
          ${escapeHtml(location.name)}
        </strong>

        <small>
          ${
            escapeHtml(
              location.country ||
              "Țară necunoscută"
            )
          }${escapeHtml(adminArea)}

          · ${Number(
            location.latitude
          ).toFixed(3)},
          ${Number(
            location.longitude
          ).toFixed(3)}
        </small>
      `;

      button.addEventListener(
        "click",
        function () {
          hideSearchResults();

          cityInput.value =
            "";

          loadAllData(
            location.latitude,
            location.longitude,
            location.name,
            location.country ||
              "Țară necunoscută",
            true,
            "search"
          );
        }
      );

      searchResults.appendChild(
        button
      );
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

  searchButton.disabled =
    true;

  searchButton.textContent =
    "Se caută...";

  try {
    const url =
      `https://geocoding-api.open-meteo.com/v1/search` +
      `?name=${encodeURIComponent(cityName)}` +
      `&count=5` +
      `&language=ro` +
      `&format=json`;

    const response =
      await fetch(url);

    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}`
      );
    }

    const data =
      await response.json();

    displaySearchResults(
      data.results || []
    );

    if (
      data.results?.length
    ) {
      statusElement.textContent =
        "Alege localitatea corectă.";
    } else {
      statusElement.textContent =
        "Localitatea nu a fost găsită.";

      showToast(
        "warning",
        "Nicio localitate găsită",
        `Nu am găsit rezultate pentru „${cityName}”.`
      );
    }
  } catch (error) {
    console.error(
      "Căutarea localității:",
      error
    );

    showError(
      "A apărut o eroare la căutarea localității."
    );
  } finally {
    searchButton.disabled =
      false;

    searchButton.textContent =
      "🔎 Caută";
  }
}


/* =========================
   ÎNCĂRCAREA DATELOR METEO
========================= */

async function loadWeather(
  latitude,
  longitude,
  cityName,
  countryName,
  saveToRecent,
  source
) {
  const weatherUrl =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m` +
    `&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset` +
    `&forecast_days=7` +
    `&timezone=auto`;

  const response =
    await fetch(
      weatherUrl
    );

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
      "Datele meteo sunt incomplete."
    );
  }

  currentLatitude =
    Number(latitude);

  currentLongitude =
    Number(longitude);

  currentCity =
    cityName;

  currentCountry =
    countryName;

  currentTimezone =
    data.timezone ||
    "Necunoscut";

  currentTemperatureCelsius =
    data.current.temperature_2m;

  currentApparentTemperatureCelsius =
    data.current.apparent_temperature;


  cityElement.textContent =
    currentCity;

  countryElement.textContent =
    currentCountry;

  latitudeElement.textContent =
    `${currentLatitude.toFixed(4)}°`;

  longitudeElement.textContent =
    `${currentLongitude.toFixed(4)}°`;

  timezoneElement.textContent =
    currentTimezone;


  updateCurrentTemperatures();


  humidityElement.textContent =
    Math.round(
      data.current
        .relative_humidity_2m
    );

  precipitationElement.textContent =
    roundNumber(
      data.current.precipitation,
      1
    );

  windSpeedElement.textContent =
    Math.round(
      data.current.wind_speed_10m
    );

  windDirectionElement.textContent =
    getWindDirection(
      data.current.wind_direction_10m
    );

  windArrow.style.transform =
    `rotate(${
      Number(
        data.current.wind_direction_10m
      ) -
      90
    }deg)`;

  weatherTimeElement.textContent =
    formatTime(
      data.current.time
    );

  sunriseElement.textContent =
    formatTime(
      data.daily.sunrise[0]
    );

  sunsetElement.textContent =
    formatTime(
      data.daily.sunset[0]
    );

  statusElement.textContent =
    getWeatherDescription(
      data.current.weather_code
    );


  updateWeatherVisual(
    data.current.weather_code
  );

  displayHourlyForecast(
    data.hourly
  );

  displayDailyForecast(
    data.daily
  );

  updateMap(
    currentLatitude,
    currentLongitude,
    currentCity
  );

  updateFavoriteButton();


  if (saveToRecent) {
    addRecentCity(
      getCurrentCityObject()
    );
  }


  const shouldCountSearch =
    source !== "initial" &&
    source !== "refresh";

  updateStatistics(
    currentCity,
    currentCountry,
    currentLatitude,
    currentLongitude,
    data.current.temperature_2m,
    data.daily.temperature_2m_min[0],
    data.daily.temperature_2m_max[0],
    shouldCountSearch
  );


  animateCityChange();

  updateChart();

  return data;
}


/* =========================
   ÎNCĂRCAREA TUTUROR DATELOR
========================= */

async function loadAllData(
  latitude,
  longitude,
  cityName,
  countryName,
  saveToRecent = false,
  source = "search"
) {
  clearError();

  hideSearchResults();

  statusElement.textContent =
    "Se încarcă toate datele...";

  setLoadingState(
    true
  );

  try {
    await Promise.all([
      loadWeather(
        latitude,
        longitude,
        cityName,
        countryName,
        saveToRecent,
        source
      ),

      loadAirQuality(
        latitude,
        longitude
      )
    ]);

    showToast(
      "success",
      "Date actualizate",
      `Datele pentru ${cityName} au fost încărcate.`
    );
  } catch (error) {
    console.error(
      "Încărcarea datelor:",
      error
    );

    showError(
      navigator.onLine
        ? "Nu am putut încărca toate datele."
        : "Ești offline. Sunt utilizate datele salvate anterior."
    );
  } finally {
    setLoadingState(
      false
    );

    locationButton.textContent =
      "📍 Folosește locația mea";
  }
}


/* =========================
   GEOLOCAȚIE
========================= */

function useCurrentLocation() {
  if (
    !navigator.geolocation
  ) {
    showError(
      "Browserul nu acceptă geolocația."
    );

    return;
  }

  statusElement.textContent =
    "Determin locația dispozitivului...";

  locationButton.disabled =
    true;

  locationButton.textContent =
    "📍 Se caută locația...";

  navigator.geolocation.getCurrentPosition(
    function (position) {
      loadAllData(
        position.coords.latitude,
        position.coords.longitude,
        "Locația mea",
        "Poziție curentă",
        true,
        "location"
      );
    },

    function (error) {
      const messages = {
        1:
          "Permisiunea pentru locație a fost refuzată.",

        2:
          "Locația dispozitivului nu este disponibilă.",

        3:
          "Localizarea a durat prea mult."
      };

      showError(
        messages[error.code] ||
        "Nu am putut determina locația."
      );

      locationButton.disabled =
        false;

      locationButton.textContent =
        "📍 Folosește locația mea";
    },

    {
      enableHighAccuracy:
        true,

      timeout:
        10000,

      maximumAge:
        300000
    }
  );
}


/* =========================
   REVEAL LA SCROLL
========================= */

function initializeRevealAnimations() {
  const sections =
    document.querySelectorAll(
      ".reveal-section"
    );

  if (
    !(
      "IntersectionObserver" in
      window
    )
  ) {
    sections.forEach(
      function (section) {
        section.classList.add(
          "visible"
        );
      }
    );

    return;
  }

  const observer =
    new IntersectionObserver(
      function (entries) {
        entries.forEach(
          function (entry) {
            if (
              entry.isIntersecting
            ) {
              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );
            }
          }
        );
      },
      {
        threshold:
          0.12,

        rootMargin:
          "0px 0px -45px 0px"
      }
    );

  sections.forEach(
    function (section) {
      observer.observe(
        section
      );
    }
  );
}


/* =========================
   PWA
========================= */

function isApplicationInstalled() {
  return (
    window.matchMedia(
      "(display-mode: standalone)"
    ).matches ||
    window.navigator.standalone ===
      true
  );
}


function hideInstallButtons() {
  installButton.classList.add(
    "hidden"
  );

  secondaryInstallButton.classList.add(
    "hidden"
  );
}


function showInstallButtons() {
  if (
    !deferredInstallPrompt ||
    isApplicationInstalled()
  ) {
    return;
  }

  installButton.classList.remove(
    "hidden"
  );

  secondaryInstallButton.classList.remove(
    "hidden"
  );
}


async function installApplication() {
  if (!deferredInstallPrompt) {
    showToast(
      "info",
      "Instalare indisponibilă",
      "Folosește opțiunea de instalare din meniul browserului."
    );

    return;
  }

  deferredInstallPrompt.prompt();

  const result =
    await deferredInstallPrompt.userChoice;

  deferredInstallPrompt =
    null;

  hideInstallButtons();

  if (
    result.outcome ===
    "accepted"
  ) {
    showToast(
      "success",
      "Aplicație instalată",
      "Weather App a fost instalată cu succes."
    );
  }
}


function updateConnectionStatus() {
  const online =
    navigator.onLine;

  connectionStatus.classList.toggle(
    "online",
    online
  );

  connectionStatus.classList.toggle(
    "offline",
    !online
  );

  connectionText.textContent =
    online
      ? "Conectat la internet"
      : "Mod offline";
}


function showUpdateNotification(
  worker
) {
  waitingWorker =
    worker;

  updateNotification.classList.remove(
    "hidden"
  );
}


async function registerServiceWorker() {
  if (
    !(
      "serviceWorker" in
      navigator
    )
  ) {
    return;
  }

  try {
    const registration =
      await navigator.serviceWorker.register(
        "./service-worker.js"
      );

    if (
      registration.waiting
    ) {
      showUpdateNotification(
        registration.waiting
      );
    }

    registration.addEventListener(
      "updatefound",
      function () {
        const installingWorker =
          registration.installing;

        if (
          !installingWorker
        ) {
          return;
        }

        installingWorker.addEventListener(
          "statechange",
          function () {
            if (
              installingWorker.state ===
                "installed" &&
              navigator.serviceWorker.controller
            ) {
              showUpdateNotification(
                installingWorker
              );
            }
          }
        );
      }
    );
  } catch (error) {
    console.error(
      "Service Worker:",
      error
    );
  }
}


/* =========================
   EVENIMENTE
========================= */

searchButton.addEventListener(
  "click",
  searchCity
);


cityInput.addEventListener(
  "keydown",
  function (event) {
    if (
      event.key ===
      "Enter"
    ) {
      searchCity();
    }

    if (
      event.key ===
      "Escape"
    ) {
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
      false,
      "refresh"
    );
  }
);


centerMapButton.addEventListener(
  "click",
  function () {
    if (!map || !marker) {
      return;
    }

    map.setView(
      [
        currentLatitude,
        currentLongitude
      ],
      9,
      {
        animate:
          true
      }
    );

    marker.openPopup();
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
  function () {
    favoriteCities =
      [];

    saveStoredArray(
      "favoriteCities",
      favoriteCities
    );

    renderFavorites();

    updateFavoriteButton();

    showToast(
      "success",
      "Favorite șterse",
      "Lista orașelor favorite a fost golită."
    );
  }
);


clearRecentButton.addEventListener(
  "click",
  function () {
    recentCities =
      [];

    saveStoredArray(
      "recentCities",
      recentCities
    );

    renderRecentCities();

    showToast(
      "success",
      "Istoric șters",
      "Căutările recente au fost șterse."
    );
  }
);


resetStatisticsButton.addEventListener(
  "click",
  resetStatistics
);


chartTabs.forEach(
  function (tab) {
    tab.addEventListener(
      "click",
      function () {
        changeActiveChart(
          tab.dataset.chart
        );
      }
    );
  }
);


scrollTopButton.addEventListener(
  "click",
  function () {
    window.scrollTo({
      top:
        0,

      behavior:
        "smooth"
    });
  }
);


window.addEventListener(
  "scroll",
  function () {
    scrollTopButton.classList.toggle(
      "visible",
      window.scrollY >
        450
    );
  }
);


window.addEventListener(
  "beforeinstallprompt",
  function (event) {
    event.preventDefault();

    deferredInstallPrompt =
      event;

    showInstallButtons();
  }
);


window.addEventListener(
  "appinstalled",
  function () {
    deferredInstallPrompt =
      null;

    hideInstallButtons();

    document.body.classList.add(
      "app-installed"
    );

    showToast(
      "success",
      "Instalare finalizată",
      "Weather App este instalată pe dispozitiv."
    );
  }
);


installButton.addEventListener(
  "click",
  installApplication
);


secondaryInstallButton.addEventListener(
  "click",
  installApplication
);


window.addEventListener(
  "online",
  function () {
    updateConnectionStatus();

    showToast(
      "success",
      "Conexiune restabilită",
      "Aplicația este din nou conectată la internet."
    );

    loadAllData(
      currentLatitude,
      currentLongitude,
      currentCity,
      currentCountry,
      false,
      "refresh"
    );
  }
);


window.addEventListener(
  "offline",
  function () {
    updateConnectionStatus();

    showToast(
      "warning",
      "Mod offline",
      "Unele date vor fi afișate din memoria cache."
    );
  }
);


updateButton.addEventListener(
  "click",
  function () {
    if (!waitingWorker) {
      return;
    }

    waitingWorker.postMessage({
      type:
        "SKIP_WAITING"
    });
  }
);


if (
  "serviceWorker" in
  navigator
) {
  navigator.serviceWorker.addEventListener(
    "controllerchange",
    function () {
      if (refreshing) {
        return;
      }

      refreshing =
        true;

      window.location.reload();
    }
  );
}


/* =========================
   PORNIREA APLICAȚIEI
========================= */

function initializeApplication() {
  updateThemeButton();

  updateBodyClasses();

  updateCurrentTemperatures();

  updateConnectionStatus();

  renderFavorites();

  renderRecentCities();

  renderStatistics();

  initializeMap();

  initializeRevealAnimations();

  registerServiceWorker();


  if (
    isApplicationInstalled()
  ) {
    document.body.classList.add(
      "app-installed"
    );

    hideInstallButtons();
  }


  loadAllData(
    currentLatitude,
    currentLongitude,
    currentCity,
    currentCountry,
    false,
    "initial"
  );
}


initializeApplication();