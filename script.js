// Global Variable
let searchHistory = JSON.parse(window.localStorage.getItem('searchHistory')) || [];

// DOM Variables
let searchBtn = document.getElementById('searchBtn');
let searchHistoryContainer = document.getElementById('search-history-container');
let cityInputEl = document.getElementById('city-input');
let currentDayEl = document.getElementById('current-day');
let cityInfo = document.getElementById('city-info');
let multiForecast = document.getElementById('multi-day-forecast');

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
        historyBtn.setAttribute('type', 'submit');
        historyBtn.setAttribute('id', 'history-btn');
        historyBtn.setAttribute('data-value', searchHistory[i]);
        historyBtn.addEventListener('click', function (e) {
            if (e.target.dataset.value === searchHistory[i]) {
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
        currentDay(currentLat, currentLon)
        currentForecast(currentLat, currentLon);
    })
}

function currentDay(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=imperial&appid=5f03a7ebe75741bbe3cd6f91f18b0bd7")
    .then(function (response) {
        return response.json();
      })
    .then(function(data) {
        let todaysInfo = data;
        displayToday(todaysInfo);
    })
}

// Retrieves 5-day forecast from coordinates
function currentForecast(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=imperial&appid=5f03a7ebe75741bbe3cd6f91f18b0bd7")
    .then(function (response) {
        return response.json();
      })
    .then(function(data) { 
        let forecastInfo = data.list;
        displayForecast(forecastInfo);
    })
}

// Displays current dates weather information
function displayToday(todaysInfo) {
    let date = dayjs().format('M/D/YYYY');
    let tempEl = document.getElementById('temp');
    let windEl = document.getElementById('wind');
    let humidityEl = document.getElementById('humidity');
    cityInfo.display = 'none';

    let city = cityInputEl.value;
    cityInfo.textContent = city + '   ' + date;
    tempEl.textContent = 'Temp: ' + todaysInfo.main.temp + '°F';
    windEl.textContent = 'Wind:' + todaysInfo.wind.speed + 'mph';
    humidityEl.textContent = 'Humidity: ' + todaysInfo.main.humidity + '%';

}

// Displays 5-day forecast weather information
function displayForecast(forecastInfo) {
    let cardGroup = document.createElement('div');
    cardGroup.setAttribute('class', 'card-group');

    multiForecast.append(cardGroup);
    //for loop to cycle through the five days at noon
    for (let i = 4; i < forecastInfo.length; i+=8) {    
        // create card elements 
        let card = document.createElement('div');
        let cardBody = document.createElement('div');
        let cardTitle = document.createElement('h5');
        // let weatherIcon = document.createElement('img');
        let tempEl = document.createElement('p');
        let windEl = document.createElement('p');
        let humidityEl = document.createElement('p');

        // append new elements
        card.append(cardBody);
        cardBody.append(cardTitle, tempEl, windEl, humidityEl);

        // set classes for each new element
        card.setAttribute('class', 'card');
        cardBody.setAttribute('class', 'card-body');
        cardTitle.setAttribute('class', 'card-title');
        tempEl.setAttribute('class', 'card-text');
        windEl.setAttribute('class', 'card-text');
        humidityEl.setAttribute('class', 'card-text');


        // display content onto cards
        cardTitle.textContent = forecastInfo[i].dt_txt;
        tempEl.textContent = 'Temp: ' + forecastInfo[i].main.temp + '°F';
        windEl.textContent = 'Wind: ' + forecastInfo[i].wind.speed + 'mph';
        humidityEl.textContent = 'Humidity: ' + forecastInfo[i].main.humidity + '%';

        // append final card group
        multiForecast.append(card);

    }

}


function saveSearch (city) {
    let cityInput = city.trim();
    searchHistoryContainer.innerHTML = "";

    if (cityInput !== '' && !searchHistory.includes(cityInput)) {
        searchHistory.push(cityInput);
        window.localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }

    createHistoryBtn();
}

searchBtn.addEventListener('click', function(){
    let city = cityInputEl.value
    cityData(city);
    saveSearch(city);
});
 
onLoad();
