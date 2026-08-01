const $ = (id) =>
  document.getElementById(id);

const cityInput = $("city-input");
const searchButton = $("search-button");
const searchResults = $("search-results");
const locationButton = $("location-button");

const weatherCard = $("weather-card");
const weatherContent = $("weather-content");
const weatherSkeleton = $("weather-skeleton");
const weatherEffects = $("weather-effects");
const toastContainer = $("toast-container");

const cityElement = $("city");
const countryElement = $("country");
const latitudeElement = $("latitude-value");
const longitudeElement = $("longitude-value");
const timezoneElement = $("timezone-value");

const temperatureElement = $("temperature");
const temperatureUnitElement = $("temperature-unit");
const apparentTemperatureElement =
  $("apparent-temperature");

const apparentUnitElement = $("apparent-unit");
const humidityElement = $("humidity");
const precipitationElement = $("precipitation");
const pressureElement = $("pressure");
const visibilityElement = $("visibility");
const sunriseElement = $("sunrise");
const sunsetElement = $("sunset");
const weatherTimeElement = $("weather-time");
const statusElement = $("status");

const windSpeedElement = $("wind-speed");
const windDirectionElement = $("wind-direction");
const windArrow = $("wind-arrow");

const dashboardUv = $("dashboard-uv");
const dashboardAqi = $("dashboard-aqi");
const dayStatus = $("day-status");

const refreshButton = $("refresh-button");
const refreshIcon = $("refresh-icon");
const favoriteButton = $("favorite-button");
const weatherIconElement = $("weather-icon");

const hourlyContainer = $("hourly-container");
const forecastContainer = $("forecast-container");
const hourlySkeleton = $("hourly-skeleton");
const dailySkeleton = $("daily-skeleton");

const favoritesContainer = $("favorites-container");
const recentContainer = $("recent-container");
const clearFavoritesButton =
  $("clear-favorites-button");

const clearRecentButton =
  $("clear-recent-button");

const unitButton = $("unit-button");
const themeButton = $("theme-button");
const shareButton = $("share-button");
const centerMapButton = $("center-map-button");
const scrollTopButton = $("scroll-top-button");

const alertsSection = $("alerts-section");
const alertsContainer = $("alerts-container");

const aqiBadge = $("aqi-badge");
const aqiValueElement = $("aqi-value");
const airQualityIconElement =
  $("air-quality-icon");

const airQualityLabelElement =
  $("air-quality-label");

const airQualityMessageElement =
  $("air-quality-message");

const pm25Element = $("pm25-value");
const pm10Element = $("pm10-value");
const no2Element = $("no2-value");
const ozoneElement = $("ozone-value");
const carbonMonoxideElement =
  $("carbon-monoxide-value");

const uvIndexElement = $("uv-index-value");
const uvLevelElement = $("uv-level");
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

const chartCanvas = $("weather-chart");
const chartSkeleton = $("chart-skeleton");
const chartTabs =
  document.querySelectorAll(".chart-tab");

const averageTemperatureElement =
  $("average-temperature");

const maximumRainChanceElement =
  $("maximum-rain-chance");

const averageHumidityElement =
  $("average-humidity");

const maximumWindElement =
  $("maximum-wind");

const installButton = $("install-button");
const secondaryInstallButton =
  $("secondary-install-button");

const connectionStatus =
  $("connection-status");

const connectionText =
  $("connection-text");

const updateNotification =
  $("update-notification");

const updateButton = $("update-button");

let currentLatitude = 44.4268;
let currentLongitude = 26.1025;
let currentCity = "București";
let currentCountry = "România";
let currentTimezone = "Europe/Bucharest";

let currentTemperatureCelsius = null;
let currentApparentTemperatureCelsius = null;
let currentWeatherCode = 0;
let currentWeatherClass = "weather-clear";

let currentHourlyWeather = null;
let currentDailyWeather = null;
let currentAirQuality = null;
let currentSunrise = null;
let currentSunset = null;

let map = null;
let marker = null;
let chart = null;
let activeChartType = "temperature";

let deferredInstallPrompt = null;
let waitingWorker = null;
let refreshing = false;

let temperatureUnit =
  localStorage.getItem("temperatureUnit") || "C";

let manualDark =
  localStorage.getItem("manualDark") === "true";

let favoriteCities =
  readArray("favoriteCities");

let recentCities =
  readArray("recentCities");

let statistics =
  readStatistics();

function readArray(key) {
  try {
    return JSON.parse(
      localStorage.getItem(key)
    ) || [];
  } catch {
    return [];
  }
}

function saveArray(key, value) {
  localStorage.setItem(
    key,
    JSON.stringify(value)
  );
}

function getDefaultStatistics() {
  return {
    totalSearches: 0,
    uniqueCities: [],
    lastSearch: null,
    maximumTemperature: null,
    maximumCity: null,
    minimumTemperature: null,
    minimumCity: null
  };
}

function readStatistics() {
  try {
    return {
      ...getDefaultStatistics(),
      ...JSON.parse(
        localStorage.getItem(
          "weatherStatistics"
        )
      )
    };
  } catch {
    return getDefaultStatistics();
  }
}

