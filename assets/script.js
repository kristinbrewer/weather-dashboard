var APIkey = "c117587cfcafa1253c62bb6dccbc1226";
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


var searchFormEl = document.querySelector('#search-form');
var searchInputVal = document.querySelector('#search-input');
var SpotlightEl = document.querySelector("#spotlight");

//added date to spotlight
function displayDate(){
    var todaydate = dayjs().format ('MMM DD, YYYY');
    SpotlightEl.textContent = todaydate + " " + "Today's weather is " + displaycity; //need to add weather text
    
}
//calling displayed time
displayDate();

//Submit button ID search
//Click event listener 
searchFormEl.addEventListener('click', handleSearchFormSubmit);
function handleSearchFormSubmit(event) {
    event.preventDefault();
    console.log(searchInputVal.value);
    getWeather(searchInputVal.value);
    localStorage.setItem("city", JSON.stringify(searchInputVal));
    var displaycity = JSON.parse(localStorage.getItem("city"));

  }

//adding new search button for city

function createSearchBtn () {
    searchFormEl.createElement('li');
    
}


function getWeather (cityname) {
//gets weather
console.log(cityname);
var URLAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + APIkey +"&units=imperial";

fetch(URLAPI)
.then(function(response){
    console.log("THIS IS RESPONSE: ",response)
    return response.json()
})
.then(function(data){
console.log("THIS IS DATA: ", data)
console.log(data.main.temp)
})
}
