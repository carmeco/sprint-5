//APIs
const API_URL_JOKES: string = "https://icanhazdadjoke.com";
const API_URL_CHUCK: string =
    "https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random";
const API_KEY_CHUCK: string =
    "865e36f85bmsh404fcd65cffc076p10f251jsn0d0b8704cd57";
const API_URL_WEATHER: string =
    "https://api.openweathermap.org/data/2.5/weather";
const API_KEY_WEATHER: string = "cf1a85f8f0dbca50e78d998c84180444";
const API_SCORES: string = "http://localhost:3000/scores";

//Arrays
const images: string[] = ["blob-blue.svg", "blob-yellow.svg", "blob-pink.svg"];

//Getting DOM elements
const nextJokeBtn = document.querySelector("#nextJokeBtn");
const acudit = document.querySelector("#acudit");
const temps = document.querySelector("#weather");
const tempsIcon = document.querySelector("#weather-icon");
const body = document.querySelector("body");
const feedback = document.querySelector("#feedback");

//Get a joke from icanhazdadjoke
async function getJoke() {
    try {
        let response = await fetch(API_URL_JOKES, {
            headers: {
                accept: "application/json",
            },
        });
        let { joke } = await response.json();
        return joke;
    } catch (error) {
        console.log(error);
    }
}

//Get a joke from Chuck
async function getJokeFromChuck() {
    try {
        const response = await fetch(API_URL_CHUCK, {
            headers: {
                accept: "application/json",
                "x-rapidapi-key": API_KEY_CHUCK,
                "x-rapidapi-host":
                    "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
            },
        });
        const { value } = await response.json();
        return value;
    } catch (error) {
        console.log(error);
    }
}

//Next joke button
let clicks: number = 0;
nextJokeBtn!.addEventListener("click", async () => {
    clicks++;
    feedback!.innerHTML = "";
    acudit!.innerHTML = `${
        clicks % 2 == 0 ? await getJoke() : await getJokeFromChuck()
    }`;
    body!.style.backgroundImage = `url(images/${
        images[Math.floor(Math.random() * images.length)]
    })`;
});

//Feedback buttons
async function reportJoke(score: number) {
    const joke = acudit!.innerHTML;
    if (joke != "") {
        const jokeReport: {
            joke: string;
            score: number;
            date: string;
        } = {
            joke: joke,
            score: score,
            date: new Date().toISOString(),
        };
        try {
            fetch(API_SCORES, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(jokeReport),
            });
            feedback!.innerHTML = "Gracias por tu valoración!";
        } catch (error) {
            feedback!.innerHTML =
                "No se ha podido enviar la valoración. Inténtalo más tarde...";
        }
    }
}

//Get weather
async function getWeather(latitude: number, longitude: number) {
    try {
        const response = await fetch(
            `${API_URL_WEATHER}?lat=${latitude}&lon=${longitude}&appid=${API_KEY_WEATHER}&lang=ca`
        );
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}
navigator.geolocation.getCurrentPosition(async (position) => {
    try {
        const weatherObject = await getWeather(
            position.coords.latitude,
            position.coords.longitude
        );
        temps!.innerHTML = `El temps avui: ${weatherObject.weather[0].description}`;
        tempsIcon!.setAttribute(
            "src",
            `images/weather/${weatherObject.weather[0].icon}.png`
        );
    } catch (error) {
        console.log(error);
    }
});
