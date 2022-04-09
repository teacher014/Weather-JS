const API_KEY = 'a37c9cb110fe3213e5f61c2471df9b86';
const COORDS = 'coords';

const weatherInfo = document.getElementById('weatherInfo');
//const weatherIcon = document.querySelector('.weatherIcon');
const weatherIconImg = document.getElementById('weatherIcon');

function init(){
  askForCoords();
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
}

function handleSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = { latitude, longitude };
  getWeather(latitude, longitude);  
}

function handleError(){
  //document.write("can'not access to location");
  console.log("can't not access to location");
}

function getWeather(lat, lon){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`).then(function(response){
    return response.json();
  })
  .then(function(json) {
    const temperature = json.main.temp;
    const place = json.name;
    const weatherDescription = json.weather[0].description;
    const weatherIcon = json.weather[0].icon;
    const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
  
    weatherInfo.innerHTML = `${Math.floor(temperature)}  &deg;C ℃ / @${place} / ${weatherDescription}`;
    weatherIconImg.setAttribute('src', weatherIconUrl);
  })
  .catch((error) => console.log("error", error));
}

init();