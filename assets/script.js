var key =  "934a06e15a82cd3d1449ed66cf1851d5";
var cityName = "";
console.log(cityName);
//console.log(api.openweathermap.org/data/2.5/forecast)

function getDetails(){
    cityName = document.getElementById("city").value;
   console.log(cityName);
}

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}`)
  .then(function (response) {
    return response.json();
  }) 
  .then(function (data) {
   
    console.log(data);
  });