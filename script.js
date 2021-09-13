// Get city input from search bar and get city temp
let apiKey = "2c98ed9360d60319e8f6c81d7d8203bf";
let url = "https://api.openweathermap.org/data/2.5/weather?"
let currentTemp = document.querySelector("#current-temp");
let currentCity = document.querySelector("#current-city");
let userInput = null; //set in Getcity()
let celsiusTemp = null; //set in getTemp() or getLocationTemp()

function getCity(event) {
  event.preventDefault();
  let searchBar = document.querySelector("#search-bar");
  userInput = searchBar.value;
  currentCity.innerHTML = `${userInput.toUpperCase()}`;

  axios.get(`${url}q=${userInput}&units=metric&appid=${apiKey}&`).then(getTemp);
}

function getTemp(response) {
  let celsiusTemp = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${celsiusTemp}°C `;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getCity);

//get geolocation and get location temp

function getCurrentPosition(){
  navigator.geolocation.getCurrentPosition(showPosition);
}

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
  let celsiusTemp = Math.round(response.data.main.temp);
  currentCity.innerHTML = `${response.data.name}`
  currentTemp.innerHTML = `${celsiusTemp}°C`;
}

let currentBtn = document.querySelector("#current-button");
currentBtn.addEventListener("click", getPosition);



// Convert celsius to fahrenheit
function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9/5) + 32
  alert(fahrenheitTemp);
}

function convertToCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  alert(celsiusTemp);
}

let fahrenheitLink = document.querySelector ("#fahrenheit-link");
fahrenheitLink.addEventListener ("click", convertToFahrenheit);

let celsiusLink = document.querySelector ("#celsius-link");
celsiusLink.addEventListener ("click", convertToCelsius);

// Display todays date
let now = new Date();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];

let hour = now.getHours()
let minutes = now.getMinutes() <10 ?`0${now.getMinutes()}`: now.getMinutes()

let showDayTime = document.querySelector("#day-time");
showDayTime.innerHTML = `${day} ${hour}:${minutes}`;


// set current location
getCurrentPosition();

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

