var key =  "934a06e15a82cd3d1449ed66cf1851d5";
var cityName = "";
var searchBtn = document.querySelector("#submit-city");
console.log(cityName);
var displayCityEl = document.querySelector(".displayCity");
var fiveDaysEl = document.querySelector(".fiveDays");
var searchedCityEl = document.querySelector("#searchedCity");
var day1El = document.querySelector("#day1");
var day2El = document.querySelector("#day2");
var day3El = document.querySelector("#day3");
var day4El = document.querySelector("#day4");
var day5El = document.querySelector("#day5");
var selected_city = JSON.parse(localStorage.getItem('city_local')) || [];
// get and diaplying data from forecast API
function getDetails(lat, lon){
    
    cityName = document.getElementById("city").value;
    console.log(cityName);
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&exclude=hourly&units=imperial`)
  .then(function (response) {
    return response.json();
  }) 
  .then(function (data) {
    console.log(data);
    fiveDaysEl.innerHTML = "";
    //loop to get 5 days data
    for (var i =7; i<40; i=i+8){
      var icon1 = document.createElement("img");
    var temp1 = document.createElement("div");
    var humidity1 = document.createElement("div");
    var speed1 = document.createElement("div");
    var date1 = document.createElement("div");
    var formattedDate1 = dayjs(data.list[i].dt_txt.split(" ")[0].toString()).format('DD-MMM-YYYY');
    date1.innerHTML = "Date: "+formattedDate1;
    humidity1.innerHTML = "Humidity: " + data.list[i].main.humidity + " %";
    speed1.innerHTML = "Speed: " + data.list[i].wind.speed + " mph";
    temp1.innerHTML = "Temp: " + data.list[i].main.temp + " °F";
    icon_code1 = data.list[i].weather[0].icon;
    icon1.src = `https://openweathermap.org/img/wn/${icon_code1}@2x.png`
    var day1 = document.createElement("div");
    day1.append(date1);
    day1.append(temp1);
    day1.append(humidity1);
    day1.append(speed1);
    day1.append(icon1);
    var day1El = document.createElement("div");
    day1El.setAttribute( "class", "five" );
    day1El.innerHTML="";
    day1El.append(day1);
    fiveDaysEl.append(day1El);

    }
   
  });
}
// geting data form current weather API
function getCurrent (lat1, lon1){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat1}&lon=${lon1}&appid=${key}&units=imperial`)

  .then(function (response) {
    return response.json();
  }) 
  .then(function (data) {
    console.log(data);
    //var cityN = document.createElement("div");
    var icon = document.createElement("img");
    var temp = document.createElement("div");
    var humidity = document.createElement("div");
    var speed = document.createElement("div");
    var date = document.createElement("div");
    icon_code = data.weather[0].icon;
    var current_date = dayjs();
    date.innerHTML = current_date.format('DD-MMM-YYYY') +", " +data.name;
    humidity.innerHTML = "Humidity: " + data.main.humidity + " %";
    speed.innerHTML = "Speed: " + data.wind.speed + " mph";
    temp.innerHTML = "Temp: " + data.main.temp + " °F";;
    icon.src = `https://openweathermap.org/img/wn/${icon_code}@2x.png`
    var today = document.createElement("div");
    today.append(date);
    today.append(temp);
    today.append(humidity);
    today.append(speed);
    today.append(icon);
    displayCityEl.innerHTML="";
    displayCityEl.append(today);
    
  
  })

}
// function to get data as per city, so that we can get lat and lon
function getLocation(){
  cityName = document.getElementById("city").value.toUpperCase();
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}&exclude=hourly&units=imperial`)
  .then(function (response) {
    if (response.ok){
      return response.json();
    }
    
  
  }) 
  .then(function (data) {
   // console.log(data);
    console.log(data.city.coord.lat);
    console.log(data.city.coord.lon);
    var lat = data.city.coord.lat;
    var lon = data.city.coord.lon;
    getCurrent(lat,lon);
    getDetails(lat,lon);
    if (!(selected_city.includes(data.city.name))){
      selected_city.push(data.city.name)
    }
    localStorage.setItem("city_local", JSON.stringify(selected_city));
    var displaySelectedCity =  JSON.parse(localStorage.getItem('city_local'));
    console.log(displaySelectedCity);
    searchedCityEl.innerHTML = "";
    for (var i =0; i<displaySelectedCity.length; i++){
      var oldCity = document.createElement("button");
      oldCity.setAttribute("id", displaySelectedCity[i]);
      oldCity.innerHTML = displaySelectedCity[i];
      console.log(displaySelectedCity[i]);    
      searchedCityEl.append(oldCity);
     }
  })
  .catch(function (err) {
    console.error(err);
    console.log("here");
  
  })
 
}
searchedCityEl.addEventListener('click',getPreviousLocation); // adding event listner to get already searched city 

function getPreviousLocation(event){
  event.preventDefault();
  var searchInputVal = event.target.textContent;
  console.log(searchInputVal);

  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchInputVal}&appid=${key}&exclude=hourly&units=imperial`)
  
  .then(function (response) {
    return response.json();
  }) 
  .then(function (data) {
    console.log(data);
    console.log(data.city.coord.lat);
    console.log(data.city.coord.lon);
    var lat = data.city.coord.lat;
    var lon = data.city.coord.lon;
    getCurrent(lat,lon);
    getDetails(lat,lon);
  })
}

searchBtn.addEventListener("click", function(){getLocation()}); // adding listner to get data for current day and forecast data