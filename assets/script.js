var key =  "934a06e15a82cd3d1449ed66cf1851d5";
var cityName = document.getElementById("city");
//console.log(api.openweathermap.org/data/2.5/forecast)



  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}`)
  .then(function (response) {
    return response.json();
  }) 
  .then(function (data) {
   
    console.log(data);
  });