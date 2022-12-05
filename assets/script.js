var APIkey = "c117587cfcafa1253c62bb6dccbc1226";

var searchFormEl = document.querySelector('#search-form');
var searchInputVal = document.querySelector('#search-input');
var SpotlightEl = document.querySelector("#spotlight");
var citylist = document.querySelector("#citybuttonlist");
var card = document.querySelectorAll(".card");
var carddateEL = document.querySelectorAll(".carddate");
var cardtempEL = document.querySelectorAll(".cardtemp");
var cardhumidityEL =document.querySelectorAll(".cardhumidity");
var cardwindEL = document.querySelectorAll(".cardwind");
var cardsymbolEL = document.querySelectorAll(".cardsymbol");
var todaydate = dayjs();
//spotlight vars
var spotdateEL = document.querySelector("#spotdate")
var spottempEL = document.querySelector("#spottemp")
var spothumidityEL = document.querySelector("#spothumidity")
var spotwindEL = document.querySelector("#spotwind")
var spoticonEL = document.querySelector("#spoticon")


//icon code "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png" 
//data.weather[0].icon is the code entered 

//added date to spotlight

spotdateEL.textContent = todaydate.format ('MMM DD, YYYY');



//for loop for dates in cards
for (let i = 1; i < 6; i++) {
    var carddateEL = document.querySelector("#carddate" + i);
    var newdate = todaydate.add(i, 'day');
    carddateEL.textContent = newdate.format ('MMM DD, YYYY')
}


//Submit button ID search
//Click event listener 
searchFormEl.addEventListener('submit', handleSearchFormSubmit);
function handleSearchFormSubmit(event) {
    event.preventDefault();
    const citysearched = searchInputVal.value;
    window.localStorage.setItem('city', citysearched);
    console.log(citysearched);
    getWeather(searchInputVal.value);
    createSearchBtn ();
    return;
  }

  //adding search buttons for city
  //add event listner for button to store data and call getweather by passing in the text of the button 
  function createSearchBtn () {
    const btn = document.createElement('button');
    btn.innerText = "New Button";
  citylist.appendChild(btn);
    btn.innerText = window.localStorage.getItem('city');
    return btn; 
  }
  
//gets weather
function getWeather (cityname) {
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
//temp
window.localStorage.setItem('temp', JSON.stringify(data.main.temp));
spottempEL.innerHTML = "";
spottempEL.textContent = data.main.temp;
//humidity
window.localStorage.setItem('humidity', JSON.stringify(data.main.humidity));
spothumidityEL.innerHTML = "";
spothumidityEL.textContent = data.main.humidity;
//wind
window.localStorage.setItem('wind', JSON.stringify(data.wind.speed));
spotwindEL.innerHTML = "";
spotwindEL.textContent = data.wind.speed;
//Icon

//calls forecast 
forecast(data.coord.lon,data.coord.lat)
})
}


function forecast (longitude, latitude){
    var URLAPI = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude+ "&appid=" + APIkey +"&units=imperial";

    fetch(URLAPI)
    .then(function(response){
        console.log("THIS IS RESPONSE: ",response)
        return response.json()
    })
    .then(function(data){
        console.log(data);
        for (var i= 0; i <data.list.length; i++) {
            if (data.list[i].dt_txt.indexOf("12:00:00") > 0){
                console.log(data.list[i])
            }
        }
    })

}
