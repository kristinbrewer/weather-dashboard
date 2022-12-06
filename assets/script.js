var APIkey = "c117587cfcafa1253c62bb6dccbc1226";
//form vars
var searchFormEl = document.querySelector('#search-form');
var searchInputVal = document.querySelector('#search-input');
var SpotlightEl = document.querySelector("#spotlight");
var citylist = document.querySelector("#citybuttonlist");
var searchbuttonEL= document.querySelector('#searchbutton')
//card vars
var card = document.querySelectorAll(".card");
var carddateEL = document.querySelector(".carddate ");
var todaydate = dayjs();
//spotlight vars
var spotdateEL = document.querySelector("#spotdate")
var spottempEL = document.querySelector("#spottemp")
var spothumidityEL = document.querySelector("#spothumidity")
var spotwindEL = document.querySelector("#spotwind")
var spoticonEL = document.querySelector("#spoticon")


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
    citylist.appendChild(btn);
    var searchcity = window.localStorage.getItem('city');
    btn.innerText = searchcity;
      //event listener for button
   btn.addEventListener('click',function (event) {handleSearchHistory(event, searchcity)});
   function handleSearchHistory (event, city) {
////stopped here
  // searchhistory();
  getWeather(city);
   ///call storage functions 

   }
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
spoticonEL.innerHTML = "<img src = https://openweathermap.org/img/w/" + data.weather[0].icon + ".png>";
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
                  //for loop to add forecast data to cards 
    for (let i =1; i<6; i++) {
        //temperature
        var cardtempEL = document.querySelector("#cardtemp" + i);
        cardtempEL.innerHTML = "";
        cardtempEL.textContent = data.list[i].main.temp;
        //humidity
        var cardhumidityEL =document.querySelector("#cardhumidity" + i);
        cardhumidityEL.innerHTML = "";
        cardhumidityEL.textContent = data.list[i].main.humidity;
        //wind
        var cardwindEL = document.querySelector("#cardwind" + i);
        cardwindEL.innerHTML = "";
        cardwindEL.textContent = data.list[i].wind.speed;
        //icon
        var cardsymbolEL = document.querySelector("#cardsymbol" + i);
        cardsymbolEL.innerHTML = "<img src = https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png>";
    }
            }

        }
       

    })

}

//adding cities to an array
var pastsearchEL = document.querySelector("#pastsearch");
function searchhistory () {
    let cities = [];
    let pastcities = localStorage.getItem("citylist");
    if (pastcities == null) {
        cities.push(pastsearchEL.textContent);
    }
    else {
        pastcities = JSON.parse(pastcities);
        pastcities = push(pastsearchEL.textContent);
        cities = pastcities;
    }
    localStorage.setItem("citylist", JSON.stringify(cities))
    showsearchedhistory();
}
//putting buttons on page 
function showsearchedhistory() {
    let cities = localStorage.getItem("citylist");
    if (cities !=null) {
        cities = JSON.parse(cities);
        cities = cities.reverse();
        if (cities.length > 5){
            cities = cities.slice (0,5);
        };
    
        let list = "";
        
        pastsearchEL.innerHTML = list;
        createSearchBtn();
    }
    
    }
showsearchedhistory();