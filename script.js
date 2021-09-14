let apiKey = "2c98ed9360d60319e8f6c81d7d8203bf";
let url = "https://api.openweathermap.org/data/2.5/weather?"
let currentTemp = document.querySelector("#current-temp");
let currentCity = document.querySelector("#current-city");
let userInput = undefined; //set in Getcity()
let celsiusTemp = 0; //set in getTemp() or getLocationTemp()
let fahrenheitTemp = (celsiusTemp * 9/5) + 32

// Get city input from search bar and get city temp




function getCity(event) {
  event.preventDefault();
  let searchBar = document.querySelector("#search-bar");
  userInput = searchBar.value;
  currentCity.innerHTML = `${userInput.toUpperCase()}`;

  axios.get(`${url}q=${userInput}&units=metric&appid=${apiKey}&`).then(getTemp);
}

function getTemp(response) {
  celsiusTemp = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${celsiusTemp}°`;
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
  celsiusTemp = Math.round(response.data.main.temp);
  currentCity.innerHTML = `${response.data.name}`
  currentTemp.innerHTML = `${celsiusTemp}°`;
}

let currentBtn = document.querySelector("#current-button");
currentBtn.addEventListener("click", getPosition);

// Convert celsius to fahrenheit

function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  currentTemp.innerHTML = `${fahrenheitTemp}°`;
}

function convertToCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  currentTemp.innerHTML = `${celsiusTemp}°`;
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


// Set initial city temp
axios.get(`${url}q=manchester&units=metric&appid=${apiKey}&`).then(getTemp);



