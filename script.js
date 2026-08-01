const $ = (id) =>
  document.getElementById(id);


/* =====================================
   ELEMENTE DIN PAGINĂ
===================================== */

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

const pressureElement =
  $("pressure");

const visibilityElement =
  $("visibility");

const sunriseElement =
  $("sunrise");

const sunsetElement =
  $("sunset");

const weatherTimeElement =
  $("weather-time");

const statusElement =
  $("status");


const windSpeedElement =
  $("wind-speed");

const windDirectionElement =
  $("wind-direction");

const windArrow =
  $("wind-arrow");


const dashboardUv =
  $("dashboard-uv");

const dashboardAqi =
  $("dashboard-aqi");

const dayStatus =
  $("day-status");


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

const shareButton =
  $("share-button");

const centerMapButton =
  $("center-map-button");

const scrollTopButton =
  $("scroll-top-button");


const alertsSection =
  $("alerts-section");

const alertsContainer =
  $("alerts-container");


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


const chartCanvas =
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


/* =====================================
   CONFIGURAȚIA APLICAȚIEI
===================================== */

const APPLICATION_VERSION =
  "15.0.0";

const DEFAULT_LOCATION = {
  latitude:
    44.4268,

  longitude:
    26.1025,

  city:
    "București",

  country:
    "România",

  timezone:
    "Europe/Bucharest"
};


/* =====================================
   VARIABILE GLOBALE
===================================== */

let currentLatitude =
  DEFAULT_LOCATION.latitude;

let currentLongitude =
  DEFAULT_LOCATION.longitude;

let currentCity =
  DEFAULT_LOCATION.city;

let currentCountry =
  DEFAULT_LOCATION.country;

let currentTimezone =
  DEFAULT_LOCATION.timezone;


let currentTemperatureCelsius =
  null;

let currentApparentTemperatureCelsius =
  null;

let currentWeatherCode =
  0;

let currentWeatherClass =
  "weather-clear";

let currentHourlyWeather =
  null;

let currentDailyWeather =
  null;

let currentAirQuality =
  null;

let currentSunrise =
  null;

let currentSunset =
  null;


let map =
  null;

let marker =
  null;

let chart =
  null;

let activeChartType =
  "temperature";


let deferredInstallPrompt =
  null;

let waitingWorker =
  null;

let refreshing =
  false;

let activeRequestController =
  null;


let temperatureUnit =
  localStorage.getItem(
    "temperatureUnit"
  ) || "C";

let manualDark =
  localStorage.getItem(
    "manualDark"
  ) === "true";

let favoriteCities =
  readStoredArray(
    "favoriteCities"
  );

let recentCities =
  readStoredArray(
    "recentCities"
  );

let statistics =
  readStatistics();


/* =====================================
   LOCAL STORAGE
===================================== */

function readStoredArray(key) {
  try {
    const value =
      localStorage.getItem(key);

    return value
      ? JSON.parse(value)
      : [];
  } catch (error) {
    console.error(
      `Nu s-a putut citi ${key}:`,
      error
    );

    return [];
  }
}


function saveStoredArray(
  key,
  value
) {
  try {
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  } catch (error) {
    console.error(
      `Nu s-a putut salva ${key}:`,
      error
    );
  }
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
    const value =
      localStorage.getItem(
        "weatherStatistics"
      );

    if (!value) {
      return getDefaultStatistics();
    }

    return {
      ...getDefaultStatistics(),
      ...JSON.parse(value)
    };
  } catch (error) {
    console.error(
      "Nu s-au putut citi statisticile:",
      error
    );

    return getDefaultStatistics();
  }
}


function saveStatistics() {
  try {
    localStorage.setItem(
      "weatherStatistics",
      JSON.stringify(statistics)
    );
  } catch (error) {
    console.error(
      "Nu s-au putut salva statisticile:",
      error
    );
  }
}


/* =====================================
   FUNCȚII GENERALE
===================================== */

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


function isValidNumber(value) {
  return Number.isFinite(
    Number(value)
  );
}


function formatNumber(
  value,
  decimals = 0
) {
  if (!isValidNumber(value)) {
    return "--";
  }

  return Number(value).toFixed(
    decimals
  );
}


function calculateAverage(values) {
  const validValues =
    values.filter(
      isValidNumber
    );

  if (!validValues.length) {
    return 0;
  }

  const total =
    validValues.reduce(
      function (
        sum,
        value
      ) {
        return (
          sum +
          Number(value)
        );
      },
      0
    );

  return (
    total /
    validValues.length
  );
}


function formatTime(value) {
  if (!value) {
    return "--";
  }

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
  const date =
    new Date(
      `${value}T12:00:00`
    );

  return date.toLocaleDateString(
    "ro-RO",
    {
      weekday:
        "short"
    }
  );
}


