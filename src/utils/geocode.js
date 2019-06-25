//./utils/geocode.js

/*Esporta le funzioni di geolocalizzazione*/


//Utilizzo la funzione encodeURI per fare una corretta url
//Definisco la gestine degli errori e la callback function, soatnzialmente
//la callback function ha come argomento quello ceh deve restituire: 
//es:   callback('unable to connect to location service', undefined)

const request = require('request')

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURI(address) + '.json?access_token=pk.eyJ1IjoicnVuY2lvYW50b25pbyIsImEiOiJjangxaG1vdnMwOXd2NDhuc3VoYW1haHRuIn0.cjKppIQWwJjeg6Aw6lvPHg&limit=1'

    request({url, json:true},(error, {body})=>
    {
        if(error)
        {
            callback('unable to connect to location service', undefined)
        } else if (body.features.length ===0)
        
        {
            callback('Unable to fiond location. Try another search.', undefined)
        } else 
        
        {
            callback(undefined, 
                {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
                })
        }

    })
}






module.exports=geocode