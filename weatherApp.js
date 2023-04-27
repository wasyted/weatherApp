const getStarted = document.querySelector('#get-started');
const overlay = document.querySelector('.overlay');
getStarted.addEventListener('click', ()=>{
  overlay.classList.toggle('hidden');
})

const home = document.querySelector('#home');
const todayForecastContent = document.querySelector('.today-forecast');
home.addEventListener('click', ()=>{
  searchContent.classList.add('hidden');
  sevenDaysContent.classList.add('hidden');
  todayForecastContent.classList.remove('hidden');
  settingsContent.classList.add('hidden');
});

const search = document.querySelector('#search');
const searchContent = document.querySelector('.search-content');
search.addEventListener('click', ()=>{
  searchContent.classList.remove('hidden');
  sevenDaysContent.classList.add('hidden');
  todayForecastContent.classList.add('hidden');
  settingsContent.classList.add('hidden');
});

const sevenDays = document.querySelector('#seven-day');
const sevenDaysContent = document.querySelector('.seven-day-forecast');
sevenDays.addEventListener('click', ()=>{
  sevenDaysContent.classList.remove('hidden');
  todayForecastContent.classList.add('hidden');
  searchContent.classList.add('hidden');
  settingsContent.classList.add('hidden');
});

const settings = document.querySelector('#settings');
const settingsContent = document.querySelector('.settings-content ');
settings.addEventListener('click', ()=>{
  settingsContent.classList.remove('hidden');
  todayForecastContent.classList.add('hidden');
  searchContent.classList.add('hidden');
  sevenDaysContent.classList.add('hidden');
});

const dropDownMenuButton = document.querySelector('#dropdown-button');
const footer = document.querySelector('footer');
dropDownMenuButton.addEventListener('click', ()=>{
  footer.classList.toggle('hidden');
});

async function getWeather(location){
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=fd9968291ee44909811121131231704&q=${location}&days=7&aqi=no&alerts=no`/*, {mode: 'cors'}*/)
  const weatherData = await response.json();
  return weatherData;
}

async function getLocation(){
  const response = await fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=ac5315262a84431ca98e97e12f8c845f', {mode: 'cors'})
  const locationData = await response.json();
  console.log(locationData)
  return locationData;
}

async function defaultForecast(){
  const userLocation = await getLocation();
  const locationContainer = document.querySelector('#location-container');
  locationContainer.textContent = `${userLocation.city}, ${userLocation.region}`;
  const userLocationWeather = await getWeather(userLocation.city);
  updateWeather(userLocationWeather)
}

const updateWeather = (weatherData) =>{
  const weatherIcon = document.querySelector('#weather-icon');
  const todayMax = document.querySelectorAll('#today-max');
  const todayMin = document.querySelector('#today-min');
  const todayNow = document.querySelector('#today-now');
  const todayWind = document.querySelector('#today-wind');
  const todayHumidity = document.querySelector('#today-humidity');
  const todayRainChance = document.querySelector('#today-rain-chance');
  let weatherCondition = weatherData.current.condition.text;
  weatherIcon.src = checkWeatherCondition(weatherCondition);
  todayMax.textContent = `${weatherData.forecast.forecastday[0].day.maxtemp_c}°`;
  todayMin.textContent = `${weatherData.forecast.forecastday[0].day.mintemp_c}°`;
  todayNow.textContent = `${weatherData.current.temp_c}°`;
  todayWind.textContent = `${weatherData.current.wind_kph} km/h`;
  todayHumidity.textContent = `${weatherData.current.humidity}%`;
  todayRainChance.textContent = `${weatherData.current.precip_mm} mm`;
  console.log(weatherData);
}

const checkWeatherCondition = (weatherCondition) =>{
  let currentDate = new Date();
  while(currentDate.getHours() < 20 && currentDate.getHours() > 7){
    if(weatherCondition == 'Sunny'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Partly Cloudy'){
      return './src/weather/partly_cloudy_night_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Cloudy'){
      return './src/weather/cloudy_FILL0_wght400_GRAD0_opsz48';
    }
    if(weatherCondition == 'Overcast'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Mist'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Patchy rain possible'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Patchy snow possible'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Thundery outbreaks possible'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Blowing snow'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Blizzard'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Fog'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Freezing fog'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Patchy light drizzle'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Light drizzle'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Freezing drizzle'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Heavy freezing dreezle'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Patchy light rain'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Light rain'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Moderate rain at times'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Moderate rain'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Heavy rain at times'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Heavy rain'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Light freezing rain'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Moderate or heavy freezing rain'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Light sleet'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Moderate or heavy sleet'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Patchy light snow'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Light snow'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Patchy moderate snow'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Moderate snow'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Patchy heavy snow'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Heavy snow'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Ice pellets'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Light rain shower'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Moderate or heavy rain shower'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Torrential rain shower'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Light sleet shower'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Moderate or heavy sleet shower'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Light snow shower'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Moderate or heavy snow shower'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Light showers of ice pellets'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Moderate or heavy showers of ice pellets'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Patchy light rain with thunder'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Moderate or heavy rain with thunder'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Patchy light snow with thunder'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
    if(weatherCondition == 'Moderate or heavy snow with thunder'){
      return './src/weather/clear_day_FILL0_wght400_GRAD0_opsz48.svg';
    }
  }

}

defaultForecast();