function formatDate(value) {
  const date =
    new Date(
      `${value}T12:00:00`
    );

  return date.toLocaleDateString(
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

  const date =
    new Date(value);

  return date.toLocaleString(
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


/* =====================================
   NOTIFICĂRI TOAST
===================================== */

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
    `toast ${type}`;

  toast.innerHTML = `
    <span aria-hidden="true">
      ${icons[type] || icons.info}
    </span>

    <div>
      <strong>
        ${escapeHtml(title)}
      </strong>

      <p>
        ${escapeHtml(message)}
      </p>
    </div>

    <button
      type="button"
      aria-label="Închide notificarea"
    >
      ×
    </button>
  `;

  toastContainer.appendChild(
    toast
  );

  let removed =
    false;

  function removeToast() {
    if (removed) {
      return;
    }

    removed =
      true;

    toast.classList.add(
      "toast-leaving"
    );

    window.setTimeout(
      function () {
        toast.remove();
      },
      300
    );
  }

  toast
    .querySelector("button")
    .addEventListener(
      "click",
      removeToast
    );

  window.setTimeout(
    removeToast,
    duration
  );
}


/* =====================================
   DESCRIEREA VREMII
===================================== */

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
      "Averse slabe de ninsoare",

    86:
      "Averse puternice de ninsoare",

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


/* =====================================
   MOD ZI / NOAPTE
===================================== */

function isNightTime() {
  if (
    !currentSunrise ||
    !currentSunset
  ) {
    return false;
  }

  const now =
    new Date();

  const sunrise =
    new Date(
      currentSunrise
    );

  const sunset =
    new Date(
      currentSunset
    );

  return (
    now < sunrise ||
    now > sunset
  );
}


function updateBodyClasses() {
  const night =
    isNightTime();

  document.body.className =
    `${currentWeatherClass} ${
      night
        ? "nighttime"
        : "daytime"
    }`;

  document.body.classList.toggle(
    "manual-dark",
    manualDark
  );

  dayStatus.textContent =
    night
      ? "🌙 Mod noapte"
      : "☀️ Mod zi";
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

  createWeatherEffects(
    visual.effect
  );
}


/* =====================================
   ANIMAȚII METEO
===================================== */

function clearWeatherEffects() {
  weatherEffects.innerHTML =
    "";
}


function createWeatherEffects(effect) {
  clearWeatherEffects();

  if (isNightTime()) {
    createStars(55);
  }

  if (effect === "rain") {
    createRain(60);
  }

  if (effect === "snow") {
    createSnow(45);
  }

  if (effect === "cloud") {
    createClouds(3);
  }

  if (effect === "storm") {
    createRain(75);

    const lightning =
      document.createElement(
        "div"
      );

    lightning.className =
      "lightning";

    weatherEffects.appendChild(
      lightning
    );
  }
}


function createRain(count) {
  for (
    let index = 0;
    index < count;
    index += 1
  ) {
    const drop =
      document.createElement(
        "span"
      );

    drop.className =
      "rain-drop";

    drop.style.left =
      `${Math.random() * 100}%`;

    drop.style.opacity =
      `${
        0.25 +
        Math.random() * 0.65
      }`;

    drop.style.animationDuration =
      `${
        0.55 +
        Math.random() * 0.95
      }s`;

    drop.style.animationDelay =
      `${Math.random() * 2}s`;

    weatherEffects.appendChild(
      drop
    );
  }
}


function createSnow(count) {
  for (
    let index = 0;
    index < count;
    index += 1
  ) {
    const flake =
      document.createElement(
        "span"
      );

    flake.className =
      "snow-flake";

    flake.textContent =
      Math.random() > 0.4
        ? "❄"
        : "•";

    flake.style.left =
      `${Math.random() * 100}%`;

    flake.style.opacity =
      `${
        0.45 +
        Math.random() * 0.55
      }`;

    flake.style.fontSize =
      `${
        8 +
        Math.random() * 16
      }px`;

    flake.style.animationDuration =
      `${
        5 +
        Math.random() * 8
      }s`;

    flake.style.animationDelay =
      `${Math.random() * 5}s`;

    weatherEffects.appendChild(
      flake
    );
  }
}


function createClouds(count) {
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
        index * 25
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


function createStars(count) {
  for (
    let index = 0;
    index < count;
    index += 1
  ) {
    const star =
      document.createElement(
        "span"
      );

    star.className =
      "star";

    star.style.left =
      `${Math.random() * 100}%`;

    star.style.top =
      `${Math.random() * 68}%`;

    star.style.opacity =
      `${
        0.3 +
        Math.random() * 0.7
      }`;

    star.style.animationDelay =
      `${Math.random() * 3}s`;

    weatherEffects.appendChild(
      star
    );
  }
}


/* =====================================
   TEMPERATURĂ
===================================== */

function celsiusToFahrenheit(value) {
  return (
    Number(value) *
    9 /
    5 +
    32
  );
}


function convertTemperature(value) {
  if (!isValidNumber(value)) {
    return "--";
  }

  const converted =
    temperatureUnit === "F"
      ? celsiusToFahrenheit(
          value
        )
      : Number(value);

  return Math.round(
    converted
  );
}


function updateTemperatureDisplay() {
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

  updateTemperatureDisplay();

  renderFavorites();

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
    "Unitatea a fost schimbată",
    `Temperaturile sunt afișate în °${temperatureUnit}.`
  );
}


/* =====================================
   TEMĂ MANUALĂ
===================================== */

function updateThemeButton() {
  themeButton.textContent =
    manualDark
      ? "☀️"
      : "🌙";
}


function toggleManualTheme() {
  manualDark =
    !manualDark;

  localStorage.setItem(
    "manualDark",
    String(manualDark)
  );

  updateThemeButton();

  updateBodyClasses();

  updateChart();

  showToast(
    "info",
    manualDark
      ? "Mod întunecat"
      : "Mod luminos",
    "Tema aplicației a fost actualizată."
  );
}


/* =====================================
   DIRECȚIA VÂNTULUI
===================================== */

function getWindDirection(degrees) {
  if (!isValidNumber(degrees)) {
    return "--";
  }

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


/* =====================================
   LOADING
===================================== */

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
      ? "Se încarcă..."
      : "🔎 Caută";


  refreshIcon.classList.toggle(
    "spinning",
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
    "switching"
  );

  void weatherCard.offsetWidth;

  weatherCard.classList.add(
    "switching"
  );
}


/* =====================================
   STATISTICI
===================================== */

function createCityKey(
  latitude,
  longitude
) {
  return (
    `${Number(latitude).toFixed(3)},` +
    `${Number(longitude).toFixed(3)}`
  );
}


function updateStatistics(
  city,
  country,
  latitude,
  longitude,
  currentTemperature,
  minimumTemperature,
  maximumTemperature,
  countSearch
) {
  if (countSearch) {
    statistics.totalSearches +=
      1;

    statistics.lastSearch = {
      city,
      country,
      date:
        new Date().toISOString()
    };
  }

  const cityKey =
    createCityKey(
      latitude,
      longitude
    );

  const cityAlreadyExists =
    statistics.uniqueCities.some(
      function (item) {
        return item.key === cityKey;
      }
    );

  if (!cityAlreadyExists) {
    statistics.uniqueCities.push({
      key:
        cityKey,

      city,
      country
    });
  }

  const possibleMaximums = [
    currentTemperature,
    maximumTemperature
  ].filter(
    isValidNumber
  );

  const possibleMinimums = [
    currentTemperature,
    minimumTemperature
  ].filter(
    isValidNumber
  );

  const foundMaximum =
    possibleMaximums.length
      ? Math.max(
          ...possibleMaximums.map(
            Number
          )
        )
      : null;

  const foundMinimum =
    possibleMinimums.length
      ? Math.min(
          ...possibleMinimums.map(
            Number
          )
        )
      : null;

  if (
    foundMaximum !== null &&
    (
      statistics.maximumTemperature ===
        null ||
      foundMaximum >
        statistics.maximumTemperature
    )
  ) {
    statistics.maximumTemperature =
      foundMaximum;

    statistics.maximumCity =
      `${city}, ${country}`;
  }

  if (
    foundMinimum !== null &&
    (
      statistics.minimumTemperature ===
        null ||
      foundMinimum <
        statistics.minimumTemperature
    )
  ) {
    statistics.minimumTemperature =
      foundMinimum;

    statistics.minimumCity =
      `${city}, ${country}`;
  }

  saveStatistics();

  renderStatistics();
}


function renderStatistics() {
  totalSearchesStat.textContent =
    statistics.totalSearches;

  uniqueCitiesStat.textContent =
    statistics.uniqueCities.length;


  if (statistics.lastSearch) {
    lastSearchStat.textContent =
      `${statistics.lastSearch.city}, ` +
      `${statistics.lastSearch.country} · ` +
      `${formatDateTime(
        statistics.lastSearch.date
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
    statistics.maximumTemperature !==
    null
  ) {
    maximumTemperatureStat.textContent =
      convertTemperature(
        statistics.maximumTemperature
      );

    maximumCityStat.textContent =
      statistics.maximumCity ||
      "--";
  } else {
    maximumTemperatureStat.textContent =
      "--";

    maximumCityStat.textContent =
      "--";
  }


  if (
    statistics.minimumTemperature !==
    null
  ) {
    minimumTemperatureStat.textContent =
      convertTemperature(
        statistics.minimumTemperature
      );

    minimumCityStat.textContent =
      statistics.minimumCity ||
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

  statistics =
    getDefaultStatistics();

  saveStatistics();

  renderStatistics();

  showToast(
    "success",
    "Statistici resetate",
    "Statisticile locale au fost șterse."
  );
}


/* =====================================
   CALITATEA AERULUI
===================================== */

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
        "Nivelul poluării aerului este ridicat.",

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
      "Nivelul poluării este foarte ridicat.",

    icon:
      "☣️",

    className:
      "aqi-extreme",

    recommendation:
      "Evită activitățile în aer liber și ține ferestrele închise."
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
      "Datele despre aer sunt incomplete."
    );
  }

  currentAirQuality =
    current;

  const aqi =
    Math.round(
      Number(
        current.european_aqi
      )
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

  dashboardAqi.textContent =
    aqi;

  dashboardUv.textContent =
    formatNumber(
      uv,
      1
    );


  aqiBadge.className =
    `aqi-badge ${air.className}`;


  airQualityIconElement.textContent =
    air.icon;

  airQualityLabelElement.textContent =
    air.label;

  airQualityMessageElement.textContent =
    air.message;


  pm25Element.textContent =
    formatNumber(
      current.pm2_5,
      1
    );

  pm10Element.textContent =
    formatNumber(
      current.pm10,
      1
    );

  no2Element.textContent =
    formatNumber(
      current.nitrogen_dioxide,
      1
    );

  ozoneElement.textContent =
    formatNumber(
      current.ozone,
      1
    );

  carbonMonoxideElement.textContent =
    formatNumber(
      current.carbon_monoxide,
      0
    );


  uvIndexElement.textContent =
    formatNumber(
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
  currentAirQuality =
    null;

  aqiValueElement.textContent =
    "--";

  dashboardAqi.textContent =
    "--";

  dashboardUv.textContent =
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
  longitude,
  signal
) {
  const url =
    `https://air-quality-api.open-meteo.com/v1/air-quality` +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=european_aqi,pm2_5,pm10,nitrogen_dioxide,ozone,carbon_monoxide,uv_index` +
    `&timezone=auto`;

  try {
    const response =
      await fetch(
        url,
        {
          signal
        }
      );

    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}`
      );
    }

    const data =
      await response.json();

    displayAirQuality(data);

    return data;
  } catch (error) {
    if (
      error.name ===
      "AbortError"
    ) {
      throw error;
    }

    console.error(
      "Calitatea aerului:",
      error
    );

    resetAirQuality();

    showToast(
      "warning",
      "Calitatea aerului este indisponibilă",
      "Datele despre aer nu au putut fi încărcate."
    );

    return null;
  }
}


/* =====================================
   HARTA
===================================== */

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
        currentCity
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
  city
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
      `<strong>${escapeHtml(city)}</strong><br>` +
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


/* =====================================
   PROGNOZĂ ORARĂ
===================================== */

function getHourlyRange(hourly) {
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

  return {
    startIndex,

    endIndex:
      Math.min(
        startIndex + 24,
        hourly.time.length
      )
  };
}


function displayHourlyForecast(hourly) {
  currentHourlyWeather =
    hourly;

  hourlyContainer.innerHTML =
    "";

  const {
    startIndex,
    endIndex
  } =
    getHourlyRange(hourly);

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
        40
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

      <div
        class="icon"
        aria-hidden="true"
      >
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
            Number(
              hourly.wind_speed_10m[index]
              ?? 0
            )
          )
        } km/h
      </small>
    `;

    hourlyContainer.appendChild(
      card
    );
  }
}


/* =====================================
   PROGNOZĂ ZILNICĂ
===================================== */

function displayDailyForecast(daily) {
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
        `${index * 60}ms`;

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

        <div
          class="icon"
          aria-hidden="true"
        >
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


/* =====================================
   GRAFICE
===================================== */

function getChartData() {
  if (!currentHourlyWeather) {
    return null;
  }

  const {
    startIndex,
    endIndex
  } =
    getHourlyRange(
      currentHourlyWeather
    );

  return {
    labels:
      currentHourlyWeather.time
        .slice(
          startIndex,
          endIndex
        )
        .map(
          function (
            time,
            index
          ) {
            return index === 0
              ? "Acum"
              : formatTime(time);
          }
        ),

    temperature:
      currentHourlyWeather
        .temperature_2m
        .slice(
          startIndex,
          endIndex
        )
        .map(
          convertTemperature
        ),

    precipitation:
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
        ),

    humidity:
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
        ),

    wind:
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
        ),

    pressure:
      currentHourlyWeather
        .pressure_msl
        .slice(
          startIndex,
          endIndex
        )
        .map(
          function (value) {
            return Number(value) ||
              0;
          }
        ),

    visibility:
      currentHourlyWeather
        .visibility
        .slice(
          startIndex,
          endIndex
        )
        .map(
          function (value) {
            return (
              Number(value) /
              1000
            );
          }
        )
  };
}


