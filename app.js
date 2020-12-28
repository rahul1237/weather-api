const express = require('express')
const bodyparser = require('body-parser')
const http = require('http')
const app = express()

app.use(bodyparser.urlencoded({extended:true}))

app.get('/',function(req,res){
    res.sendFile(__dirname+'/weather.html')
    // res.send('<h1> rahul mahajan')
})

app.post('/',function(req,res){
    
    const locat = req.body.place
    const key = 'ea7a226049f088f392cd6c102bd5f5c0'
    const unit = 'metric'

    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + locat + "&units=" + unit + "&appid=" + key
    http.get(url,function(response){
        response.on('data',function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const max_temp = weatherData.main.temp_max
            const min_temp = weatherData.main.temp_min
            const humid = weatherData.main.humidity
            const descrip = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imgurl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
            res.write('<p> current temp of '+ locat +' is '+ temp+"°"+'C </p>')
            res.write("<h2> today's maximum temp of "+ locat +" is "+max_temp+'°C </h2>')
            res.write("<h1> today's minimum temp of "+ locat +"  is "+min_temp+'°C</h1>')
            res.write("<h3>humidity in " + locat +" is: "+humid+"</h3>") 
            res.write("<h3>current weather is "+descrip+"</h3>") 
            res.write("<img src="+imgurl+">")
            res.send()
        })
    })
    // res.send("<h1> rahul mahajan")
})

app.listen(7777,function(){
    console.log('server on port 7777');
})