function saveStatistics() {
  localStorage.setItem(
    "weatherStatistics",
    JSON.stringify(statistics)
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

function showToast(
  type,
  title,
  message,
  duration = 4000
) {
  const icons = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️"
  };

  const toast =
    document.createElement("article");

  toast.className =
    `toast ${type}`;

  toast.innerHTML = `
    <span>${icons[type] || "ℹ️"}</span>

    <div>
      <strong>${escapeHtml(title)}</strong>
      <p>${escapeHtml(message)}</p>
    </div>

    <button type="button">×</button>
  `;

  toastContainer.appendChild(toast);

  const removeToast = () => {
    toast.remove();
  };

  toast
    .querySelector("button")
    .addEventListener(
      "click",
      removeToast
    );

  setTimeout(removeToast, duration);
}

function getWeatherDescription(code) {
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

  return descriptions[code] ||
    "Condiții necunoscute";
}

function getWeatherVisual(code) {
  if (code === 0) {
    return {
      icon: "☀️",
      className: "weather-clear",
      effect: "clear"
    };
  }

  if (code >= 1 && code <= 3) {
    return {
      icon: code === 1 ? "🌤️" : "☁️",
      className: "weather-cloudy",
      effect: "cloud"
    };
  }

  if (code === 45 || code === 48) {
    return {
      icon: "🌫️",
      className: "weather-fog",
      effect: "cloud"
    };
  }

  if (code >= 51 && code <= 67) {
    return {
      icon: "🌧️",
      className: "weather-rain",
      effect: "rain"
    };
  }

  if (code >= 71 && code <= 86) {
    return {
      icon: "❄️",
      className: "weather-snow",
      effect: "snow"
    };
  }

  if (code >= 95) {
    return {
      icon: "⛈️",
      className: "weather-storm",
      effect: "storm"
    };
  }

  return {
    icon: "🌤️",
    className: "weather-clear",
    effect: "clear"
  };
}

function isNightTime() {
  if (!currentSunrise || !currentSunset) {
    return false;
  }

  const now = new Date();
  const sunrise = new Date(currentSunrise);
  const sunset = new Date(currentSunset);

  return now < sunrise || now > sunset;
}

function updateBodyClasses() {
  const night = isNightTime();

  document.body.className =
    `${currentWeatherClass} ${
      night ? "nighttime" : "daytime"
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

  currentWeatherCode = code;
  currentWeatherClass =
    visual.className;

  weatherIconElement.textContent =
    visual.icon;

  updateBodyClasses();
  createWeatherEffects(
    visual.effect
  );
}

function clearWeatherEffects() {
  weatherEffects.innerHTML = "";
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
      document.createElement("div");

    lightning.className = "lightning";

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
      document.createElement("span");

    drop.className = "rain-drop";

    drop.style.left =
      `${Math.random() * 100}%`;

    drop.style.animationDuration =
      `${0.6 + Math.random()}s`;

    drop.style.animationDelay =
      `${Math.random() * 2}s`;

    weatherEffects.appendChild(drop);
  }
}

function createSnow(count) {
  for (
    let index = 0;
    index < count;
    index += 1
  ) {
    const flake =
      document.createElement("span");

    flake.className = "snow-flake";
    flake.textContent = "❄";

    flake.style.left =
      `${Math.random() * 100}%`;

    flake.style.fontSize =
      `${8 + Math.random() * 16}px`;

    flake.style.animationDuration =
      `${5 + Math.random() * 8}s`;

    flake.style.animationDelay =
      `${Math.random() * 5}s`;

    weatherEffects.appendChild(flake);
  }
}

function createClouds(count) {
  for (
    let index = 0;
    index < count;
    index += 1
  ) {
    const cloud =
      document.createElement("span");

    cloud.className = "animated-cloud";
    cloud.textContent = "☁";

    cloud.style.top =
      `${8 + index * 25}%`;

    cloud.style.animationDuration =
      `${28 + index * 10}s`;

    cloud.style.animationDelay =
      `${index * -9}s`;

    weatherEffects.appendChild(cloud);
  }
}

function createStars(count) {
  for (
    let index = 0;
    index < count;
    index += 1
  ) {
    const star =
      document.createElement("span");

    star.className = "star";

    star.style.left =
      `${Math.random() * 100}%`;

    star.style.top =
      `${Math.random() * 65}%`;

    star.style.animationDelay =
      `${Math.random() * 3}s`;

    weatherEffects.appendChild(star);
  }
}

function celsiusToFahrenheit(value) {
  return value * 9 / 5 + 32;
}

function convertTemperature(value) {
  if (
    value === null ||
    value === undefined
  ) {
    return "--";
  }

  const converted =
    temperatureUnit === "F"
      ? celsiusToFahrenheit(
          Number(value)
        )
      : Number(value);

  return Math.round(converted);
}

function updateTemperatureDisplay() {
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
}

function toggleManualTheme() {
  manualDark = !manualDark;

  localStorage.setItem(
    "manualDark",
    String(manualDark)
  );

  themeButton.textContent =
    manualDark ? "☀️" : "🌙";

  updateBodyClasses();
  updateChart();
}

function formatTime(value) {
  const date = new Date(value);

  if (
    Number.isNaN(date.getTime())
  ) {
    return "--";
  }

  return date.toLocaleTimeString(
    "ro-RO",
    {
      hour: "2-digit",
      minute: "2-digit"
    }
  );
}

function formatDay(value) {
  return new Date(
    `${value}T12:00:00`
  ).toLocaleDateString(
    "ro-RO",
    {
      weekday: "short"
    }
  );
}

function formatDate(value) {
  return new Date(
    `${value}T12:00:00`
  ).toLocaleDateString(
    "ro-RO",
    {
      day: "2-digit",
      month: "2-digit"
    }
  );
}

function formatDateTime(value) {
  if (!value) {
    return "Nicio căutare";
  }

  return new Date(value)
    .toLocaleString(
      "ro-RO",
      {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
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
    ((Number(degrees) % 360) + 360) %
    360;

  const index =
    Math.round(normalized / 45) % 8;

  return `${directions[index]} (${Math.round(
    normalized
  )}°)`;
}

function setLoadingState(isLoading) {
  searchButton.disabled = isLoading;
  refreshButton.disabled = isLoading;
  locationButton.disabled = isLoading;
  centerMapButton.disabled = isLoading;

  searchButton.textContent =
    isLoading
      ? "Se caută..."
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

function createCityKey(
  latitude,
  longitude
) {
  return `${Number(latitude).toFixed(
    3
  )},${Number(longitude).toFixed(3)}`;
}

function updateStatistics(
  city,
  country,
  latitude,
  longitude,
  currentTemperature,
  minimum,
  maximum,
  countSearch
) {
  if (countSearch) {
    statistics.totalSearches += 1;

    statistics.lastSearch = {
      city,
      country,
      date:
        new Date().toISOString()
    };
  }

  const key =
    createCityKey(
      latitude,
      longitude
    );

  const exists =
    statistics.uniqueCities.some(
      (item) => item.key === key
    );

  if (!exists) {
    statistics.uniqueCities.push({
      key,
      city,
      country
    });
  }

  const foundMaximum =
    Math.max(
      Number(currentTemperature),
      Number(maximum)
    );

  const foundMinimum =
    Math.min(
      Number(currentTemperature),
      Number(minimum)
    );

  if (
    statistics.maximumTemperature ===
      null ||
    foundMaximum >
      statistics.maximumTemperature
  ) {
    statistics.maximumTemperature =
      foundMaximum;

    statistics.maximumCity =
      `${city}, ${country}`;
  }

  if (
    statistics.minimumTemperature ===
      null ||
    foundMinimum <
      statistics.minimumTemperature
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
      statistics.maximumCity;
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
      statistics.minimumCity;
  } else {
    minimumTemperatureStat.textContent =
      "--";

    minimumCityStat.textContent =
      "--";
  }
}

function resetStatistics() {
  if (
    !window.confirm(
      "Sigur vrei să resetezi statisticile?"
    )
  ) {
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

function getAirInfo(aqi) {
  if (aqi <= 20) {
    return {
      label: "Aer bun",
      message:
        "Calitatea aerului este bună.",
      icon: "🌿",
      className: "aqi-good",
      recommendation:
        "Poți desfășura activități în aer liber."
    };
  }

  if (aqi <= 40) {
    return {
      label: "Aer acceptabil",
      message:
        "Calitatea aerului este acceptabilă.",
      icon: "🙂",
      className: "aqi-fair",
      recommendation:
        "Activitățile normale sunt potrivite."
    };
  }

  if (aqi <= 60) {
    return {
      label: "Aer moderat",
      message:
        "Persoanele sensibile pot resimți disconfort.",
      icon: "😐",
      className: "aqi-moderate",
      recommendation:
        "Persoanele sensibile să reducă efortul intens."
    };
  }

  if (aqi <= 80) {
    return {
      label: "Aer slab",
      message:
        "Nivelul poluării este ridicat.",
      icon: "😷",
      className: "aqi-poor",
      recommendation:
        "Redu activitățile fizice intense."
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
        "Limitează timpul petrecut afară."
    };
  }

  return {
    label: "Aer extrem de slab",
    message:
      "Nivelul poluării este foarte ridicat.",
    icon: "☣️",
    className: "aqi-extreme",
    recommendation:
      "Evită activitățile în aer liber."
  };
}

function getUvInfo(uv) {
  if (uv < 3) {
    return {
      level: "Scăzut",
      recommendation:
        "Protecția obișnuită este suficientă."
    };
  }

  if (uv < 6) {
    return {
      level: "Moderat",
      recommendation:
        "Folosește cremă cu protecție solară."
    };
  }

  if (uv < 8) {
    return {
      level: "Ridicat",
      recommendation:
        "Folosește SPF ridicat și evită expunerea prelungită."
    };
  }

  if (uv < 11) {
    return {
      level: "Foarte ridicat",
      recommendation:
        "Redu expunerea și folosește protecție completă."
    };
  }

  return {
    level: "Extrem",
    recommendation:
      "Evită expunerea directă la soare."
  };
}

function displayAirQuality(data) {
  const current = data.current;

  if (!current) {
    throw new Error(
      "Datele despre aer sunt incomplete."
    );
  }

  currentAirQuality = current;

  const aqi =
    Math.round(current.european_aqi);

  const uv =
    Number(current.uv_index);

  const air = getAirInfo(aqi);
  const uvInfo = getUvInfo(uv);

  aqiValueElement.textContent = aqi;
  dashboardAqi.textContent = aqi;

  aqiBadge.className =
    `aqi-badge ${air.className}`;

  airQualityIconElement.textContent =
    air.icon;

  airQualityLabelElement.textContent =
    air.label;

  airQualityMessageElement.textContent =
    air.message;

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
    uv.toFixed(1);

  dashboardUv.textContent =
    uv.toFixed(1);

  uvLevelElement.textContent =
    uvInfo.level;

  airRecommendationElement.textContent =
    air.recommendation;

  uvRecommendationElement.textContent =
    uvInfo.recommendation;
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
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}`
      );
    }

    const data = await response.json();

    displayAirQuality(data);

    return data;
  } catch (error) {
    console.error(
      "Calitatea aerului:",
      error
    );

    currentAirQuality = null;
    dashboardAqi.textContent = "--";
    dashboardUv.textContent = "--";

    showToast(
      "warning",
      "Date parțiale",
      "Calitatea aerului nu a putut fi încărcată."
    );

    return null;
  }
}

