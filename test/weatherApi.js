console.log("my Weather forecast:");
//const chai = require('chai');
//const assert = require('assert');
const delayms = 1;

/**
 * 
 * Promise framework
 */

var promiseAPI = function promiseAPI() {

    const state = Object.freeze({
        pending: 1,
        fullfilled: 2,
        rejected: 3
    });

    const operation = {
        successCbs: [],
        errorCbs: [],
        state: state.pending
    };

    const noop = _ => {};

    operation.then = (successCb, errorCb) => {

        var proxyOp = new promiseAPI();

        if (operation.state == state.fullfilled) {
            successCb(operation.result);
            return;
        }
        if (operation.state == state.rejected) {
            errorCb(operation.error);
            return;
        }
        operation.successCbs.push(successHandler || noop);
        operation.errorCbs.push(errorHandler || noop);

        function successHandler() {
            doLater(function () {

                let cbResult;
                try {
                    cbResult = successCb(operation.result);
                } catch (error) {
                    proxyOp.fail(error);
                    return;
                }
                proxyOp.resolve(cbResult);
            });
        }

        function errorHandler() {
            doLater(function () {
                let cbResult;
                try {
                    cbResult = errorCb(operation.error);
                } catch (error) {
                    proxyOp.fail(error);
                    return;
                }

                proxyOp.resolve(cbResult);
            });
        }

        function doLater(fn) {
            setTimeout(fn, delayms);
        }

        return proxyOp;
    };

    operation.resolve = function resolve(value) {
        //if the success handler returns  a promise  (hence if there  is nesting)
        if (value && value.then) {
            // value.forwardCompletion(operation);
            value.then(operation.resolve, operation.fail);
            return;
        }
        operation.succeed(value);
    };

    operation.succeed = (result) => {
        operation.state = state.fullfilled;
        operation.result = result;
        operation.successCbs.forEach(cb => cb(result));
    };

    operation.fail = (error) => {
        operation.state = state.rejected;
        operation.error = error;
        operation.successCbs.forEach(cb => cb(error));
    };

    operation.nodeCallback = (error, result) => {

        if (error == null) {
            operation.succeed(result);
            return;
        }

        operation.fail(error);

    };

    operation.onFailure = (onerror) => {
        return operation.then(null, onerror);
    };

    return operation;
};

/**
 * 
 */

/**
 * Async operations
 */


function getCurrentCity(callback) {
    setTimeout(function () {
        const city = "boston";
        callback(null, city);
    }, delayms);
}

function getForecast(city, callback) {

    setTimeout(function () {

        const forecast = {
            temp: [25, 22, 15, 11]
        };
        callback(null, forecast);
    }, delayms);
}

function getWeather(city, callback) {

    setTimeout(function () {
        const weather = {
            temp: 25
        };
        callback(null, weather);
    }, delayms);
}
/**/
/*Async  operation using promises  framework*/

function fetchWeather(city) {
    var promise = new promiseAPI();

    var weather = getWeather(city, promise.nodeCallback);

    return promise;
}

function fetchForecast(city) {
    var promise = new promiseAPI();

    var forecast = getForecast(city, promise.nodeCallback);

    return promise;
}

function fetchCurrentCity() {

    var promise = new promiseAPI();

    var city = getCurrentCity(promise.nodeCallback);

    /*  setTimeout(function () {
         promise.then(result => console.log("success: " + result), error => console.log("error: " + error));
     }, delayms);*/

    return promise;
}

const city = "boston";
var promise = new promiseAPI();
var forecastOp = fetchForecast(city, promise.nodeCallback);
var weatherOp = fetchWeather(city, promise.nodeCallback);

//var a = fetchCurrentCity().then(result => console.log("success: " + result), error => console.log("error: " + error));
forecastOp.then(function (forecast) {
    weatherOp.then(function (weather) {
        console.log(`Weather  today  : ${weather.temp} and forecast  today ${forecast.temp}`);
    })

});

var getCityPromise = fetchCurrentCity();

//here we are nesting promises but by  creating a "new promise" in global scope  we  are  able  to capture the  result
//which in this case is the weather, and use it elsewhere in our app 
/*getCityPromise.then(function (city) {
    fetchWeather(city).then(function (weather) {
        getWeatherPromise.succeed(weather);
    });

    getWeatherPromise.then((weather) => console.log(`test just passed yo! ${weather.temp}`));
});*/
var getWeatherPromise;
getCityPromise
    .then(fetchWeather)
    .then((weather) => console.log(`test passed  : ${weather.temp} `));