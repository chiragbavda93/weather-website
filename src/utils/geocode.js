const request = require('request')

const geocode = (address, callback) => {
    const url ='https://api.weatherstack.com/current?access_key=4d3b612f9a3befb37253528aaa90e923&query='+encodeURIComponent(address)+'&units=f';
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service', undefined) 
        }else if(body.error){
            callback('Unable to find location', undefined)  
        }else{
            const data = body;
            callback(undefined, {
                latitude: data.location.lat,
                longitude: data.location.lon,
                location: data.location.name
            })  
        }    
    })  
}
module.exports = geocode