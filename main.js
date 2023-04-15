let input = document.querySelector("#input");
let button = document.querySelector("#btn");
let cityOutput = document.querySelector("#card-city");
let countryOutput = document.querySelector("#country");
let dateOutput = document.querySelector("#card-date");
let tempOutput = document.querySelector("#card-value");
let pictureMain = document.querySelector("#card-img");
let descOutput = document.querySelector("#card-description");
let apiKey = "5b32f58ca8e436ffc930aed944f518c6";


function setWeather(city) {
  let baseUrl = "https://api.openweathermap.org/data/2.5/weather?";

  let url = `${baseUrl}q=${city}&appid=${apiKey}`;
  fetch(url)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("City not found");
    }
  })
    .then((json) => {
      console.log(json);
      console.log(json.sys.country);
      const description = json.weather[0]['description'];
      cityOutput.innerHTML = json.name;
      countryOutput.innerHTML = json.sys.country;
      tempOutput.innerHTML = Math.round(json.main.temp - 273.15) + "°c";
      descOutput.innerHTML = description;
      switch (description) {
        case 'clear sky':
        case 'sunny':
          pictureMain.src = 'img/funny_weather/sunny.png'
          break;
        case 'broken clouds':
        case 'overcast clouds':
          pictureMain.src = 'img/funny_weather/cloud.png'
          break;
        case 'few clouds':
        case 'scattered clouds':
          pictureMain.src = 'img/funny_weather/cloudy.png'
          break;
        case 'light rain':
        case 'moderate rain':
        case 'heavy intensity rain':
          pictureMain.src = 'img/funny_weather/rainy.png'
          break;
        case 'thunderstorm':
          pictureMain.src = 'img/funny_weather/thunder.png'
          break;
        case 'snow':
        case 'light snow':
        case 'heavy snow':
          pictureMain.src = 'img/funny_weather/snow.png'
          break;
        
      }
      input.value = '';
    })
    .catch(error => {
      alert(error);
  })
}

// получаем значение из формы
let form = document.forms[0];
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let city = input.value.trim();
  setWeather(city)
 
});

window.addEventListener("load", function () {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const today = new Date();
  const dayOfWeek = daysOfWeek[today.getDay()];
  const month = months[today.getMonth()];
  const date = today.getDate();

  const formattedDate = `${dayOfWeek} ${date} ${month}`;
  dateOutput.innerHTML = formattedDate;

  setWeather('Kiev')

  

});

