
const API_URL:string = 'https://icanhazdadjoke.com';


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
    acudit.innerHTML = joke;
}

button.addEventListener('click', getJoke);