function initializeMap() {
  if (typeof L === "undefined") {
    return;
  }

  map =
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
  ).addTo(map);

  marker =
    L.marker(
      [
        currentLatitude,
        currentLongitude
      ]
    )
      .addTo(map)
      .bindPopup("București")
      .openPopup();

  map.on("click", (event) => {
    loadAllData(
      event.latlng.lat,
      event.latlng.lng,
      "Punct selectat",
      "Hartă interactivă",
      true,
      "map"
    );
  });

  setTimeout(
    () => map.invalidateSize(),
    250
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
      [latitude, longitude]
    )
    .bindPopup(
      `<strong>${escapeHtml(city)}</strong><br>` +
      `${Number(latitude).toFixed(4)}, ` +
      `${Number(longitude).toFixed(4)}`
    )
    .openPopup();

  map.setView(
    [latitude, longitude],
    9,
    {
      animate: true
    }
  );
}

function getHourlyRange(hourly) {
  const now = Date.now();

  let startIndex =
    hourly.time.findIndex(
      (value) =>
        new Date(value).getTime() >= now
    );

  if (startIndex === -1) {
    startIndex = 0;
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
  currentHourlyWeather = hourly;
  hourlyContainer.innerHTML = "";

  const {
    startIndex,
    endIndex
  } = getHourlyRange(hourly);

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
      document.createElement("article");

    card.className =
      `hour-card${
        index === startIndex
          ? " current"
          : ""
      }`;

    card.style.animationDelay =
      `${
        (index - startIndex) * 40
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
          hourly.precipitation_probability[
            index
          ] ?? 0
        }%
      </small>

      <small>
        💨 ${
          Math.round(
            hourly.wind_speed_10m[index]
          )
        } km/h
      </small>
    `;

    hourlyContainer.appendChild(card);
  }
}

