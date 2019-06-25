//forecast.js

/* Creazione della funzione forecast con call back function */


const request = require ('request')


const forecast = (latitude, longitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/314e43d32c08d3763c3f8b626a8b6b5d/'+ latitude + ',' + longitude + '?units=si&lang=it'

    request({url, json:true}, (error, {body})=>{

        //Ho ho popolato errore o ho popolato il response
        if (error){
            callback('Unable to connect to internet service')
    
        } else if (body.error) {
            callback('unable to find location', undefined)
            
        } else {
            
            callback(undefined, body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degree out. There is a ' + body.currently.precipProbability + ' % chance of rain')
        }
        
    })
}


module.exports = forecast



