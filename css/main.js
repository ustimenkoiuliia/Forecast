const apiKey = "99445c83b1307cae76fa5bb49ad13ce9";
const url = `https://api.openweathermap.org/data/2.5/forecast?q={cityName}&appid=${apiKey}`;

let inputUser = document.querySelector('#input');
let button = document.querySelector('#btn');



fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
