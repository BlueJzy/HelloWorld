const request = require("request")

function getWeather(latt, long, callback){
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+latt+'&lon='+long+'&appid=b8e08a052817765f5892804266351067'

    request({url:url, json:true}, (error, response) =>{
        if(error){
            callback(error, undefined)
        }else if(response.body.length = 0){
            callback("Unable to get Weather Data! Try again Later!", undefined)
        }else{
            callback(undefined, {
                main: response.body.weather[0].main,
                description: response.body.weather[0].description
            })
        }
    })
}

module.exports = getWeather