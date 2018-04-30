console.log("my Weather forecast:");
//const chai = require('chai');
//const assert = require('assert');
const delayms = 1;

function getCurrentCity(callback) {
    setTimeout(function () {
        const city = "boston";
        callback(null, city);
    }, delayms);
}

/**
 * 
 * Promise framework
 */

function promiseAPI() {

    const state = Object.freeze({
        pending: 1,
        succeeded: 2,
        failed: 3
    });

    const operation = {
        successCbs: [],
        errorCbs: [],
        state: state.pending
    };

    const noop = _ => {};
    //operation.onSuccess=
    //operation.onError
    operation.onComplete = (successCb, errorCb) => {
      
        operation.successCbs.push(successCb || noop);
        operation.errorCbs.push(errorCb || noop);
 
    };

    operation.succeed = (result) => {
        operation.state = state.succeeded;
        operation.successCbs.forEach(cb => cb(result));
    };

    operation.fail = (error) => {
        operation.state = state.failed;
        operation.successCbs.forEach(cb => cb(error));
    };

    operation.nodeCallback = (error, result) => {
        if (error == null) {
            operation.succeed(result);
            return;
        }

        operation.fail(error);

    };

    return operation;
};
/**/
/*Async  operation using promises  framework*/

function fetchCurrentCity() {

    var promise = new promiseAPI();
    // fetchCityPromise.onComplete(result => console.log(result), error => console.log(error));
 
  setTimeout(function () {
        promise.onComplete(result => console.log("success: " + result), error => console.log("error: " + error));
    }, delayms);

    var city = getCurrentCity(promise.nodeCallback);

    return promise;
}
var a = fetchCurrentCity();

/**
 * Async operations
 */
function getWeather(city, callback) {

    setTimeout(function () {
        if (city == null)
            callback(new Error("oops...no city found"), null);

        const weather = {
            temp: 20
        };

        callback(null, city);
    }, delayms);

}

function getForecast() {};



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