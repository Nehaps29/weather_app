var key =  "934a06e15a82cd3d1449ed66cf1851d5";
var cityName = "";
console.log(cityName);
var displayCityEl = document.querySelector(".displayCity");
var fiveDaysEl = document.querySelector(".fiveDays");
var searchedCityEl = document.querySelector("#searchedCity");
var day1El = document.querySelector("#day1");
var day2El = document.querySelector("#day2");
var day3El = document.querySelector("#day3");
var day4El = document.querySelector("#day4");
var day5El = document.querySelector("#day5");
//console.log(api.openweathermap.org/data/2.5/forecast)
var current_day;
var selected_city = JSON.parse(localStorage.getItem('city_local')) || [];

function getDetails(lat, lon){
    
    cityName = document.getElementById("city").value;
    console.log(cityName);
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&exclude=hourly&units=imperial`)
  //fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}
  .then(function (response) {
    return response.json();
  }) 
  .then(function (data) {
   
    console.log(data);
    var icon = document.createElement("img");
    var temp = document.createElement("div");
    var humidity = document.createElement("div");
    var speed = document.createElement("div");
    var date = document.createElement("div");
    var current_date = data.list[0].dt_txt;
    var str_CurrentDay = String(current_date);
    var cd = str_CurrentDay.split(" ");
    //var ccd = (str_CurrentDay[0]).toLocaleDateString("en-US");
    console.log(cd[0].toString());
    //console.log(data.list[0].weather[0].icon)
    icon_code = data.list[0].weather[0].icon;
    console.log(icon_code);
    date.innerHTML = "Date: "+data.list[0].dt_txt;
    humidity.innerHTML = "Humidity: " + data.list[0].main.humidity;
    speed.innerHTML = "Speed: " + data.list[0].wind.speed;
    temp.innerHTML = "Temp: " + data.list[0].main.temp;
    icon.src = `https://openweathermap.org/img/wn/${icon_code}@2x.png`
    var today = document.createElement("div");
    today.append(date);
    today.append(temp);
    today.append(humidity);
    today.append(speed);
    today.append(icon);
    displayCityEl.innerHTML="";
    displayCityEl.append(today);
    var icon1 = document.createElement("img");
    var temp1 = document.createElement("div");
    var humidity1 = document.createElement("div");
    var speed1 = document.createElement("div");
    var date1 = document.createElement("div");
    date1.innerHTML = "Date: "+data.list[8].dt_txt;
    humidity1.innerHTML = "Humidity: " + data.list[8].main.humidity;
    speed1.innerHTML = "Speed: " + data.list[8].wind.speed;
    temp1.innerHTML = "Temp: " + data.list[8].main.temp;
    icon_code1 = data.list[8].weather[0].icon;
    icon1.src = `https://openweathermap.org/img/wn/${icon_code1}@2x.png`
    var day1 = document.createElement("div");
    day1.append(date1);
    day1.append(temp1);
    day1.append(humidity1);
    day1.append(speed1);
    day1.append(icon1);
    day1El.innerHTML="";
    day1El.append(day1);
    fiveDaysEl.append(day1El);
    var icon2 = document.createElement("img");
    var temp2 = document.createElement("div");
    var humidity2 = document.createElement("div");
    var speed2 = document.createElement("div");
    var date2 = document.createElement("div");
    date2.innerHTML = "Date: "+data.list[16].dt_txt;
    humidity2.innerHTML = "Humidity: " + data.list[16].main.humidity;
    speed2.innerHTML = "Speed: " + data.list[16].wind.speed;
    temp2.innerHTML = "Temp: " + data.list[16].main.temp;
    icon_code2 = data.list[16].weather[0].icon;
    icon2.src = `https://openweathermap.org/img/wn/${icon_code2}@2x.png`
    var day2 = document.createElement("div");
    day2.append(date2);
    day2.append(temp2);
    day2.append(humidity2);
    day2.append(speed2);
    day2.append(icon2);
    day2El.innerHTML="";
    day2El.append(day2);
    fiveDaysEl.append(day2El);
    
   
 /* for (var i = 0; i<data.list.length; i=i+8){
    date.innerHTML = "Date: "+data.list[i].dt_txt;
    humidity.innerHTML = "Humidity: " + data.list[i].main.humidity;
    speed.innerHTML = "Speed: " + data.list[i].wind.speed;
    temp.innerHTML = "Temp: " + data.list[i].main.temp;
  }*/

  });
}


function getLocation(){
  cityName = document.getElementById("city").value;
  if (!(selected_city.includes(cityName))){
    selected_city.push(cityName)
  }
  
  localStorage.setItem("city_local", JSON.stringify(selected_city));
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}&exclude=hourly&units=imperial`)
  //fetch(`https://api.openweathermap.org/data/2.5/forecast?q=lat={lat}&lon={lon}&appid=${key}&units=imperial`)
  .then(function (response) {
    return response.json();
  }) 
  .then(function (data) {
    console.log(data);
    console.log(data.city.coord.lat);
    console.log(data.city.coord.lon);
    var lat = data.city.coord.lat;
    var lon = data.city.coord.lon;
    getDetails(lat,lon);
  })
  var displaySelectedCity =  localStorage.getItem('city_local');
  displaySelectedCity = JSON.parse(displaySelectedCity);
  console.log(displaySelectedCity);
  searchedCityEl.innerHTML = "";
  for (var i =0; i<displaySelectedCity.length; i++){
    var oldCity = document.createElement("div");
    oldCity.innerHTML = displaySelectedCity[i];
    console.log(displaySelectedCity[i]);
    
    searchedCityEl.append(oldCity);
   }
  
}