function displayDailyForecast(daily) {
  currentDailyWeather = daily;
  forecastContainer.innerHTML = "";

  daily.time.forEach(
    (date, index) => {
      const visual =
        getWeatherVisual(
          daily.weather_code[index]
        );

      const card =
        document.createElement("article");

      card.className =
        `day-card${
          index === 0 ? " today" : ""
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

        <small>${formatDate(date)}</small>

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
                daily.temperature_2m_max[
                  index
                ]
              )
            }°
          </strong>

          <span>
            ${
              convertTemperature(
                daily.temperature_2m_min[
                  index
                ]
              )
            }°
          </span>
        </p>
      `;

      forecastContainer.appendChild(card);
    }
  );
}

function calculateAverage(values) {
  if (!values.length) {
    return 0;
  }

  return (
    values.reduce(
      (sum, value) =>
        sum + Number(value),
      0
    ) / values.length
  );
}

function getChartData() {
  if (!currentHourlyWeather) {
    return null;
  }

  const {
    startIndex,
    endIndex
  } = getHourlyRange(
    currentHourlyWeather
  );

  return {
    labels:
      currentHourlyWeather.time
        .slice(startIndex, endIndex)
        .map(
          (time, index) =>
            index === 0
              ? "Acum"
              : formatTime(time)
        ),

    temperature:
      currentHourlyWeather
        .temperature_2m
        .slice(startIndex, endIndex)
        .map(convertTemperature),

    precipitation:
      currentHourlyWeather
        .precipitation_probability
        .slice(startIndex, endIndex),

    humidity:
      currentHourlyWeather
        .relative_humidity_2m
        .slice(startIndex, endIndex),

    wind:
      currentHourlyWeather
        .wind_speed_10m
        .slice(startIndex, endIndex),

    pressure:
      currentHourlyWeather
        .pressure_msl
        .slice(startIndex, endIndex),

    visibility:
      currentHourlyWeather
        .visibility
        .slice(startIndex, endIndex)
        .map(
          (value) =>
            Number(value) / 1000
        )
  };
}