function getChartSettings(
  type,
  data
) {
  const commonLineOptions = {
    borderWidth:
      3,

    tension:
      0.35,

    fill:
      true,

    pointRadius:
      3,

    pointHoverRadius:
      7
  };

  const settings = {
    temperature: {
      label:
        `Temperatură °${temperatureUnit}`,

      title:
        "Temperatura următoarelor 24 de ore",

      values:
        data.temperature,

      type:
        "line",

      dataset: {
        ...commonLineOptions,

        borderColor:
          "rgba(255,255,255,0.95)",

        backgroundColor:
          "rgba(255,255,255,0.12)",

        pointBackgroundColor:
          "rgba(255,255,255,1)"
      },

      beginAtZero:
        false
    },

    precipitation: {
      label:
        "Probabilitate %",

      title:
        "Probabilitatea precipitațiilor",

      values:
        data.precipitation,

      type:
        "bar",

      dataset: {
        borderWidth:
          1,

        borderRadius:
          7,

        borderColor:
          "rgba(125,211,252,1)",

        backgroundColor:
          "rgba(56,189,248,0.62)"
      },

      beginAtZero:
        true,

      suggestedMax:
        100
    },

    humidity: {
      label:
        "Umiditate %",

      title:
        "Umiditatea următoarelor 24 de ore",

      values:
        data.humidity,

      type:
        "line",

      dataset: {
        ...commonLineOptions,

        borderColor:
          "rgba(103,232,249,1)",

        backgroundColor:
          "rgba(103,232,249,0.12)",

        pointBackgroundColor:
          "rgba(103,232,249,1)"
      },

      beginAtZero:
        true,

      suggestedMax:
        100
    },

    wind: {
      label:
        "Vânt km/h",

      title:
        "Viteza vântului",

      values:
        data.wind,

      type:
        "line",

      dataset: {
        ...commonLineOptions,

        borderColor:
          "rgba(196,181,253,1)",

        backgroundColor:
          "rgba(196,181,253,0.12)",

        pointBackgroundColor:
          "rgba(196,181,253,1)"
      },

      beginAtZero:
        true
    },

    pressure: {
      label:
        "Presiune hPa",

      title:
        "Presiunea atmosferică",

      values:
        data.pressure,

      type:
        "line",

      dataset: {
        ...commonLineOptions,

        borderColor:
          "rgba(253,186,116,1)",

        backgroundColor:
          "rgba(253,186,116,0.12)",

        pointBackgroundColor:
          "rgba(253,186,116,1)"
      },

      beginAtZero:
        false
    },

    visibility: {
      label:
        "Vizibilitate km",

      title:
        "Vizibilitatea atmosferică",

      values:
        data.visibility,

      type:
        "line",

      dataset: {
        ...commonLineOptions,

        borderColor:
          "rgba(134,239,172,1)",

        backgroundColor:
          "rgba(134,239,172,0.12)",

        pointBackgroundColor:
          "rgba(134,239,172,1)"
      },

      beginAtZero:
        true
    }
  };

  return settings[type];
}


