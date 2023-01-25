// Global Variable
let searchHistory = JSON.parse(window.localStorage.getItem('searchHistory')) || [];
// DOM Variables
let searchBtn = document.getElementById('searchBtn');
// let recentCityBtn = document.getElementById('recent-city-btn')
let searchHistoryContainer = document.getElementById('search-history-container');
let cityInputEl = document.getElementById('city-input');
let currentDayEl = document.getElementById('current-day');
let multiForecast = document.getElementById('multi-day-forecast');


// Timezone pluggins for day.js
// dayjs.extend(window.js_plugin_utc);
// dayjs.extend(window.dayjs_plugin_timezone);

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
        console.log(data);
    })
}

function currentForecast(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=imperial&appid=5f03a7ebe75741bbe3cd6f91f18b0bd7")
    .then(function (response) {
        return response.json();
      })
    .then(function(data) {
        for (let i = 0; i < data.list.length; i+=8) {
            
        }
    })
}

function currentDay (lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=imperial&appid=5f03a7ebe75741bbe3cd6f91f18b0bd7")
    .then(function (response) {
        return response.json();
      })
      .then(function(data) {
       // displayToday(data)
    })
}

//function displayToday(data) {
//     tempTodayEl.innerHTML = data.main.temp + "°F"
//     humidityTodayEl.innerHTML = data.main.humidity + "%"
//     windCurrent.innerHTML = data.wind.speed + " " + "mph"
//     localStorage.setItem("cityInput", data);
//     console.log(weatherInfo);
// }

function onLoad () {
    // let searchHistory = JSON.parse(window.localStorage.getItem('searchHistory'))

    if (searchHistory.length !== 0) {
        for (let i = 0; i < 5; i++) {
            let liEl = document.createElement('li');
            let historyBtn = document.createElement('button');
            historyBtn.setAttribute('type', 'button');
            historyBtn.setAttribute('id', 'recent-city-btn');
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
}

function saveSearch (cityInput) {
    let city = cityInput.trim();
    searchHistoryContainer.innerHTML = "";

    if (city !== '') {

        searchHistory.push(city);
        window.localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    
    
        for (let i = 0; i < searchHistory.length; i++) {
            let liEl = document.createElement('li');
            let historyBtn = document.createElement('button');
            historyBtn.setAttribute('type', 'button');
            historyBtn.setAttribute('id', 'recent-city-btn');
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
}

searchBtn.addEventListener('click', function(){
    let cityInput = document.getElementById('city-input').value;
    console.log(cityInput);
    cityData(cityInput);
    saveSearch(cityInput);
});
 
onLoad();
// recentCityBtn.addEventListener('click', saveSearch);

// local storage function create an array and then create for loop inside with create button and append page
