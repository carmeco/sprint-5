
const API_URL_JOKES:string = 'https://icanhazdadjoke.com';
const API_URL_WEATHER:string = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY_WEATHER:string = 'cf1a85f8f0dbca50e78d998c84180444';

const reportJokes:{
    joke:string,
    score:number,
    date:string
}[] = [];

//Getting DOM elements
const button = document.querySelector('button');
const acudit = document.querySelector('#acudit');
const temps = document.querySelector('#weather');
const tempsIcon = document.querySelector('#weather-icon');


//Next joke button
async function getJoke() {
    let response = await fetch(API_URL_JOKES, {
        headers: {
            'Accept': 'application/json'
        }
    });
    let { joke } = await response.json();
    acudit!.innerHTML = joke;
}
button!.addEventListener('click', getJoke);

//Feedback buttons
function reportJoke (score:number) {
    const joke = acudit!.innerHTML;
    const date:string = new Date().toISOString();
    if (joke != '')
        reportJokes.push({
        joke: joke,
        score: score,
        date: date
    });
    console.log(reportJokes);
};

//Get weather  
async function getWeather(latitude:number, longitude:number) {
    let response = await fetch(`${API_URL_WEATHER}?lat=${latitude}&lon=${longitude}&appid=${API_KEY_WEATHER}&lang=ca`);
    let weatherObject = await response.json();
    temps!.innerHTML = `El temps avui: ${weatherObject.weather[0].description}`;
    tempsIcon!.setAttribute('src', `http://openweathermap.org/img/wn/${weatherObject.weather[0].icon}@2x.png`);
}
navigator.geolocation.getCurrentPosition((position) => {
    getWeather(position.coords.latitude, position.coords.longitude);
});
