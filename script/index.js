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
//APIs
var API_URL_JOKES = "https://icanhazdadjoke.com";
var API_URL_CHUCK = "https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random";
var API_KEY_CHUCK = "865e36f85bmsh404fcd65cffc076p10f251jsn0d0b8704cd57";
var API_URL_WEATHER = "https://api.openweathermap.org/data/2.5/weather";
var API_KEY_WEATHER = "cf1a85f8f0dbca50e78d998c84180444";
var API_SCORES = "http://localhost:3000/scores";
//Arrays
var images = ["blob-blue.svg", "blob-yellow.svg", "blob-pink.svg"];
//Getting DOM elements
var nextJokeBtn = document.querySelector("#nextJokeBtn");
var acudit = document.querySelector("#acudit");
var temps = document.querySelector("#weather");
var tempsIcon = document.querySelector("#weather-icon");
var body = document.querySelector("body");
var feedback = document.querySelector("#feedback");
//Get a joke from icanhazdadjoke
function getJoke() {
    return __awaiter(this, void 0, void 0, function () {
        var response, joke, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(API_URL_JOKES, {
                            headers: {
                                accept: "application/json",
                            },
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    joke = (_a.sent()).joke;
                    return [2 /*return*/, joke];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//Get a joke from Chuck
function getJokeFromChuck() {
    return __awaiter(this, void 0, void 0, function () {
        var response, value, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(API_URL_CHUCK, {
                            headers: {
                                accept: "application/json",
                                "x-rapidapi-key": API_KEY_CHUCK,
                                "x-rapidapi-host": "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
                            },
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    value = (_a.sent()).value;
                    return [2 /*return*/, value];
                case 3:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//Next joke button
var clicks = 0;
nextJokeBtn.addEventListener("click", function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                clicks++;
                feedback.innerHTML = "";
                _a = acudit;
                _b = "";
                if (!(clicks % 2 == 0)) return [3 /*break*/, 2];
                return [4 /*yield*/, getJoke()];
            case 1:
                _c = _d.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, getJokeFromChuck()];
            case 3:
                _c = _d.sent();
                _d.label = 4;
            case 4:
                _a.innerHTML = _b + (_c);
                body.style.backgroundImage = "url(images/" + images[Math.floor(Math.random() * images.length)] + ")";
                return [2 /*return*/];
        }
    });
}); });
//Feedback buttons
function reportJoke(score) {
    return __awaiter(this, void 0, void 0, function () {
        var joke, jokeReport;
        return __generator(this, function (_a) {
            joke = acudit.innerHTML;
            if (joke != "") {
                jokeReport = {
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
                    feedback.innerHTML = "Gracias por tu valoración!";
                }
                catch (error) {
                    feedback.innerHTML =
                        "No se ha podido enviar la valoración. Inténtalo más tarde...";
                }
            }
            return [2 /*return*/];
        });
    });
}
//Get weather
function getWeather(latitude, longitude) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(API_URL_WEATHER + "?lat=" + latitude + "&lon=" + longitude + "&appid=" + API_KEY_WEATHER + "&lang=ca")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    error_3 = _a.sent();
                    console.log(error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
navigator.geolocation.getCurrentPosition(function (position) { return __awaiter(void 0, void 0, void 0, function () {
    var weatherObject, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, getWeather(position.coords.latitude, position.coords.longitude)];
            case 1:
                weatherObject = _a.sent();
                temps.innerHTML = "El temps avui: " + weatherObject.weather[0].description;
                tempsIcon.setAttribute("src", "images/weather/" + weatherObject.weather[0].icon + ".png");
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.log(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=index.js.map