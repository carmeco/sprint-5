
const API_URL:string = 'https://icanhazdadjoke.com';

const reportJokes:{
    joke:string,
    score:number,
    date:string
}[] = [];

//Getting DOM elements
const button = document.querySelector('button');
const acudit = document.querySelector('#acudit');


//Next joke button
async function getJoke() {
    let response = await fetch(API_URL, {
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