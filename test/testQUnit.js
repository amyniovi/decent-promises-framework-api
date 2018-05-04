


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