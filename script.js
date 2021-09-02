// Get city input from search bar and get city temp
let apiKey = "2c98ed9360d60319e8f6c81d7d8203bf";
let url = "https://api.openweathermap.org/data/2.5/weather?"
let tempElement = document.querySelector("#current-temp");
let currentCity = document.querySelector("#current-city");

function getCity(event) {
  event.preventDefault();
  let searchBar = document.querySelector("#search-bar");
  userInput = searchBar.value;
  currentCity.innerHTML = `${userInput().toUpperCase()}`;

  axios.get(`${url}q=${userInput}&units=metric&appid=${apiKey}&`).then(getTemp);
}

function getTemp(response) {
  let temp = Math.round(response.data.main.temp);
  tempElement.innerHTML = `${temp}°C `;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getCity);

//get geolocation and get location temp

function getPosition(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  
  axios.get(`${url}lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`).then(getLocationTemp);
}

function getLocationTemp(response) {
  let temp = Math.round(response.data.main.temp);
  currentCity.innerHTML = `${response.data.name}`
  tempElement.innerHTML = `${temp}°C`;
}

let currentBtn = document.querySelector("#current-button");
currentBtn.addEventListener("click", getPosition);


// Display todays date
let now = new Date();

let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let day = days[now.getDay()];

let hour = now.getHours()
let minutes = now.getMinutes() <10 ?`0${now.getMinutes()}`: now.getMinutes()

let showDayTime = document.querySelector("#day-time");
showDayTime.innerHTML = `${day} ${hour}:${minutes}`;

/*convert celsius to fahrenheit?
function toFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = 66;
}

function toCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = 19;
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", toFahrenheit);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", toCelsius); */

