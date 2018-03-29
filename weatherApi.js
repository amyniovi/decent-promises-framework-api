console.log("my Weather forecast:");
const delayms = 1;

function getCurrentCity(callback) {
    setTimeout(function () {
        const city = "boston";
        callback(null, city);
    }, delayms);
}

function getWeather(city, callback) {
    
    setTimeout(function () {  
        if (city==null)
        callback(new Error("oops...no city found"), null);
        
        const weather = {
            temp: 20
        };

        callback(null, city);
    }, delayms);

}

function getForecast (){};