const updateWeather = (weatherData) =>{
  for(let i=0;i<7;i++){
    const date = document.getElementsByClassName(`day ${i}`)
    const icon = document.getElementsByClassName(`weather-icon ${i}`)
    const max = document.getElementsByClassName(`max ${i}`)
    const min = document.getElementsByClassName(`min ${i}`)
    const actual = document.getElementsByClassName(`actual ${i}`)
    let iconUrl = weatherData.forecast.forecastday[i].day.condition.icon;
    icon[0].firstChild.src = `https://${iconUrl}`;
    date[0].firstChild.textContent = `${weatherData.forecast.forecastday[i].date.substring(5)}`;
    max[0].lastChild.textContent = `${weatherData.forecast.forecastday[i].day.maxtemp_c}°C`;
    min[0].lastChild.textContent = `${weatherData.forecast.forecastday[i].day.mintemp_c}°C`;
    // if(index == 0){
    //   actual[0].lastChild.textContent = `${weatherData.current.temp_c}°C`;
    // }
    updateLocationDOM(weatherData)
} 
  console.log(weatherData)
}

async function getWeather(location){
  const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=fd9968291ee44909811121131231704&q=${location}&days=7&aqi=no&alerts=no`, {mode: 'cors'})
  const weatherData = await response.json();
  return weatherData;
  // actual.textContent = `${weatherData.current.temp_c}°C`;
  // min.textContent = `${weatherData.forecast.forecastday[0].day.mintemp_c}°C`
  // max.textContent = `${weatherData.forecast.forecastday[0].day.maxtemp_c}°C`
}

const displayCards = () =>{
  i = 0;
  for (i;i<7;i++){
    const dayContainer = document.createElement('div');
    const iconContainer = document.createElement('div');
    iconContainer.classList = `weather-icon ${i}`;
    const maxContainer = document.createElement('div');
    maxContainer.classList = `max ${i}`;
    const minContainer = document.createElement('div');
    minContainer.classList = `min ${i}`;
    dayContainer.innerHTML = "<h1></h1>";
    dayContainer.classList = `day ${i}`;
    iconContainer.innerHTML = `<img id='weather-icon' scr=''></img>`;
    maxContainer.innerHTML = "<h2>Max</h2><h3></h3>";
    minContainer.innerHTML = "<h2>Min</h2><h3></h3>";
    const dayCard = document.createElement('div')
    dayCard.classList = `weather-card ${i}`;
    dayCard.appendChild(dayContainer);
    dayCard.appendChild(iconContainer);
    dayCard.appendChild(maxContainer);
    dayCard.appendChild(minContainer);
    // if(i == 0){
    //   const actualContainer = document.createElement('div');
    //   actualContainer.classList = `actual ${i}`;
    //   actualContainer.innerHTML = "<h2>Now</h2><h3>4</h3>";
    //   dayCard.appendChild(actualContainer);
    // }
    weatherContainer.appendChild(dayCard)
  }
}

const displayLocation = () => {
  const locationContainer = document.querySelector('.location-container');
  const city = document.createElement('h2');
  city.id = 'city'
  const region = document.createElement('h2');
  region.id = 'region'
  const country = document.createElement('h2');
  country.id = 'country'
  locationContainer.appendChild(city)
  locationContainer.appendChild(region)
  locationContainer.appendChild(country)
}

async function updateLocationDOM(weatherData){
  document.querySelector('#city').textContent = `${weatherData.location.name}, `
  document.querySelector('#region').textContent = `${weatherData.location.region}, `
  document.querySelector('#country').textContent = `${weatherData.location.country}`
}

const dropDownMenu = (dropDownMenuElement,dropDownMenuButton) =>{
  const dropDownMenu = document.querySelector(dropDownMenuElement);
  const dropDownButton = document.querySelector(dropDownMenuButton);
  dropDownButton.addEventListener('click', () =>{
      dropDownMenu.classList.toggle("invisible");
  });
}

async function getLocation(){
  const response = await fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=ac5315262a84431ca98e97e12f8c845f', {mode: 'cors'})
  const locationData = await response.json();
  return locationData;
}

async function defaultForecast(){
  const userLocation = await getLocation();
  const userLocationWeather = await getWeather(userLocation.city);
  updateWeather(userLocationWeather)
}

const content = document.querySelector('.content')
const weatherContainer = document.querySelector('.weather-container')
const searchBar = document.querySelector('.search-bar')
searchBar.addEventListener('blur',async ()=>{
  let weatherData = await getWeather(searchBar.value)
  updateWeather(weatherData);
});

dropDownMenu(".dropdown-menu","#dropdown-menu-button");
displayLocation();
displayCards();
defaultForecast();