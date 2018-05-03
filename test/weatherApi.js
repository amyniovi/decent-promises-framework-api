console.log("my Weather forecast:");
//const chai = require('chai');
//const assert = require('assert');
const delayms = 1;

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

            doLater(function(){

 let cbResult;
                try {
                    cbResult = successCb(operation.result);
                } catch (error) {
                    proxyOp.fail(error);
                    return;
                }

            //if the success handler returns  a promise  (hence if there  is nesting)
            if (cbResult && cbResult.then) {
                    cbResult.forwardCompletion(proxyOp);
                    return;
                }
                proxyOp.succeed();
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

                if (cbResult && cbResult.then) {
                    cbResult.forwardCompletion(proxyOp);
                    return;
                }
                proxyOp.succeed();

            });
        }



        function doLater(fn) {
            setTimeout(fn, delayms);
        }

        return proxyOp;
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

    operation.forwardCompletion = (opToForwardResult) => {
        operation.then(opToForwardResult.succeed, opToForwardResult.fail);
    };

    return operation;
};

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


//getWeatherPromise.then((weather) => console.log(`test just passed yo! ${weather.temp}`));










/**Tests  */
/*//done function tells mocha we are working on an async test and test should NOT complete until  we call done.
QUnit.test("fetch current city with separate success and error callbacks",
    function (assert) {
        assert.expect(1);
        //  console.log(assert);
        var done = assert.async();

        //  console.log(done);    
        fetchCurrentCity((error) => {
                console.log(error);
                assert.ok(false, error)
                done(error)
            },
            (result) => {
                console.log(result);
                assert.ok(true, result);
                done(); 
            });

    });
*/

/*var operation = (function(){
var onSuccess;
var onError;

function setCallbacks (successCb, errorCb){
//if (typeof(onSuccess)== function & typeof(onError)== function)

onSuccess=successCb;
onError=errorCb;
console.log(onSuccess);

}

function fetchCity(){
    console.log(onSuccess);
    if (onSuccess==null||onError==null)
    throw new Error("define callbacks");

     var city = getCurrentCity((error, result) => {
        if (error == null) {
            onSuccess(result);
            return;
        }

        onError("geolocation  could not be retrieved");
});
}

return {
    setCallbacks:setCallbacks(),
    fetchCurrentCity:fetchCity()
};

})();*/
/*QUnit.test("fetchCurrentCity pass callbacks later on", function (assert) {

    assert.expect(1);
    var done = assert.async();

    var promise = fetchCurrentCity();
    promise.setCallbacks(result => {
        console.log(result);
        assert.ok(true, result);
        done();
    }, error => {
        console.log(error);
        assert.ok(false, error);
        done(error);
    });
});*/

//QUnit.test("pass multiple callbacks and expect all of them to be called", function (assert) {
/*  assert.expect(2);
  var done = assert.async();

  var promise = fetchCurrentCity();
  promise.setCallbacks(result => {
      console.log(result);
      assert.ok(true, result);
      //done();
  });
  promise.setCallbacks(result => {
      console.log(result);
      assert.ok(true, result);
      done();
  });

  // add an appropriate event listener

  // create and dispatch the event
  /*  var successEvent = new CustomEvent("apiCallSuccess", {
        detail: {
            status: 200,
            result: null
        }
    });

    var errorEvent = new CustomEvent("apiCallFailure", {
        detail: {
            error: "there was a 404 error, weather API not found"
        }
    });

    var obj = {
        successE: successEvent,
        errorE: errorEvent
    };
    console.log(obj);
    console.log(obj.addEventListener());
    obj.addEventListener("apiCallSuccess", successE => {
        assert.ok(true, "");
        console.log(detail.result);
    });
    obj.addEventListener("apiCallFailure", errorE => {
        assert.ok(true, "");
        console.log(detail.error);
    });

    fetchCurrentCity2(obj);*/


//obj.dispatchEvent(successEvent);*/

//});