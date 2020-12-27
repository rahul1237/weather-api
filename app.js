const express = require('express')
const bodyparser = require('body-parser')
const app = express()

app.use(bodyparser.urlencoded({extended:true}))

app.get('/',function(req,res){
    // res.send('hello this is rahul mahajan from adgitm aff to GGSIPU doing cse batch 2023')
    res.sendFile(__dirname+'/weather.html')
})

app.post('/',function(req,res){
    const location = req.body.place
    console.log('location added by the user is '+location);
})

app.listen(7777,function(){
    console.log('server on port 7777');
})
