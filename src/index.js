function formatDate(givenDate) {
  // let days = [
  //   "Sunday",
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday"
  // ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Septemble",
    "October",
    "November",
    "December",
  ];

  //let day = days[givenDate.getDay()];
  let month = months[givenDate.getMonth()];
  let date = givenDate.getDate();
  let year = givenDate.getFullYear();
  //let hours = givenDate.getHours();
  //let minutes = givenDate.getMinutes();

  return month + " " + date + ", " + year;
}

console.log(formatDate(new Date("2022/06/07")));
console.log(formatDate(new Date()));

//
function formatTime(givenDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = padWithZero(days[givenDate.getDay()]);
  let hours = padWithZero(givenDate.getHours());
  let minutes = padWithZero(givenDate.getMinutes());

  return day + " " + hours + ":" + minutes;
}

function formatWeekday(givenDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Septemble",
    "October",
    "November",
    "December",
  ];

  let day = padWithZero(days[givenDate.getDay()]);
  let month = months[givenDate.getMonth()];
  let date = givenDate.getDate();

  return day + " " + month + " " + date;
}

function padWithZero(number) {
  return String(number).padStart(2, "0");
}

console.log(formatTime(new Date("2022/06/07")));
console.log(formatTime(new Date()));

let dateDiv = document.querySelector(".date");
dateDiv.innerHTML = formatDate(new Date());

let timeDiv = document.querySelector(".time");
timeDiv.innerHTML = formatTime(new Date());

//
function displayForecast(forecastResponse) {
  console.log("got forecast response:", forecastResponse);
  let forecastElement = document.querySelector(".forecast");

  let forecastHTML = "";
  let days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  forecastResponse.data.daily.forEach(function (day) {
    console.log(day);
    let date = formatWeekday(new Date(day.dt * 1000));
    let celciusMax = Math.round(day.temp.max);
    let celciusMin = Math.round(day.temp.min);
    let weatherEmoji = displayEmoji(day.weather[0].main);
    forecastHTML =
      forecastHTML +
      `<div class="col-9">${date}</div>
        <div class="col-3 weekdayTemp">
          <span class="high">${celciusMax}°C</span> 
          <span class="low">${celciusMin}°C</span> 
          ${weatherEmoji}
        </div>`;
  });

  forecastElement.innerHTML = forecastHTML;
}
//

function displayEmoji(weatherConditions) {
  let newEmoji = "";

  switch (weatherConditions) {
    case "Clear":
      newEmoji = "☀️";
      break;
    case "Thunderstorm":
      newEmoji = "⛈";
      break;
    case "Drizzle":
      newEmoji = "🌦";
      break;
    case "Rain":
      newEmoji = "☔️";
      break;
    case "Snow":
      newEmoji = "❄️";
      break;
    case "Mist":
      newEmoji = "💨";
      break;
    case "Fog":
      newEmoji = "🌫";
      break;
    case "Tornado":
      newEmoji = "🌪";
      break;
    case "Clouds":
      newEmoji = "☁️";
      break;

    default:
      newEmoji = "Did not find emoji for: " + weatherConditions;
  }
  return newEmoji;
}

function displayTemperature(response) {
  let cityResult = document.querySelector(".cityname");
  let city = response.data.name;
  cityResult.innerHTML = city;

  let weatherEmoji = displayEmoji(response.data.weather[0].main);

  let emoji = document.querySelector(".weatherIcon");
  emoji.innerHTML = weatherEmoji; //+ " " + response.data.weather[0].description;

  let tempResultC = document.querySelector(".temperatureC");
  tempResultC.innerHTML = Math.round(response.data.main.temp) + "°C ";

  let fahrenheitTemp = Math.round((response.data.main.temp * 9) / 5 + 32);

  let tempResultF = document.querySelector(".temperatureF");
  tempResultF.innerHTML =
    Math.round(response.data.main.temp) + fahrenheitTemp + "°F ";

  let metricResult = document.querySelector(".metrics");
  metricResult.innerHTML =
    " Current Max: " +
    Math.round(response.data.main.temp_max) +
    "°C " +
    " <br/> Current Min: " +
    Math.round(response.data.main.temp_min) +
    "°C " +
    " <br/> Humidity: " +
    Math.round(response.data.main.humidity) +
    "% " +
    " <br/> Wind Speed: " +
    Math.round(response.data.wind.speed) +
    "km/h ";

  console.log(response.data.coord);

  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;

  let apiKey = "f8c3365e92d7af34ccb10db1054b98ab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=metric`;

  console.log("making API query: ", apiUrl);

  // "https://api.openweathermap.org/data/2.5/weather?lat=" +
  // lat +
  // "&lon=" +
  // lon +
  // "&units=metric&appid=" +
  // apiKey;
  axios.get(apiUrl).then(displayForecast);
}

//
let searchEngine = document.querySelector(".search");
searchEngine.addEventListener("submit", function (event) {
  event.preventDefault();
  let searchField = document.querySelector("#searchField");
  let city = searchField.value;
  let apiKey = "f8c3365e92d7af34ccb10db1054b98ab";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=metric&appid=" +
    apiKey;
  axios.get(apiUrl).then(displayTemperature);
});

//
let currentLocation = document.querySelector(".currentLocationButton");
currentLocation.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("clicked!");
  navigator.geolocation.getCurrentPosition(showPosistion);
});

//
function showPosistion(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "f8c3365e92d7af34ccb10db1054b98ab";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=metric&appid=" +
    apiKey;
  axios.get(apiUrl).then(displayTemperature);
}
