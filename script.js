let apiKey = "2c98ed9360d60319e8f6c81d7d8203bf";
let url = "https://api.openweathermap.org/data/2.5/weather?"
let forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?"

let tempElement = document.querySelector("#current-temp");
let cityElement = document.querySelector("#current-city");
let iconElement = document.querySelector("#icon-main");
let userInput = undefined; //set in Getcity()
let celsiusTemp = 0; //set in getTemp() or getLocationTemp()
//let fahrenheitTemp = (celsiusTemp * 9/5) + 32

function getForecast(coordinates) {
  axios.get(`${forecastUrl}lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`).then(displayForecast);
}

function getTemp(response) {
  celsiusTemp = Math.round(response.data.main.temp);
  tempElement.innerHTML = `${celsiusTemp}°`;
  getForecast(response.data.coord);
}

function getLocationTemp(response) {
  celsiusTemp = Math.round(response.data.main.temp);
  cityElement.innerHTML = `${response.data.name}`
  tempElement.innerHTML = `${celsiusTemp}°`;
  //iconElement.setAttribute();
}

// Set initial city temp

axios.get(`${url}q=manchester&units=metric&appid=${apiKey}&`).then(getTemp);

// Get city then temp from search bar input

function getCity(event) {
  event.preventDefault();
  let searchBar = document.querySelector("#search-bar");
  userInput = searchBar.value;
  cityElement.innerHTML = `${userInput.toUpperCase()}`;

  axios.get(`${url}q=${userInput}&units=metric&appid=${apiKey}&`).then(getTemp);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getCity);

// Get geolocation and location temp from "Current" button

function getPosition(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  
  axios.get(`${url}lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`).then(getLocationTemp);
  axios.get(`${forecastUrl}lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`).then(displayForecast);
}

let currentBtn = document.querySelector("#current-button");
currentBtn.addEventListener("click", getPosition);

// Display forecast HTML

function formatDay(dt) {
  let date = new Date(dt * 1000);
  let day = date.getDay();
  let forecastDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return forecastDays[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response.data.daily);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML = forecastHTML + 
        `<span class="day col-2">
           <p>${formatDay(forecastDay.dt)}</p>
           <p class="day-temp">${Math.round(forecastDay.temp.day)}°</p>
         </span>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

// Display todays date
let now = new Date();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];

let hour = now.getHours()
let minutes = now.getMinutes() <10 ?`0${now.getMinutes()}`: now.getMinutes()

let dayTimeElement = document.querySelector("#day-time");
dayTimeElement.innerHTML = `${day} ${hour}:${minutes}`;

/* Convert celsius to fahrenheit

function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  tempElement.innerHTML = `${fahrenheitTemp}°`;
}

function convertToCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  tempElement.innerHTML = `${celsiusTemp}°`;
}

let fahrenheitLink = document.querySelector ("#fahrenheit-link");
fahrenheitLink.addEventListener ("click", convertToFahrenheit);

let celsiusLink = document.querySelector ("#celsius-link");
celsiusLink.addEventListener ("click", convertToCelsius); */
