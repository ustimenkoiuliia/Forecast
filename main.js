let header = document.querySelector('.header');
let input = document.querySelector("#input");
let button = document.querySelector("#btn");
let cityOutput = document.querySelector("#card-city");
let countryOutput = document.querySelector("#country");
let dateOutput = document.querySelector("#card-date");
let tempOutput = document.querySelector("#card-value");
let pictureMain = document.querySelector("#card-img");
let picturesForecast = document.querySelectorAll('.next-day-img img');
let descOutput = document.querySelector("#card-description");
let apiKey = "5b32f58ca8e436ffc930aed944f518c6";
let toggle = document.querySelector('#toggle')
let toggleState = 'c';
function toggleChange(unit) {
  if (toggle.checked) {
    unit = 'f'
  } else {
    unit = 'c'
  }
  toggleState = unit;
  console.log(unit)
}
toggle.addEventListener('change', function () {
  let city = cityOutput.textContent
  toggleChange(toggleState)
  getWeather(city)
  getForecast(city)
})

function swapPicture(picture, status) {
  switch (status) {
    case 'clear sky':
    case 'sunny':
      picture.src = 'img/funny_weather/sunny.png'
      break;
    case 'broken clouds':
    case 'overcast clouds':
      picture.src = 'img/funny_weather/cloud.png'
      break;
    case 'few clouds':
    case 'scattered clouds':
      picture.src = 'img/funny_weather/cloudy.png'
      break;
    case 'light rain':
    case 'moderate rain':
    case 'heavy intensity rain':
      picture.src = 'img/funny_weather/rainy.png'
      break;
    case 'thunderstorm':
      picture.src = 'img/funny_weather/thunder.png'
      break;
    case 'snow':
    case 'light snow':
    case 'heavy snow':
      picture.src = 'img/funny_weather/snow.png'
      break;
    
  }
}

function getWeather(city) {
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
      // console.log(json);
      const description = json.weather[0]['description'];
      cityOutput.innerHTML = json.name;
      countryOutput.innerHTML = json.sys.country;
      // tempOutput.innerHTML = Math.round(json.main.temp - 273.15) + "°c";
      if (toggleState == 'c') {
              tempOutput.innerHTML = Math.round(json.main.temp - 273.15) + "°c";
      } else {
        const fahrenheit = (json.main.temp - 273.15) * 9/5 + 32;
        tempOutput.innerHTML = Math.round(fahrenheit) + "°F";
      }
      descOutput.innerHTML = description;
      swapPicture(pictureMain, description)
      input.value = '';
    })
    .catch(error => {
      alert(error);
    })
  
}

function getForecast(city) {
  let baseForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?"
  let urlForecast = `${baseForecastUrl}q=${city}&appid=${apiKey}`;
  fetch(urlForecast)
  .then(response => response.json())
  .then(json => {
    console.log(json)
    const date = new Date();
    for (let i = 0; i < 4; i++){
      date.setDate(date.getDate() + 1);
      const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });
      document.getElementById(`day${i + 1}`).innerHTML = dayOfWeek;

      let temp;
      if (toggleState == 'c') {
        temp = Math.round(json.list[i * 8].main.temp - 273.15);
        document.getElementById(`temp${i + 1}`).innerHTML = `${temp}°C`;
      } else {
        temp = Math.round(json.list[i * 8].main.temp * 9/5 - 459.67);
        document.getElementById(`temp${i + 1}`).innerHTML = `${temp}°F`;
      }
      

      const description = json.list[i * 8].weather[0]['description'];
      console.log(description)
      const picture = picturesForecast[i];
      swapPicture(picture, description);

    }
  })
}

// получаем погоду по умолчания в киеве при загрузке 
window.addEventListener("load", function () {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const today = new Date();
  const dayOfWeek = daysOfWeek[today.getDay()];
  const month = months[today.getMonth()];
  const date = today.getDate();

  const formattedDate = `${dayOfWeek} ${date} ${month}`;
  dateOutput.innerHTML = formattedDate;

  let city = 'Kiev'

  getWeather(city)
  getForecast(city)
});

// получаем значение из формы и вешаем слушатель, погода на сейчас
let form = document.forms[0];
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let city = input.value.trim();
  getWeather(city)
  getForecast(city)
});




