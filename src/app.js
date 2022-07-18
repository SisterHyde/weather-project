// GET CURRENT DATE AND TIME
function getDate() {
  let now = new Date();
  let currentDay = now.getDay();
  let currentHour = now.getHours();
  let currentMinutes = now.getMinutes();

  function getFullMinutes() {
    //ADDING A ZERO IF MINUTES ARE UNDER 10
    if (currentMinutes < 10) {
      return `0${currentMinutes}`;
    } else {
      return `${currentMinutes}`;
    }
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  currentDay = days[currentDay];

  let updateTime = document.querySelector("#current-date");
  updateTime.innerHTML = `${currentDay}, ${currentHour}:${getFullMinutes(
    currentMinutes
  )}`;
}

// FETCH CITY DATA FROM API
function getCityData(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = `${response.data.name}, ${response.data.sys.country}`;

  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = `${Math.round(response.data.main.temp)} °F`;

  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let conditionElement = document.querySelector("#current-conditions");
  conditionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#current-humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#current-wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let dateElement = document.querySelector("#current-date");
  getDate();

  storeFahrenheit = response.data.main.temp;
}

function searchCity(city) {
  let apiKey = "87b9e142701e346ddd9ec0db3824a563";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(getCityData);
}

function searchInput(event) {
  event.preventDefault();
  let newCityElement = document.querySelector("#form-input");
  searchCity(newCityElement.value);
  newCityElement.value = null;
}

// SWITCHING BETWEEN CELSIUS AND FAHRENHEIT
function switchToCelsius(event) {
  let celsiusElement = document.querySelector("#current-temp");
  let celsiusTemp = ((storeFahrenheit - 32) * 5) / 9;
  celsiusElement.innerHTML = `${Math.round(celsiusTemp)} °C`;
  celsiusLink.classList.remove("text-primary", "pointer");
  fahrenheitLink.classList.add("text-primary", "pointer");
}

function switchToFahrenheit(event) {
  let fahrenheitElement = document.querySelector("#current-temp");
  fahrenheitElement.innerHTML = `${Math.round(storeFahrenheit)} °F`;
  fahrenheitLink.classList.remove("text-primary", "pointer");
  celsiusLink.classList.add("text-primary", "pointer");
}

// GLOBAL VARIABLE TO SUBMIT SEARCH INPUT INTO THE FORM
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchInput);

// GLOBAL VARIABLES FOR SWITCHING FROM °F TO °C
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", switchToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", switchToFahrenheit);

//DEFAULT STARTING CITY - HOW CAN I CHANGE THIS TO AUTO-DETECT?
searchCity("New York");
