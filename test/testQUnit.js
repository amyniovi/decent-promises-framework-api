/*
const {
    test
} = QUnit;


QUnit.module("callbacks");

test("nesting serial dependencies", (assert) => {
var done = assert.async();
    getCurrentCity(function (error, city) {
        if (error)
            done(error);
        getWeather(city, function (error, weather) {
            console.log("weather", weather);
            console.log(done);
            //console.log(done());
            done();
        });

    });
});

*/