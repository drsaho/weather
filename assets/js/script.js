//Apikey from openweather
const apiKey = '46d353ce29765dbac0983953dafd4b19';


document.getElementById('city-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const city = document.getElementById('city-input').value;
    getWeatherData(city);
    updateSearchHistory(city);
});


//accesing weather data

function getWeatherData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        })
        .then(response => response.json())
        .then(data => displayForecast(data));
}


//getting the current weather from api
function displayCurrentWeather(data) {
    const currentWeather = document.getElementById('current-weather');
    currentWeather.innerHTML = `
        <div class="weather-card">
            <h2>${data.name} (${new Date().toLocaleDateString()})</h2>
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Humidity: ${data.main.humidity} %</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        </div>
    `;
}



 //getting 5 day forecast
function displayForecast(data) {
    const forecast = document.getElementById('forecast');
    forecast.innerHTML = '<h2>5-Day Forecast</h2>';
    
    for (let i = 0; i < data.list.length; i += 8) {
        const day = data.list[i];
        forecast.innerHTML += `
            <div class="weather-card">
                <h3>${new Date(day.dt_txt).toLocaleDateString()}</h3>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
                <p>Temperature: ${day.main.temp} °C</p>
                <p>Humidity: ${day.main.humidity} %</p>
                <p>Wind Speed: ${day.wind.speed} m/s</p>
            </div>
        `;
    }
}
//search hisotory
document.getElementById('search-history').addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON') {
        const city = e.target.textContent;
        getWeatherData(city);
    }
});

function updateSearchHistory(city) {
    const history = document.getElementById('search-history');
    const button = document.createElement('button');
    button.textContent = city;
    history.appendChild(button);
}
