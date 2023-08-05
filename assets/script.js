var key =  "934a06e15a82cd3d1449ed66cf1851d5";
var cityName = "";
console.log(cityName);
var displayCityEl = document.querySelector(".displayCity");
var fiveDaysEl = document.querySelector(".fiveDays");
var searchedCityEl = document.querySelector(".searchedCity")
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
    var icon = document.createElement("div");
    var temp = document.createElement("div");
    var humidity = document.createElement("div");
    var speed = document.createElement("div");
    var date = document.createElement("div");
    var current_date = data.list[0].dt_txt;
    var str_CurrentDay = String(current_date);
    var cd = str_CurrentDay.split(" ");
    //var ccd = (str_CurrentDay[0]).toLocaleDateString("en-US");
    console.log(cd[0].toString());
    date.innerHTML = "Date: "+data.list[0].dt_txt;
    humidity.innerHTML = "Humidity: " + data.list[0].main.humidity;
    speed.innerHTML = "Speed: " + data.list[0].wind.speed;
    temp.innerHTML = "Temp: " + data.list[0].main.temp;
  
    icon.innerHTML = "<img src = \"https://openweathermap.org/img/wn/10d@2x.png\">";
    var today = document.createElement("div");
    today.append(date);
    today.append(temp);
    today.append(humidity);
    today.append(speed);
    today.append(icon);
    displayCityEl.append(today);
    var day1 = document.createElement("div");
    var day2 = document.createElement("div");
    var day3 = document.createElement("div");
    var day4 = document.createElement("div");
    var temp1 = document.createElement("div");
    var humidity1 = document.createElement("div");
    var speed1 = document.createElement("div");
    var date1 = document.createElement("div")
    var temp2 = document.createElement("div");
    var humidity2 = document.createElement("div");
    var speed2 = document.createElement("div");
    var date2 = document.createElement("div")
    var temp3 = document.createElement("div");
    var humidity3 = document.createElement("div");
    var speed3 = document.createElement("div");
    var date3 = document.createElement("div")
    var temp4 = document.createElement("div");
    var humidity4 = document.createElement("div");
    var speed4 = document.createElement("div");
    var date4 = document.createElement("div")
    date1.innerHTML = "Date: "+data.list[8].dt_txt;
    humidity1.innerHTML = "Humidity: " + data.list[8].main.humidity;
    speed1.innerHTML = "Speed: " + data.list[8].wind.speed;
    temp1.innerHTML = "Temp: " + data.list[8].main.temp;
    day1.append(date1);
    day1.append(temp1);
    day1.append(humidity1);
    day1.append(speed1);
    fiveDaysEl.append(day1);
    
    date2.innerHTML = "Date: "+data.list[16].dt_txt;
    humidity2.innerHTML = "Humidity: " + data.list[16].main.humidity;
    speed2.innerHTML = "Speed: " + data.list[16].wind.speed;
    temp2.innerHTML = "Temp: " + data.list[16].main.temp;
    day2.append(date2);
    day2.append(temp2);
    day2.append(humidity2);
    day2.append(speed2);
    fiveDaysEl.append(day2);

    date3.innerHTML = "Date: "+data.list[24].dt_txt;
    humidity3.innerHTML = "Humidity: " + data.list[24].main.humidity;
    speed3.innerHTML = "Speed: " + data.list[24].wind.speed;
    temp3.innerHTML = "Temp: " + data.list[24].main.temp;
    day3.append(date3);
    day3.append(temp3);
    day3.append(humidity3);
    day3.append(speed3);
    fiveDaysEl.append(day3);
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
  for (var i =0; i<displaySelectedCity.length; i++){
    var oldCity = document.createElement("div");
    oldCity.innerHTML = displaySelectedCity[i];
    console.log(displaySelectedCity[i]);
    searchedCityEl.append(oldCity);
   }
  
}

