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
    "December"
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
    "Saturday"
  ];

  let day = padWithZero(days[givenDate.getDay()]);
  let hours = padWithZero(givenDate.getHours());
  let minutes = padWithZero(givenDate.getMinutes());

  return day + " " + hours + ":" + minutes;
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
function displayTemperature(response) {
  let cityResult = document.querySelector(".cityname");
  // let searchField = document.querySelector("#searchField");
  // (was used for getting cityname from searchfield.
  // but now we get it from the api response)
  let city = response.data.name;
  cityResult.innerHTML = city;
  let tempResult = document.querySelector(".temperature");
  tempResult.innerHTML = Math.round(response.data.main.temp) + "°C ";
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