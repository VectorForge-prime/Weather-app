const $ = (id) =>
  document.getElementById(id);


const cityInput =
  $("city-input");

const searchButton =
  $("search-button");

const searchResults =
  $("search-results");

const locationButton =
  $("location-button");


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

const weatherTimeElement =
  $("weather-time");

const refreshButton =
  $("refresh-button");

const favoriteButton =
  $("favorite-button");

const weatherIconElement =
  $("weather-icon");


const hourlyContainer =
  $("hourly-container");

const forecastContainer =
  $("forecast-container");

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


let map;

let marker;

let deferredInstallPrompt =
  null;

let waitingWorker =
  null;


let temperatureUnit =
  localStorage.getItem(
    "temperatureUnit"
  ) || "C";

let darkMode =
  localStorage.getItem(
    "darkMode"
  ) === "true";

let favoriteCities =
  readArray(
    "favoriteCities"
  );

let recentCities =
  readArray(
    "recentCities"
  );


function readArray(key) {
  try {
    return (
      JSON.parse(
        localStorage.getItem(key)
      ) || []
    );
  } catch {
    return [];
  }
}


function saveArray(
  key,
  value
) {
  localStorage.setItem(
    key,
    JSON.stringify(value)
  );
}


function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll(
      '"',
      "&quot;"
    )
    .replaceAll(
      "'",
      "&#039;"
    );
}


function getWeatherDescription(
  code
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
    descriptions[code] ||
    "Condiții necunoscute"
  );
}


function getWeatherVisual(
  code
) {
  if (code === 0) {
    return {
      icon: "☀️",
      className:
        "weather-clear"
    };
  }

  if (
    code >= 1 &&
    code <= 3
  ) {
    return {
      icon: "☁️",
      className:
        "weather-cloudy"
    };
  }

  if (
    code === 45 ||
    code === 48
  ) {
    return {
      icon: "🌫️",
      className:
        "weather-fog"
    };
  }

  if (
    code >= 51 &&
    code <= 67
  ) {
    return {
      icon: "🌧️",
      className:
        "weather-rain"
    };
  }

  if (
    code >= 71 &&
    code <= 86
  ) {
    return {
      icon: "❄️",
      className:
        "weather-snow"
    };
  }

  if (code >= 95) {
    return {
      icon: "⛈️",
      className:
        "weather-storm"
    };
  }

  return {
    icon: "🌤️",
    className:
      "weather-clear"
  };
}


function updateBodyClasses() {
  document.body.className =
    currentWeatherClass;

  document.body.classList.toggle(
    "dark-mode",
    darkMode
  );
}


function updateWeatherVisual(
  code
) {
  const visual =
    getWeatherVisual(code);

  weatherIconElement.textContent =
    visual.icon;

  currentWeatherClass =
    visual.className;

  updateBodyClasses();
}


function celsiusToFahrenheit(
  value
) {
  return (
    value * 9 / 5 + 32
  );
}


function convertTemperature(
  value
) {
  const convertedValue =
    temperatureUnit === "F"
      ? celsiusToFahrenheit(value)
      : value;

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
  }

  if (currentDailyWeather) {
    displayDailyForecast(
      currentDailyWeather
    );
  }
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
}


function formatTime(value) {
  return new Date(
    value
  ).toLocaleTimeString(
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


function getWindDirection(
  degrees
) {
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
        degrees % 360
      ) + 360
    ) % 360;

  const index =
    Math.round(
      normalized / 45
    ) % 8;

  return (
    `${directions[index]} ` +
    `(${Math.round(normalized)}°)`
  );
}


function setLoadingState(
  isLoading
) {
  searchButton.disabled =
    isLoading;

  refreshButton.disabled =
    isLoading;

  locationButton.disabled =
    isLoading;

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
  statusElement.textContent =
    message;

  statusElement.classList.add(
    "error-message"
  );
}


function clearError() {
  statusElement.classList.remove(
    "error-message"
  );
}


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
    Number(
      current.pm2_5
    ).toFixed(1);

  pm10Element.textContent =
    Number(
      current.pm10
    ).toFixed(1);

  no2Element.textContent =
    Number(
      current.nitrogen_dioxide
    ).toFixed(1);

  ozoneElement.textContent =
    Number(
      current.ozone
    ).toFixed(1);

  carbonMonoxideElement.textContent =
    Math.round(
      current.carbon_monoxide
    );

  uvIndexElement.textContent =
    uv.toFixed(1);

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

  const elementsToReset = [
    pm25Element,
    pm10Element,
    no2Element,
    ozoneElement,
    carbonMonoxideElement,
    uvIndexElement
  ];

  elementsToReset.forEach(
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
  }
}


