

//Web-server/src/app.js

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')
//per i partial
const hbs = require('hbs')

const app = express()


/************* Define path for Exress config*******************/
const publicDirectoryPath = path.join(__dirname,'../public') 

//Definisco la diorectori dove andrò amettere i template quella che prima di 
//default era views
const viewsPath =path.join(__dirname, '../template/views')

//Definisco la directory dove andrò amettere i partial
const partialPath = path.join(__dirname, '../template/partials')

/************* Define handlaebar engine e location*******************/

//il metodo set deriva dal modulo hbs(handlebar) e così viene settato in express
//Devo mettere le pagine hbs dentro una cartella che si drovrà chiamare views
app.set('view engine', 'hbs')

//Dico dove è la cartella views
app.set('views', viewsPath)

//Dico dove è la cartella views
app.set('views', viewsPath)

//Dico dove si trovano i partials
hbs.registerPartials(partialPath)


/************* Define static directory*******************/

//Indico a express quale directory usare
app.use(express.static(publicDirectoryPath))



//faccio il render del file index.hbs
//Passo delle variabili che possono essere visualizzate dinamicamente nell'html
//utilizzando {{variabile}}

app.get('',(req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        name: 'Andrew Mead',
        title: 'About page'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        helpText:'This is an help page',
        title: 'Help',
        name: 'Andrew Mead'
    })
} )

/*-----------Aggiunta funzionalita del forecast e geocode************/

app.get('/weather',(req, res)=>{
    
    //Controllo se viene fornito un indirizzo
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    //chiamo la funzione geocode che prende in ingresso l'indirizzo e fornisce una
    //call back con la gestione degli errori e restituisce la longitudine e la latitiudine
    
    //Paso anche i parametri di deafault {latitude, longitude, location}={} nel caso 
    //non esista quel luogo
    
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({
                error
            })
        }

        //chiamo la funzione forecast che prende in ingresso la latitudine e la longitudine e restituisce o errore o 
        //i dati meteo
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast:forecastData,
                location,
                address: req.query.address

            })

        })


    })
})


app.get('/products',(req, res)=>{

    if (!req.query.search){
        return res.send ({
            error: 'You must provide a search term'
        })
    }
    
    //nell'url ho http://localhost:3000/products?search=games&rating=5
    
    console.log(req.query) //{ search: 'games', rating: '5' }
    
    console.log(req.query.search) // games   

    res.send({
        product:[]
    })
})



//questa route prende tutto quello che non trova in /help/
app.get('/help/*',(req, res)=>{
    res.render('404',{
        title: '404',
        errorMessage: 'Help article not found'
    })
})


//Dico che se non ha trovalto tutti quelli spora faccia questo
app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage: 'Page not found',
        title: '404'
    })
})


//questo serve a far partire il webserver sulla porta 3000
app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})
