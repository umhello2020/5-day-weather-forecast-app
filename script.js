// Global Variable
let searchHistory = JSON.parse(window.localStorage.getItem('searchHistory')) || [];

// DOM Variables
let searchBtn = document.getElementById('searchBtn');
let searchHistoryContainer = document.getElementById('search-history-container');
let cityInputEl = document.getElementById('city-input');
let currentDayEl = document.getElementById('current-day');
let multiForecast = document.getElementById('multi-day-forecast');
let tempTodayEl = document.getElementById('temp-today');
let humidityTodayEl = document.getElementById('humidity-today');
let windTodayEl = document.getElementById('wind-today');

// Plugins for timezones
// dayjs.extend(window.js_plugin_utc);
// dayjs.extend(window.dayjs_plugin_timezone);

// Loads search history to page upon load
function onLoad () {
    searchHistoryContainer.innerHTML = '';
    createHistoryBtn()
}

// Creates history buttons
function createHistoryBtn() {
    for (let i = 0; i < searchHistory.length; i++) {
        let liEl = document.createElement('li');
        let historyBtn = document.createElement('button');
        historyBtn.setAttribute('type', 'button');
        historyBtn.setAttribute('id', 'history-btn');
        historyBtn.setAttribute('data-value', searchHistory[i]);
        historyBtn.addEventListener('click', function (e) {
            if (e.target.dataset.value === searchHistory[i]) {
                console.log(e.target.dataset.value)
                cityData(searchHistory[i]);
                
                cityInputEl.value = searchHistory[i];
            }
        });
        
        historyBtn.textContent = searchHistory[i];
        liEl.appendChild(historyBtn);

        searchHistoryContainer.appendChild(liEl);
        
    }
}

// Retrieves coordinates from city input name
function cityData(city) {
 fetch("https://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid=5f03a7ebe75741bbe3cd6f91f18b0bd7")
    .then(function (response) {
        return response.json();
      })
    .then(function(data) {
        let currentLat = data[0].lat
        let currentLon = data[0].lon
        // currentDay(currentLat, currentLon)
        currentForecast(currentLat, currentLon);
    })
}

// Retrieves 5-day forecast from coordinates
function currentForecast(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=imperial&appid=5f03a7ebe75741bbe3cd6f91f18b0bd7")
    .then(function (response) {
        return response.json();
      })
    .then(function(data) {
        let todaysInfo = data.list[0];
        //displayToday(todaysInfo);
        console.log(todaysInfo);
        for (let i = 0; i < data.list.length; i+=8) {
            
        }
    })
}

// Displays current dates weather information
// function displayToday(todaysInfo) {
//     // let date = dayjs().format('M/D/YYYY');

//     let cityName = document.getElementById('city-name');
//     let city = cityInputEl.value
//     cityName.innerHTML = city.toUpperCase();

//     tempTodayEl.innerHTML = todaysInfo.main.temp + "°F"
//     humidityTodayEl.innerHTML = todaysInfo.main.humidity + "%"
//     windTodayEl.innerHTML = todaysInfo.wind.speed + " " + "mph"
// }

// function displayForecast()


function saveSearch (city) {
    let cityInput = city.trim();
    searchHistoryContainer.innerHTML = "";

    if (cityInput !== '') {

        searchHistory.push(cityInput);
        window.localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    
        createHistoryBtn();
    }
}

searchBtn.addEventListener('click', function(){
    let city = cityInputEl.value
    cityData(city);
    saveSearch(city);
});
 
onLoad();
