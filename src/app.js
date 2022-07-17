//FETCHING WEATHER FROM API

function getTemperature(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.name;

  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = Math.round(response.data.main.temp);

  let conditionElement = document.querySelector("#current-conditions");
  conditionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#current-humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#current-wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "87b9e142701e346ddd9ec0db3824a563";
let city = "New York";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial`;
axios.get(`${apiUrl}&appid=${apiKey}`).then(getTemperature);
