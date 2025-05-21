function updateWeather(response) {
  let cityElement = document.querySelector("#city-element");
  cityElement.innerHTML = response.data.city;

  let temperatureElement = document.querySelector("#temperature-element");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temperature;
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", weatherSearchSubmit);

searchCity("Sydney");