function initializeMap() {
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
        false
      );
    }
  );

  setTimeout(
    function () {
      map.invalidateSize();
    },
    200
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
      `${latitude.toFixed(4)}, ` +
      `${longitude.toFixed(4)}`
    )
    .openPopup();

  map.setView(
    [
      latitude,
      longitude
    ],
    9,
    {
      animate: true
    }
  );
}


function displayHourlyForecast(
  hourly
) {
  currentHourlyWeather =
    hourly;

  hourlyContainer.innerHTML =
    "";

  const now =
    Date.now();

  let startIndex =
    hourly.time.findIndex(
      function (value) {
        return (
          new Date(value).getTime() >=
          now
        );
      }
    );

  if (startIndex === -1) {
    startIndex = 0;
  }

  const endIndex =
    Math.min(
      startIndex + 24,
      hourly.time.length
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
    `;

    hourlyContainer.appendChild(
      card
    );
  }
}


function displayDailyForecast(
  daily
) {
  currentDailyWeather =
    daily;

  forecastContainer.innerHTML =
    "";

  daily.time.forEach(
    function (date, index) {
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
}


function toggleFavoriteCity() {
  const city =
    getCurrentCityObject();

  const index =
    favoriteCities.findIndex(
      function (item) {
        return citiesAreEqual(
          item,
          city
        );
      }
    );

  if (index >= 0) {
    favoriteCities.splice(
      index,
      1
    );
  } else {
    favoriteCities.unshift(
      city
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

  saveArray(
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
          padding: 15px;
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

      const admin =
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
          }${escapeHtml(admin)}

          · ${location.latitude.toFixed(3)},
          ${location.longitude.toFixed(3)}
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
            true
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

  setLoadingState(true);

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


async function loadWeather(
  latitude,
  longitude,
  cityName,
  countryName,
  saveToRecent
) {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m` +
    `&hourly=temperature_2m,weather_code,precipitation_probability` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset` +
    `&forecast_days=7` +
    `&timezone=auto`;

  const response =
    await fetch(url);

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
      "Date meteo incomplete."
    );
  }

  currentLatitude =
    latitude;

  currentLongitude =
    longitude;

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

  hourlyContainer.innerHTML =
    "<p>Se încarcă prognoza orară...</p>";

  forecastContainer.innerHTML =
    "<p>Se încarcă prognoza...</p>";

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
      "Încărcare:",
      error
    );

    showError(
      navigator.onLine
        ? "Nu am putut încărca toate datele."
        : "Ești offline. Sunt folosite datele disponibile în cache."
    );
  } finally {
    setLoadingState(false);

    locationButton.textContent =
      "📍 Folosește locația mea";
  }
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
        false
      );
    },

    function (error) {
      const messages = {
        1:
          "Permisiunea pentru locație a fost refuzată.",

        2:
          "Locația nu este disponibilă.",

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
    return;
  }

  deferredInstallPrompt.prompt();

  await deferredInstallPrompt.userChoice;

  deferredInstallPrompt =
    null;

  hideInstallButtons();
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
      "serviceWorker" in navigator
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
        const installing =
          registration.installing;

        if (!installing) {
          return;
        }

        installing.addEventListener(
          "statechange",
          function () {
            if (
              installing.state ===
                "installed" &&
              navigator.serviceWorker.controller
            ) {
              showUpdateNotification(
                installing
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
      false
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
  toggleTheme
);


clearFavoritesButton.addEventListener(
  "click",
  function () {
    favoriteCities =
      [];

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
  function () {
    recentCities =
      [];

    saveArray(
      "recentCities",
      recentCities
    );

    renderRecentCities();
  }
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

    loadAllData(
      currentLatitude,
      currentLongitude,
      currentCity,
      currentCountry,
      false
    );
  }
);


window.addEventListener(
  "offline",
  updateConnectionStatus
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


let refreshing =
  false;


if (
  "serviceWorker" in navigator
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


updateThemeButton();
updateBodyClasses();
updateCurrentTemperatures();
updateConnectionStatus();

renderFavorites();
renderRecentCities();

initializeMap();
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
  false
);