function getChartSettings(type, data) {
  const settings = {
    temperature: {
      label:
        `Temperatură °${temperatureUnit}`,
      title:
        "Temperatura următoarelor 24 de ore",
      values: data.temperature,
      type: "line",
      color:
        "rgba(255,255,255,0.95)",
      background:
        "rgba(255,255,255,0.12)",
      beginAtZero: false
    },

    precipitation: {
      label: "Probabilitate %",
      title:
        "Probabilitatea precipitațiilor",
      values: data.precipitation,
      type: "bar",
      color:
        "rgba(125,211,252,1)",
      background:
        "rgba(56,189,248,0.62)",
      beginAtZero: true,
      suggestedMax: 100
    },

    humidity: {
      label: "Umiditate %",
      title:
        "Umiditatea următoarelor 24 de ore",
      values: data.humidity,
      type: "line",
      color:
        "rgba(103,232,249,1)",
      background:
        "rgba(103,232,249,0.12)",
      beginAtZero: true,
      suggestedMax: 100
    },

    wind: {
      label: "Vânt km/h",
      title:
        "Viteza vântului",
      values: data.wind,
      type: "line",
      color:
        "rgba(196,181,253,1)",
      background:
        "rgba(196,181,253,0.12)",
      beginAtZero: true
    },

    pressure: {
      label: "Presiune hPa",
      title:
        "Presiunea atmosferică",
      values: data.pressure,
      type: "line",
      color:
        "rgba(253,186,116,1)",
      background:
        "rgba(253,186,116,0.12)",
      beginAtZero: false
    },

    visibility: {
      label: "Vizibilitate km",
      title:
        "Vizibilitatea atmosferică",
      values: data.visibility,
      type: "line",
      color:
        "rgba(134,239,172,1)",
      background:
        "rgba(134,239,172,0.12)",
      beginAtZero: true
    }
  };

  return settings[type];
}

function updateChart() {
  if (
    typeof Chart === "undefined" ||
    !currentHourlyWeather
  ) {
    return;
  }

  const data = getChartData();
  const settings =
    getChartSettings(
      activeChartType,
      data
    );

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
    new Chart(chartCanvas, {
      type: settings.type,

      data: {
        labels: data.labels,

        datasets: [
          {
            label: settings.label,
            data: settings.values,
            borderColor:
              settings.color,
            backgroundColor:
              settings.background,
            borderWidth: 3,
            borderRadius: 7,
            tension: 0.35,
            fill:
              settings.type === "line",
            pointRadius: 3,
            pointHoverRadius: 7
          }
        ]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,

        interaction: {
          intersect: false,
          mode: "index"
        },

        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          },

          title: {
            display: true,
            text: settings.title,
            color: textColor,
            font: {
              size: 17
            }
          }
        },

        scales: {
          x: {
            ticks: {
              color: textColor,
              maxTicksLimit: 12,
              maxRotation: 0
            },

            grid: {
              color: gridColor
            }
          },

          y: {
            beginAtZero:
              settings.beginAtZero,

            suggestedMax:
              settings.suggestedMax,

            ticks: {
              color: textColor
            },

            grid: {
              color: gridColor
            }
          }
        }
      }
    });

  averageTemperatureElement.textContent =
    `${Math.round(
      calculateAverage(
        data.temperature
      )
    )}°${temperatureUnit}`;

  maximumRainChanceElement.textContent =
    `${Math.max(
      ...data.precipitation
    )}%`;

  averageHumidityElement.textContent =
    `${Math.round(
      calculateAverage(
        data.humidity
      )
    )}%`;

  maximumWindElement.textContent =
    `${Math.round(
      Math.max(...data.wind)
    )} km/h`;
}

