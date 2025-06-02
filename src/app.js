function updateWeather(response) {
  let cityElement = document.querySelector("#city-element");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#temperature-icon");
  let iconUrl = response.data.condition.icon_url;

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${iconUrl}">`;

  let temperatureElement = document.querySelector("#temperature-element");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temperature;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}, `;
}

function searchCity(city) {
  let apiKey = "1894f4b60349tcab94fb26933d94a5o1";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
}

function weatherSearchSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-form-input");
  searchCity(cityInput.value);
}

function displayForecast(response) {
  console.log(response.data);

  let days = ["Mon", "Tues", "Wed", "Thu", "Fri"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
    <div class="forecast-days">
      <div class="forecast-day">${day}</div>
      <div class="forecast-icon">🌥️</div>
      <div class="forecast-temperatures">
        <div class="forecast-temp">
          <strong>27</strong>°
        </div>
        <div class="forecast-temp">15°</div>
      </div>
    </div>`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function getForecast(city) {
  let apiKey = "1894f4b60349tcab94fb26933d94a5o1";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", weatherSearchSubmit);

searchCity("Sydney");
displayForecast();
