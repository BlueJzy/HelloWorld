const request = require("request")

function getLocation(location, callback){
    const url_ = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+location+".json?access_token=pk.eyJ1IjoiYW51cnVkZGhhYmFuZGFyYSIsImEiOiJja2VzbGZ1NXIzYzNkMzBwY3hycnhvb2RzIn0.4Ecsypf73bqQg88Z2w2Psg&limit=1"

    request({url:url_, json:true}, (error, response) => {
        if(error){
            callback('Unable to Connect to the Network', undefined)
        }else if(response.body.error){
            callback('Unable to Find the Location', undefined)
        }else{
            callback(undefined, {
                placeName: response.body.features[0].place_name,
                placeID: response.body.features[0].id,
                longtitute: response.body.features[0].center[0],
                latitite: response.body.features[0].center[1]
            })
        }
    })
}
module.exports = getLocation