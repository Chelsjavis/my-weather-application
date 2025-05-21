function weatherSearchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-form-input");

  let cityElement = document.querySelector("#city-element");
  cityElement.innerHTML = city.value;
}

let searchFormElement = document.querySelector("#search-form");

searchFormElement.addEventListener("submit", weatherSearchSubmit);