function updateChart() {
  if (
    typeof Chart ===
      "undefined" ||
    !currentHourlyWeather
  ) {
    return;
  }

  const data =
    getChartData();

  if (!data) {
    return;
  }

  const settings =
    getChartSettings(
      activeChartType,
      data
    );

  if (!settings) {
    return;
  }

  if (chart) {
    chart.destroy();
  }

  const styles =
    getComputedStyle(
      document.documentElement
    );

  const gridColor =
    styles
      .getPropertyValue(
        "--chart-grid"
      )
      .trim();

  const textColor =
    styles
      .getPropertyValue(
        "--chart-text"
      )
      .trim();

  chart =
    new Chart(
      chartCanvas,
      {
        type:
          settings.type,

        data: {
          labels:
            data.labels,

          datasets: [
            {
              label:
                settings.label,

              data:
                settings.values,

              ...settings.dataset
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
                settings.title,

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
                "rgba(15,23,42,0.96)",

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

                maxTicksLimit:
                  12,

                maxRotation:
                  0,

                autoSkip:
                  true
              },

              grid: {
                color:
                  gridColor
              }
            },

            y: {
              beginAtZero:
                settings.beginAtZero,

              suggestedMax:
                settings.suggestedMax,

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

  averageTemperatureElement.textContent =
    `${Math.round(
      calculateAverage(
        data.temperature
      )
    )}°${temperatureUnit}`;

  maximumRainChanceElement.textContent =
    `${Math.round(
      Math.max(
        ...data.precipitation
      )
    )}%`;

  averageHumidityElement.textContent =
    `${Math.round(
      calculateAverage(
        data.humidity
      )
    )}%`;

  maximumWindElement.textContent =
    `${Math.round(
      Math.max(
        ...data.wind
      )
    )} km/h`;
}


/* =====================================
   ALERTE METEO
===================================== */

function generateWeatherAlerts(
  weatherData,
  airData
) {
  const alerts =
    [];

  const current =
    weatherData.current;

  const hourly =
    weatherData.hourly;

  const daily =
    weatherData.daily;


  const first24RainValues =
    hourly
      .precipitation_probability
      .slice(
        0,
        24
      )
      .map(
        function (value) {
          return Number(value) ||
            0;
        }
      );

  const first24WindValues =
    hourly
      .wind_speed_10m
      .slice(
        0,
        24
      )
      .map(
        function (value) {
          return Number(value) ||
            0;
        }
      );


  const maximumRain =
    Math.max(
      ...first24RainValues
    );

  const maximumWind =
    Math.max(
      ...first24WindValues
    );

  const maximumTemperature =
    Number(
      daily.temperature_2m_max[0]
    );

  const minimumTemperature =
    Number(
      daily.temperature_2m_min[0]
    );


  if (maximumRain >= 70) {
    alerts.push({
      type:
        "warning",

      icon:
        "☔",

      title:
        "Probabilitate mare de ploaie",

      message:
        `Probabilitatea poate ajunge la ${Math.round(maximumRain)}%. Ia o umbrelă.`
    });
  }


  if (maximumWind >= 45) {
    alerts.push({
      type:
        "danger",

      icon:
        "💨",

      title:
        "Vânt puternic",

      message:
        `Viteza vântului poate ajunge la ${Math.round(maximumWind)} km/h.`
    });
  }


  if (maximumTemperature >= 35) {
    alerts.push({
      type:
        "danger",

      icon:
        "🔥",

      title:
        "Temperatură foarte ridicată",

      message:
        "Hidratează-te și evită expunerea prelungită la soare."
    });
  }


  if (minimumTemperature <= -5) {
    alerts.push({
      type:
        "warning",

      icon:
        "🥶",

      title:
        "Temperatură foarte scăzută",

      message:
        "Poartă îmbrăcăminte adecvată și verifică riscul de îngheț."
    });
  }


  const currentUv =
    Number(
      airData?.current
        ?.uv_index
    );

  if (
    isValidNumber(currentUv) &&
    currentUv >= 6
  ) {
    alerts.push({
      type:
        "warning",

      icon:
        "☀️",

      title:
        "Indice UV ridicat",

      message:
        `Indicele UV este ${currentUv.toFixed(1)}. Folosește protecție solară.`
    });
  }


  const currentAqi =
    Number(
      airData?.current
        ?.european_aqi
    );

  if (
    isValidNumber(currentAqi) &&
    currentAqi > 60
  ) {
    alerts.push({
      type:
        "danger",

      icon:
        "😷",

      title:
        "Calitate slabă a aerului",

      message:
        "Redu activitățile fizice intense în exterior."
    });
  }


  if (
    Number(
      current.weather_code
    ) >= 95
  ) {
    alerts.push({
      type:
        "danger",

      icon:
        "⛈️",

      title:
        "Furtună",

      message:
        "Evită zonele deschise și urmărește evoluția vremii."
    });
  }


  if (!alerts.length) {
    alerts.push({
      type:
        "success",

      icon:
        "✅",

      title:
        "Nu există alerte importante",

      message:
        "Condițiile actuale nu indică riscuri meteo majore."
    });
  }


  alertsContainer.innerHTML =
    "";

  alerts.forEach(
    function (alert) {
      const article =
        document.createElement(
          "article"
        );

      article.className =
        `weather-alert ${alert.type}`;

      article.innerHTML = `
        <span aria-hidden="true">
          ${alert.icon}
        </span>

        <div>
          <h3>
            ${escapeHtml(alert.title)}
          </h3>

          <p>
            ${escapeHtml(alert.message)}
          </p>
        </div>
      `;

      alertsContainer.appendChild(
        article
      );
    }
  );

  alertsSection.classList.remove(
    "hidden"
  );
}


/* =====================================
   FAVORITE ȘI ISTORIC
===================================== */

function citiesAreEqual(
  first,
  second
) {
  return (
    Math.abs(
      Number(first.latitude) -
      Number(second.latitude)
    ) <
      0.001 &&
    Math.abs(
      Number(first.longitude) -
      Number(second.longitude)
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
      currentTimezone,

    temperature:
      currentTemperatureCelsius,

    weatherCode:
      currentWeatherCode
  };
}


function updateFavoriteButton() {
  const currentCityObject =
    getCurrentCityObject();

  const favorite =
    favoriteCities.some(
      function (city) {
        return citiesAreEqual(
          city,
          currentCityObject
        );
      }
    );

  favoriteButton.textContent =
    favorite
      ? "★"
      : "☆";

  favoriteButton.classList.toggle(
    "active",
    favorite
  );

  favoriteButton.title =
    favorite
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
      `${city.name} a fost eliminat din lista de favorite.`
    );
  } else {
    favoriteCities.unshift(
      city
    );

    showToast(
      "success",
      "Adăugat la favorite",
      `${city.name} a fost salvat în lista de favorite.`
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


function renderFavorites() {
  favoritesContainer.innerHTML =
    "";

  if (!favoriteCities.length) {
    favoritesContainer.innerHTML = `
      <p class="empty-message">
        Nu ai orașe favorite.
      </p>
    `;

    return;
  }

  favoriteCities.forEach(
    function (city) {
      const button =
        document.createElement(
          "button"
        );

      button.type =
        "button";

      button.className =
        "smart-favorite";

      const visual =
        getWeatherVisual(
          city.weatherCode ??
          0
        );

      const temperature =
        isValidNumber(
          city.temperature
        )
          ? `${convertTemperature(
              city.temperature
            )}°`
          : "--";

      button.innerHTML = `
        <div>
          <strong>
            ${escapeHtml(city.name)}
          </strong>

          <small>
            ${escapeHtml(city.country)}
          </small>
        </div>

        <strong>
          ${visual.icon}
          ${temperature}
        </strong>
      `;

      button.addEventListener(
        "click",
        function () {
          loadAllData(
            city.latitude,
            city.longitude,
            city.name,
            city.country,
            true,
            "favorite"
          );
        }
      );

      favoritesContainer.appendChild(
        button
      );
    }
  );
}


function renderRecentCities() {
  recentContainer.innerHTML =
    "";

  if (!recentCities.length) {
    recentContainer.innerHTML = `
      <p class="empty-message">
        Nu există căutări recente.
      </p>
    `;

    return;
  }

  recentCities.forEach(
    function (city) {
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
            "recent"
          );
        }
      );

      recentContainer.appendChild(
        button
      );
    }
  );
}


/* =====================================
   CĂUTAREA ORAȘULUI
===================================== */

function hideSearchResults() {
  searchResults.classList.add(
    "hidden"
  );

  searchResults.innerHTML =
    "";
}


function displaySearchResults(results) {
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

      button.setAttribute(
        "role",
        "option"
      );

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
    showToast(
      "warning",
      "Numele orașului lipsește",
      "Introdu numele unui oraș."
    );

    cityInput.focus();

    return;
  }

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
      data.results ||
      []
    );

    if (
      !data.results ||
      !data.results.length
    ) {
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

    showToast(
      "error",
      "Eroare la căutare",
      "Localitatea nu a putut fi căutată."
    );
  } finally {
    searchButton.disabled =
      false;

    searchButton.textContent =
      "🔎 Caută";
  }
}


/* =====================================
   ÎNCĂRCAREA DATELOR METEO
===================================== */

async function loadWeather(
  latitude,
  longitude,
  city,
  country,
  saveToRecent,
  source,
  signal
) {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl,visibility` +
    `&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m,pressure_msl,visibility` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset` +
    `&forecast_days=7` +
    `&timezone=auto`;

  const response =
    await fetch(
      url,
      {
        signal
      }
    );

  if (!response.ok) {
    throw new Error(
      `HTTP ${response.status}`
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
    city;

  currentCountry =
    country;

  currentTimezone =
    data.timezone ||
    "Necunoscut";


  currentTemperatureCelsius =
    Number(
      data.current.temperature_2m
    );

  currentApparentTemperatureCelsius =
    Number(
      data.current.apparent_temperature
    );

  currentSunrise =
    data.daily.sunrise[0];

  currentSunset =
    data.daily.sunset[0];


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


  humidityElement.textContent =
    Math.round(
      Number(
        data.current
          .relative_humidity_2m
      )
    );

  precipitationElement.textContent =
    formatNumber(
      data.current.precipitation,
      1
    );

  windSpeedElement.textContent =
    Math.round(
      Number(
        data.current
          .wind_speed_10m
      )
    );

  windDirectionElement.textContent =
    getWindDirection(
      data.current
        .wind_direction_10m
    );

  windArrow.style.transform =
    `rotate(${
      Number(
        data.current
          .wind_direction_10m
      ) -
      90
    }deg)`;

  pressureElement.textContent =
    Math.round(
      Number(
        data.current.pressure_msl
      )
    );

  visibilityElement.textContent =
    formatNumber(
      Number(
        data.current.visibility
      ) /
      1000,
      1
    );

  sunriseElement.textContent =
    formatTime(
      currentSunrise
    );

  sunsetElement.textContent =
    formatTime(
      currentSunset
    );

  weatherTimeElement.textContent =
    formatTime(
      data.current.time
    );

  statusElement.textContent =
    getWeatherDescription(
      data.current.weather_code
    );


  updateTemperatureDisplay();

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


  const countSearch =
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
    countSearch
  );


  animateCityChange();

  updateChart();

  return data;
}


/* =====================================
   ÎNCĂRCAREA COMPLETĂ
===================================== */

async function loadAllData(
  latitude,
  longitude,
  city,
  country,
  saveToRecent = false,
  source = "search"
) {
  hideSearchResults();

  if (activeRequestController) {
    activeRequestController.abort();
  }

  activeRequestController =
    new AbortController();

  const {
    signal
  } =
    activeRequestController;

  setLoadingState(
    true
  );

  try {
    const [
      weatherData,
      airData
    ] =
      await Promise.all([
        loadWeather(
          latitude,
          longitude,
          city,
          country,
          saveToRecent,
          source,
          signal
        ),

        loadAirQuality(
          latitude,
          longitude,
          signal
        )
      ]);

    generateWeatherAlerts(
      weatherData,
      airData
    );


    const currentCityObject =
      getCurrentCityObject();

    const favoriteIndex =
      favoriteCities.findIndex(
        function (item) {
          return citiesAreEqual(
            item,
            currentCityObject
          );
        }
      );

    if (favoriteIndex >= 0) {
      favoriteCities[favoriteIndex] =
        currentCityObject;

      saveStoredArray(
        "favoriteCities",
        favoriteCities
      );

      renderFavorites();
    }


    showToast(
      "success",
      "Date actualizate",
      `Datele pentru ${city} au fost încărcate.`
    );
  } catch (error) {
    if (
      error.name ===
      "AbortError"
    ) {
      return;
    }

    console.error(
      "Încărcarea datelor:",
      error
    );

    showToast(
      "error",
      "Date indisponibile",
      navigator.onLine
        ? "Nu am putut încărca toate datele."
        : "Ești offline. Sunt utilizate datele salvate anterior."
    );
  } finally {
    if (!signal.aborted) {
      setLoadingState(
        false
      );

      locationButton.textContent =
        "📍 Folosește locația mea";
    }
  }
}


/* =====================================
   GEOLOCAȚIE
===================================== */

function useCurrentLocation() {
  if (
    !navigator.geolocation
  ) {
    showToast(
      "error",
      "Geolocația nu este disponibilă",
      "Browserul nu acceptă geolocația."
    );

    return;
  }

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

      showToast(
        "error",
        "Locația nu este disponibilă",
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


/* =====================================
   DISTRIBUIRE
===================================== */

async function shareWeather() {
  const weatherText =
    `${currentCity}, ${currentCountry}\n` +
    `${weatherIconElement.textContent} ` +
    `${convertTemperature(
      currentTemperatureCelsius
    )}°${temperatureUnit}\n` +
    `${getWeatherDescription(
      currentWeatherCode
    )}\n` +
    `AQI: ${
      currentAirQuality
        ?.european_aqi ??
      "--"
    }\n` +
    `UV: ${
      currentAirQuality
        ?.uv_index ??
      "--"
    }`;

  try {
    if (navigator.share) {
      await navigator.share({
        title:
          `Vremea în ${currentCity}`,

        text:
          weatherText,

        url:
          window.location.href
      });

      return;
    }

    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {
      await navigator.clipboard.writeText(
        weatherText
      );

      showToast(
        "success",
        "Prognoză copiată",
        "Informațiile meteo au fost copiate în clipboard."
      );

      return;
    }

    throw new Error(
      "Clipboard indisponibil."
    );
  } catch (error) {
    if (
      error.name ===
      "AbortError"
    ) {
      return;
    }

    console.error(
      "Distribuirea:",
      error
    );

    showToast(
      "error",
      "Distribuirea a eșuat",
      "Prognoza nu a putut fi distribuită."
    );
  }
}


/* =====================================
   REVEAL LA SCROLL
===================================== */

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
          0.1,

        rootMargin:
          "0px 0px -35px 0px"
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


/* =====================================
   PWA ȘI INSTALARE
===================================== */

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
      "Aplicația a fost instalată",
      "Weather App Pro a fost instalată cu succes."
    );
  }
}


/* =====================================
   STAREA CONEXIUNII
===================================== */

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


/* =====================================
   SERVICE WORKER
===================================== */

function showUpdateNotification(worker) {
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

    if (registration.waiting) {
      showUpdateNotification(
        registration.waiting
      );
    }

    registration.addEventListener(
      "updatefound",
      function () {
        const installingWorker =
          registration.installing;

        if (!installingWorker) {
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


/* =====================================
   EVENIMENTE
===================================== */

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
  toggleManualTheme
);


shareButton.addEventListener(
  "click",
  shareWeather
);


resetStatisticsButton.addEventListener(
  "click",
  resetStatistics
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


chartTabs.forEach(
  function (tab) {
    tab.addEventListener(
      "click",
      function () {
        activeChartType =
          tab.dataset.chart;

        chartTabs.forEach(
          function (item) {
            item.classList.toggle(
              "active",
              item === tab
            );
          }
        );

        updateChart();
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
      "Weather App Pro este instalată pe dispozitiv."
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


/* =====================================
   TRATAREA ERORILOR GLOBALE
===================================== */

function initializeGlobalErrorHandling() {
  window.addEventListener(
    "error",
    function (event) {
      console.error(
        "Eroare globală:",
        event.error ||
        event.message
      );
    }
  );

  window.addEventListener(
    "unhandledrejection",
    function (event) {
      console.error(
        "Promisiune respinsă:",
        event.reason
      );
    }
  );
}


/* =====================================
   PORNIREA APLICAȚIEI
===================================== */

function initializeApplication() {
  console.log(
    `Weather App Pro v${APPLICATION_VERSION}`
  );

  updateThemeButton();

  updateTemperatureDisplay();

  updateConnectionStatus();

  renderFavorites();

  renderRecentCities();

  renderStatistics();

  initializeMap();

  initializeRevealAnimations();

  initializeGlobalErrorHandling();

  registerServiceWorker();


  if (
    isApplicationInstalled()
  ) {
    document.body.classList.add(
      "app-installed"
    );

    hideInstallButtons();
  }


  window.addEventListener(
    "load",
    function () {
      document.documentElement.classList.add(
        "application-ready"
      );
    }
  );


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