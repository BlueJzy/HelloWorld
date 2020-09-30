const request = require("request")
const getLocation = require('./utilis/getLocation.js')
const getWeather = require("./utilis/getWeather.js")
const express = require("express")
const hbs = require("hbs")
const path = require("path")

// creating paths
const public = path.join(__dirname, "../public")
const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// creating the app
const app = express();
const port = process.env.PORT || 3000 
// telling to express
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)
app.use(express.static(public))

// ================================ CONTENT WILL GO BELOW =================================//

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        name: 'Anuruddha Bandara'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Nimeshika Dilshani'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Anna J Wotson'
    })
})


app.get('/location', (req, res) => {
    if(!req.query.place){
        return res.send({
            Error: 'You Must Need to Enter a Location To Continue!'
        })
    }     
        getLocation(req.query.place, (error, l_data) =>{
            if(error){
                res.send({
                    Error:error
                })
            }else{
                let lat = l_data.latitite
                let log = l_data.longtitute
                getWeather(lat, log, (error, w_data) =>{
                    if(error){
                        res.send({
                            Error:error
                        })
                    }else{
                        res.send({
                            place: l_data.placeName,
                            weather: w_data.description
                        })
                    }
                })
            }
        })
    })


// ============================= CONTENT WILL GO ABOVE ==================================//

// creating the Srver
app.listen(port, () => {
    console.log("Server is Start! " + port)
})