function generateWeatherAlerts(
  weatherData,
  airData
) {
  const alerts = [];

  const current =
    weatherData.current;

  const hourly =
    weatherData.hourly;

  const daily =
    weatherData.daily;

  const maximumRain =
    Math.max(
      ...hourly
        .precipitation_probability
        .slice(0, 24)
    );

  const maximumWind =
    Math.max(
      ...hourly
        .wind_speed_10m
        .slice(0, 24)
    );

  const maximumTemperature =
    daily.temperature_2m_max[0];

  const minimumTemperature =
    daily.temperature_2m_min[0];

  if (maximumRain >= 70) {
    alerts.push({
      type: "warning",
      icon: "☔",
      title:
        "Probabilitate mare de ploaie",
      message:
        `Probabilitatea poate ajunge la ${maximumRain}%. Ia o umbrelă.`
    });
  }

  if (maximumWind >= 45) {
    alerts.push({
      type: "danger",
      icon: "💨",
      title: "Vânt puternic",
      message:
        `Viteza vântului poate ajunge la ${Math.round(
          maximumWind
        )} km/h.`
    });
  }

  if (maximumTemperature >= 35) {
    alerts.push({
      type: "danger",
      icon: "🔥",
      title:
        "Temperatură foarte ridicată",
      message:
        "Hidratează-te și evită expunerea prelungită la soare."
    });
  }

  if (minimumTemperature <= -5) {
    alerts.push({
      type: "warning",
      icon: "🥶",
      title:
        "Temperatură foarte scăzută",
      message:
        "Poartă îmbrăcăminte adecvată și verifică riscul de îngheț."
    });
  }

  if (
    airData?.current?.uv_index >= 6
  ) {
    alerts.push({
      type: "warning",
      icon: "☀️",
      title: "Indice UV ridicat",
      message:
        `Indicele UV este ${Number(
          airData.current.uv_index
        ).toFixed(1)}. Folosește protecție solară.`
    });
  }

  if (
    airData?.current?.european_aqi >
    60
  ) {
    alerts.push({
      type: "danger",
      icon: "😷",
      title:
        "Calitate slabă a aerului",
      message:
        "Redu activitățile fizice intense în exterior."
    });
  }

  if (
    current.weather_code >= 95
  ) {
    alerts.push({
      type: "danger",
      icon: "⛈️",
      title: "Furtună",
      message:
        "Evită zonele deschise și urmărește evoluția vremii."
    });
  }

  if (!alerts.length) {
    alerts.push({
      type: "success",
      icon: "✅",
      title:
        "Nu există alerte importante",
      message:
        "Condițiile actuale nu indică riscuri meteo majore."
    });
  }

  alertsContainer.innerHTML = "";

  alerts.forEach((alert) => {
    const article =
      document.createElement("article");

    article.className =
      `weather-alert ${alert.type}`;

    article.innerHTML = `
      <span>${alert.icon}</span>

      <div>
        <h3>${escapeHtml(
          alert.title
        )}</h3>

        <p>${escapeHtml(
          alert.message
        )}</p>
      </div>
    `;

    alertsContainer.appendChild(
      article
    );
  });

  alertsSection.classList.remove(
    "hidden"
  );
}

function citiesAreEqual(
  first,
  second
) {
  return (
    Math.abs(
      first.latitude -
      second.latitude
    ) < 0.001 &&
    Math.abs(
      first.longitude -
      second.longitude
    ) < 0.001
  );
}

function getCurrentCityObject() {
  return {
    name: currentCity,
    country: currentCountry,
    latitude: currentLatitude,
    longitude: currentLongitude,
    timezone: currentTimezone,
    temperature:
      currentTemperatureCelsius,
    weatherCode:
      currentWeatherCode
  };
}

function updateFavoriteButton() {
  const current =
    getCurrentCityObject();

  const favorite =
    favoriteCities.some(
      (city) =>
        citiesAreEqual(city, current)
    );

  favoriteButton.textContent =
    favorite ? "★" : "☆";

  favoriteButton.classList.toggle(
    "active",
    favorite
  );
}

function toggleFavoriteCity() {
  const city =
    getCurrentCityObject();

  const index =
    favoriteCities.findIndex(
      (item) =>
        citiesAreEqual(item, city)
    );

  if (index >= 0) {
    favoriteCities.splice(index, 1);

    showToast(
      "info",
      "Eliminat din favorite",
      `${city.name} a fost eliminat.`
    );
  } else {
    favoriteCities.unshift(city);

    showToast(
      "success",
      "Adăugat la favorite",
      `${city.name} a fost salvat.`
    );
  }

  saveArray(
    "favoriteCities",
    favoriteCities
  );

  renderFavorites();
  updateFavoriteButton();
}

function addRecentCity(city) {
  recentCities =
    recentCities.filter(
      (item) =>
        !citiesAreEqual(item, city)
    );

  recentCities.unshift(city);

  recentCities =
    recentCities.slice(0, 6);

  saveArray(
    "recentCities",
    recentCities
  );

  renderRecentCities();
}

