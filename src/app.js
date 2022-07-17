function getDate() {
  let now = new Date();
  let currentDay = now.getDay();
  let currentHour = now.getHours();
  let currentMinutes = now.getMinutes();

  //ADDING A ZERO IF MINUTES ARE UNDER 10
  function getFullMinutes() {
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
  console.log(updateTime);
}

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

  let dateElement = document.querySelector("#current-date");
  getDate();
}

let apiKey = "87b9e142701e346ddd9ec0db3824a563";
let city = "New York";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial`;
axios.get(`${apiUrl}&appid=${apiKey}`).then(getTemperature);
