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
            res.write('current temp of '+ locat +' is '+ temp+'°C')
            res.write("today's maximum temp of "+ locat +" is "+max_temp+'°C')
            res.write("today's minimum temp of "+ locat +"  is "+min_temp+'°C')
            res.write("humidity in " + locat +" is: "+humid) 
            res.write("current weather is "+descrip) 
            res.write("<img src="+imgurl+">")
            res.send()
        })
    })
    // res.send("<h1> rahul mahajan")
})

app.listen(7777,function(){
    console.log('server on port 7777');
})
