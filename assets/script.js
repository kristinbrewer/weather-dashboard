//var APIkey = "c117587cfcafa1253c62bb6dccbc1226";
//var city;
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
    event.preventDefault();
  
    var searchInputVal = document.querySelector('#search-input').value;
  
    if (!searchInputVal) {
      console.error('You need a search input value!');
      return;
    }
  else (console.log);
 //Figure out how to assign value with APIs
  }
  
  searchFormEl.addEventListener('submit', handleSearchFormSubmit);
  