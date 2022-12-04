var APIkey = "c117587cfcafa1253c62bb6dccbc1226";
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


var searchFormEl = document.querySelector('#search-form');
var searchInputVal = document.querySelector('#search-input');
var SpotlightEl = document.querySelector("#spotlight");
var citylist = document.querySelector("#citybuttonlist");

//added date to spotlight
function displayDate(){
    var todaydate = dayjs().format ('MMM DD, YYYY');
    SpotlightEl.textContent = todaydate + " " + "Today's weather is "; //need to add weather text
    
}
//calling displayed time
displayDate();

//Submit button ID search
//Click event listener 
searchFormEl.addEventListener('submit', handleSearchFormSubmit);
function handleSearchFormSubmit(event) {
    event.preventDefault();
    const citysearched = searchInputVal.value;
    window.localStorage.setItem('city', JSON.stringify(citysearched));
    console.log(citysearched);
    //SpotlightEl.innerHTML = citysearched;  trial 

  // if (!searchInputVal.value) {
     // console.error('You need a search input value!');
   //  return;
  // }
 //getWeather(searchInputVal.value);
 //return;
    createSearchBtn ();
  }

  //adding search buttons for city
  function createSearchBtn () {
    const btn = document.createElement('button');
    btn.innerText = "New Button"
  citylist.appendChild(btn);
    btn.innerText = window.localStorage.getItem('city');
    return btn; 
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
