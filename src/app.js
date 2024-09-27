const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');

const partialsPath = path.join(__dirname,'../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Chirag',
        created: 'Chirag'
    });
})
app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About',
        name: 'Chirag',
        created: 'Chirag' 
    });
})
app.get('/help',(req, res)=>{
    res.render('help',{
        'title': 'Help',
        'message': 'This is a help page',
        created: 'Chirag'
    })    
})
app.get('/help/*',(req, res)=>{ 
    res.render('404',{
        title: 'Help article not found',
        name: 'Chirag',
        created: 'Chirag'
    });   
})
app.get('/help',(req, res)=>{
    res.send([{name: 'Chirag', age: 29},{name: 'Chirag', age: 29}])
})
 
app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({
                error
            })
        } else {
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: error
                    })
                } else {
                    return res.send({
                        location: location,
                        address: req.query.address,
                        forecastData : forecastData

                    })
                }
            })
        }
    })
    
})


app.get('/products',(req, res)=>{  
    console.log() 
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    return res.send({
        products: []
    })
});

app.get('*', (req,res)=>{
    res.render('404',{
        title: 'Page Not Found',
        name: 'Chirag',
        created: 'Chirag'
    }); 
})
app.listen(3000,()=>{
    console.log('Server is up on port 3000');
})