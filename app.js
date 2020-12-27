const express = require('express')

const app = express()

app.get('/',function(req,res){
    console.log(req);
    res.send('<h1>this is rahul1111')
})


app.listen(777,function(){
    console.log('this is rahul mahajan');
})