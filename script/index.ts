
const API_URL_JOKES:string = 'https://icanhazdadjoke.com';
const API_URL_CHUCK:string = 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random';
const API_KEY_CHUCK:string = '865e36f85bmsh404fcd65cffc076p10f251jsn0d0b8704cd57';
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


//Get a joke from icanhazdadjoke
async function getJoke() {
    try {
        const response = await fetch(API_URL_JOKES, {
            headers: {
                'Accept': 'application/json'
            }
        });
        const { joke } = await response.json();
        return joke;
    } catch (error) {
        console.log(error);
    }
}

//Next joke from Chuck
async function getJokeFromChuck() {
    try {
        const response = await fetch(API_URL_CHUCK, {
            headers: {
                'accept': 'application/json',
                'x-rapidapi-key': API_KEY_CHUCK,
                'x-rapidapi-host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com',
            }
        });
        const { value } = await response.json();
        return value;
    } catch (error) {
        console.log(error);
    }
}

//Next joke button
let clicks:number = 0;
button!.addEventListener('click', () => {
    clicks++;
    acudit!.innerHTML = `${clicks%2 == 0 ? getJoke() : getJokeFromChuck()}`;
});

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
    try {
        const response = await fetch(`${API_URL_WEATHER}?lat=${latitude}&lon=${longitude}&appid=${API_KEY_WEATHER}&lang=ca`);
        const weatherObject = await response.json();
        temps!.innerHTML = `El temps avui: ${weatherObject.weather[0].description}`;
        tempsIcon!.setAttribute('src', `http://openweathermap.org/img/wn/${weatherObject.weather[0].icon}@2x.png`);
    } catch (error) {
        console.log(error);
    }
}
navigator.geolocation.getCurrentPosition((position) => {
    try {
        getWeather(position.coords.latitude, position.coords.longitude);
    } catch (error) {
        console.log(error);
    }
});
