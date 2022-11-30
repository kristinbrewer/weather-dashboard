var APIkey = "c117587cfcafa1253c62bb6dccbc1226";
var city;
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}




//looking at submissions in search form
var searchFormEl = document.querySelector('#search-form');
var searchInputVal = document.querySelector('#search-input');
function getWeather (cityname) {
    //gets weather
//console.log(cityname);
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
function handleSearchFormSubmit(event) {
    event.preventDefault();
  
    
  //console.log(searchInputVal.value);
    if (!searchInputVal.value) { //not logging yet 
      console.error('You need a search input value!');
      return;
    }
  
    //console.log('city saved');
 //localStorage.setItem(searchInputVal, text);
 getWeather(searchInputVal.value);
 //Figure out how to assign value with APIs
  }
  
  searchFormEl.addEventListener('submit', handleSearchFormSubmit);
  
  //getting input from search field and appending it to make button hx searches

  //local storgage for searched citites ? value 
  function createBtnSearch () {
    var citySearched = localStorage.getItem('searchInputVal');

    //JSON.stringify() === '{}'
  }