function renderFavorites() {
  favoritesContainer.innerHTML = "";

  if (!favoriteCities.length) {
    favoritesContainer.innerHTML =
      '<p class="empty-message">Nu ai orașe favorite.</p>';

    return;
  }

  favoriteCities.forEach((city) => {
    const button =
      document.createElement("button");

    button.type = "button";
    button.className =
      "smart-favorite";

    const visual =
      getWeatherVisual(
        city.weatherCode ?? 0
      );

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
        ${
          city.temperature !== null &&
          city.temperature !== undefined
            ? `${convertTemperature(
                city.temperature
              )}°`
            : "--"
        }
      </strong>
    `;

    button.addEventListener(
      "click",
      () => {
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
  });
}

function renderRecentCities() {
  recentContainer.innerHTML = "";

  if (!recentCities.length) {
    recentContainer.innerHTML =
      '<p class="empty-message">Nu există căutări recente.</p>';

    return;
  }

  recentCities.forEach((city) => {
    const button =
      document.createElement("button");

    button.type = "button";
    button.className = "chip";
    button.textContent =
      `${city.name}, ${city.country}`;

    button.addEventListener(
      "click",
      () => {
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
  });
}

function hideSearchResults() {
  searchResults.classList.add(
    "hidden"
  );

  searchResults.innerHTML = "";
}

function displaySearchResults(results) {
  searchResults.innerHTML = "";

  if (!results.length) {
    searchResults.innerHTML =
      '<p style="padding:16px;text-align:center">Nu a fost găsită nicio localitate.</p>';

    searchResults.classList.remove(
      "hidden"
    );

    return;
  }

  results.forEach((location) => {
    const button =
      document.createElement("button");

    button.type = "button";
    button.className =
      "search-result-button";

    const admin =
      location.admin1
        ? `, ${location.admin1}`
        : "";

    button.innerHTML = `
      <strong>
        ${escapeHtml(location.name)}
      </strong>

      <small>
        ${escapeHtml(
          location.country ||
          "Țară necunoscută"
        )}${escapeHtml(admin)}

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
      () => {
        hideSearchResults();
        cityInput.value = "";

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

    searchResults.appendChild(button);
  });

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
      "Oraș lipsă",
      "Introdu numele unui oraș."
    );

    cityInput.focus();

    return;
  }

  searchButton.disabled = true;
  searchButton.textContent =
    "Se caută...";

  try {
    const url =
      `https://geocoding-api.open-meteo.com/v1/search` +
      `?name=${encodeURIComponent(
        cityName
      )}` +
      `&count=5` +
      `&language=ro` +
      `&format=json`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}`
      );
    }

    const data = await response.json();

    displaySearchResults(
      data.results || []
    );
  } catch (error) {
    console.error(error);

    showToast(
      "error",
      "Eroare la căutare",
      "Localitatea nu a putut fi căutată."
    );
  } finally {
    searchButton.disabled = false;
    searchButton.textContent =
      "🔎 Caută";
  }
}

async function loadWeather(
  latitude,
  longitude,
  city,
  country,
  saveToRecent,
  source
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

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `HTTP ${response.status}`
    );
  }

  const data = await response.json();

  currentLatitude = Number(latitude);
  currentLongitude = Number(longitude);
  currentCity = city;
  currentCountry = country;
  currentTimezone =
    data.timezone || "Necunoscut";

  currentTemperatureCelsius =
    data.current.temperature_2m;

  currentApparentTemperatureCelsius =
    data.current.apparent_temperature;

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
      data.current
        .relative_humidity_2m
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

  windArrow.style.transform =
    `rotate(${
      Number(
        data.current
          .wind_direction_10m
      ) - 90
    }deg)`;

  pressureElement.textContent =
    Math.round(
      data.current.pressure_msl
    );

  visibilityElement.textContent =
    (
      Number(
        data.current.visibility
      ) / 1000
    ).toFixed(1);

  sunriseElement.textContent =
    formatTime(currentSunrise);

  sunsetElement.textContent =
    formatTime(currentSunset);

  weatherTimeElement.textContent =
    formatTime(data.current.time);

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

async function loadAllData(
  latitude,
  longitude,
  city,
  country,
  saveToRecent = false,
  source = "search"
) {
  hideSearchResults();
  setLoadingState(true);

  try {
    const [
      weatherData,
      airData
    ] = await Promise.all([
      loadWeather(
        latitude,
        longitude,
        city,
        country,
        saveToRecent,
        source
      ),

      loadAirQuality(
        latitude,
        longitude
      )
    ]);

    generateWeatherAlerts(
      weatherData,
      airData
    );

    updateFavoriteButton();

    const favoriteIndex =
      favoriteCities.findIndex(
        (item) =>
          citiesAreEqual(
            item,
            getCurrentCityObject()
          )
      );

    if (favoriteIndex >= 0) {
      favoriteCities[favoriteIndex] =
        getCurrentCityObject();

      saveArray(
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
    console.error(error);

    showToast(
      "error",
      "Date indisponibile",
      navigator.onLine
        ? "Nu am putut încărca datele."
        : "Ești offline. Sunt folosite datele din cache."
    );
  } finally {
    setLoadingState(false);

    locationButton.textContent =
      "📍 Folosește locația mea";
  }
}

function useCurrentLocation() {
  if (!navigator.geolocation) {
    showToast(
      "error",
      "Geolocație indisponibilă",
      "Browserul nu acceptă geolocația."
    );

    return;
  }

  locationButton.disabled = true;
  locationButton.textContent =
    "📍 Se caută locația...";

  navigator.geolocation
    .getCurrentPosition(
      (position) => {
        loadAllData(
          position.coords.latitude,
          position.coords.longitude,
          "Locația mea",
          "Poziție curentă",
          true,
          "location"
        );
      },

      (error) => {
        const messages = {
          1:
            "Permisiunea pentru locație a fost refuzată.",
          2:
            "Locația nu este disponibilă.",
          3:
            "Localizarea a durat prea mult."
        };

        showToast(
          "error",
          "Locație indisponibilă",
          messages[error.code] ||
            "Nu am putut determina locația."
        );

        locationButton.disabled =
          false;

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

async function shareWeather() {
  const text =
    `${currentCity}, ${currentCountry}\n` +
    `${weatherIconElement.textContent} ` +
    `${convertTemperature(
      currentTemperatureCelsius
    )}°${temperatureUnit}\n` +
    `${getWeatherDescription(
      currentWeatherCode
    )}\n` +
    `AQI: ${
      currentAirQuality?.european_aqi ??
      "--"
    }\n` +
    `UV: ${
      currentAirQuality?.uv_index ??
      "--"
    }`;

  try {
    if (navigator.share) {
      await navigator.share({
        title:
          `Vremea în ${currentCity}`,
        text,
        url:
          window.location.href
      });

      return;
    }

    await navigator.clipboard.writeText(
      text
    );

    showToast(
      "success",
      "Prognoză copiată",
      "Informațiile au fost copiate în clipboard."
    );
  } catch (error) {
    if (error.name !== "AbortError") {
      showToast(
        "error",
        "Distribuire eșuată",
        "Prognoza nu a putut fi distribuită."
      );
    }
  }
}

function initializeRevealAnimations() {
  const sections =
    document.querySelectorAll(
      ".reveal-section"
    );

  const observer =
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );
          }
        });
      },
      {
        threshold: 0.1
      }
    );

  sections.forEach(
    (section) =>
      observer.observe(section)
  );
}

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
      "Instalare",
      "Folosește opțiunea de instalare din browser."
    );

    return;
  }

  deferredInstallPrompt.prompt();

  await deferredInstallPrompt.userChoice;

  deferredInstallPrompt = null;

  hideInstallButtons();
}

function updateConnectionStatus() {
  const online = navigator.onLine;

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

async function registerServiceWorker() {
  if (
    !("serviceWorker" in navigator)
  ) {
    return;
  }

  try {
    const registration =
      await navigator.serviceWorker
        .register(
          "./service-worker.js"
        );

    if (registration.waiting) {
      waitingWorker =
        registration.waiting;

      updateNotification.classList.remove(
        "hidden"
      );
    }

    registration.addEventListener(
      "updatefound",
      () => {
        const worker =
          registration.installing;

        worker?.addEventListener(
          "statechange",
          () => {
            if (
              worker.state ===
                "installed" &&
              navigator.serviceWorker
                .controller
            ) {
              waitingWorker = worker;

              updateNotification
                .classList.remove(
                  "hidden"
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

searchButton.addEventListener(
  "click",
  searchCity
);

cityInput.addEventListener(
  "keydown",
  (event) => {
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
  (event) => {
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
  () => {
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
  () => {
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
        animate: true
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
  () => {
    favoriteCities = [];

    saveArray(
      "favoriteCities",
      favoriteCities
    );

    renderFavorites();
    updateFavoriteButton();
  }
);

clearRecentButton.addEventListener(
  "click",
  () => {
    recentCities = [];

    saveArray(
      "recentCities",
      recentCities
    );

    renderRecentCities();
  }
);

chartTabs.forEach((tab) => {
  tab.addEventListener(
    "click",
    () => {
      activeChartType =
        tab.dataset.chart;

      chartTabs.forEach(
        (item) =>
          item.classList.toggle(
            "active",
            item === tab
          )
      );

      updateChart();
    }
  );
});

scrollTopButton.addEventListener(
  "click",
  () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
);

window.addEventListener(
  "scroll",
  () => {
    scrollTopButton.classList.toggle(
      "visible",
      window.scrollY > 450
    );
  }
);

window.addEventListener(
  "beforeinstallprompt",
  (event) => {
    event.preventDefault();

    deferredInstallPrompt = event;

    showInstallButtons();
  }
);

window.addEventListener(
  "appinstalled",
  () => {
    deferredInstallPrompt = null;

    hideInstallButtons();

    document.body.classList.add(
      "app-installed"
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
  () => {
    updateConnectionStatus();

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
  () => {
    updateConnectionStatus();

    showToast(
      "warning",
      "Mod offline",
      "Unele date vor proveni din cache."
    );
  }
);

updateButton.addEventListener(
  "click",
  () => {
    waitingWorker?.postMessage({
      type: "SKIP_WAITING"
    });
  }
);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .addEventListener(
      "controllerchange",
      () => {
        if (refreshing) {
          return;
        }

        refreshing = true;

        window.location.reload();
      }
    );
}

function initializeApplication() {
  themeButton.textContent =
    manualDark ? "☀️" : "🌙";

  updateTemperatureDisplay();
  updateConnectionStatus();

  renderFavorites();
  renderRecentCities();
  renderStatistics();

  initializeMap();
  initializeRevealAnimations();
  registerServiceWorker();

  if (isApplicationInstalled()) {
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