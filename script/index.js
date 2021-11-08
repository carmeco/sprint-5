"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var API_URL_JOKES = 'https://icanhazdadjoke.com';
var API_URL_WEATHER = 'https://api.openweathermap.org/data/2.5/weather';
var API_KEY_WEATHER = 'cf1a85f8f0dbca50e78d998c84180444';
var reportJokes = [];
//Getting DOM elements
var button = document.querySelector('button');
var acudit = document.querySelector('#acudit');
var temps = document.querySelector('#weather');
var tempsIcon = document.querySelector('#weather-icon');
//Next joke button
function getJoke() {
    return __awaiter(this, void 0, void 0, function () {
        var response, joke;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(API_URL_JOKES, {
                        headers: {
                            'Accept': 'application/json'
                        }
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    joke = (_a.sent()).joke;
                    acudit.innerHTML = joke;
                    return [2 /*return*/];
            }
        });
    });
}
button.addEventListener('click', getJoke);
//Feedback buttons
function reportJoke(score) {
    var joke = acudit.innerHTML;
    var date = new Date().toISOString();
    if (joke != '')
        reportJokes.push({
            joke: joke,
            score: score,
            date: date
        });
    console.log(reportJokes);
}
;
//Get weather  
function getWeather(latitude, longitude) {
    return __awaiter(this, void 0, void 0, function () {
        var response, weatherObject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(API_URL_WEATHER + "?lat=" + latitude + "&lon=" + longitude + "&appid=" + API_KEY_WEATHER + "&lang=ca")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    weatherObject = _a.sent();
                    temps.innerHTML = "El temps avui: " + weatherObject.weather[0].description;
                    tempsIcon.setAttribute('src', "http://openweathermap.org/img/wn/" + weatherObject.weather[0].icon + "@2x.png");
                    return [2 /*return*/];
            }
        });
    });
}
navigator.geolocation.getCurrentPosition(function (position) {
    getWeather(position.coords.latitude, position.coords.longitude);
});
//# sourceMappingURL=index.js.map