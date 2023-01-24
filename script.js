// Global Variable
let searchHistory = [];

// DOM Variables
let searchBtn = document.getElementById('searchBtn');
let recentCityBtn = document.getElementById('recent-city-btn')
let searchHistoryContainer = document.getElementById('search-history-container');
let cityInputEl = document.getElementById('city-input');

// Timezone pluggins for day.js
dayjs.extend(window.js_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

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

function currentForecast(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=imperial&appid=5f03a7ebe75741bbe3cd6f91f18b0bd7")
    .then(function (response) {
        return response.json();
      })
    .then(function(data) {
        for (let i = 0; i < data.list.length; i+=8) {
            console.log(data.list[i])
        }
    })
}

function currentDay (lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=imperial&appid=5f03a7ebe75741bbe3cd6f91f18b0bd7")
    .then(function (response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
    })
}

function saveSearch (cityInput) {
    let city = cityInput.value;
    searchHistoryContainer.innerHTML = "";

    if (city !== '') {
        let searchHistory = JSON.parse(window.localStorage.getItem('searchHistory')) || [];

        searchHistory.push(city);
        window.localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    
        for (let i = searchHistory.length - 1; i >=0; i--) {
            let btn = document.createElement('button');
            btn.setAttribute('type', 'button');
            btn.setAttribute('id', 'recent-city-btn');

            btn.textContent = searchHistory[i];
            searchHistoryContainer.append(btn);
            
        }
    }
}

searchBtn.addEventListener('click', function(){
    let cityInput = document.getElementById('city-input').value;
    cityData(cityInput);
    saveSearch(cityInput);
});
 
recentCityBtn.addEventListener('click', function(){})

// local storage function create an array and then create for loop inside with create button and append page
