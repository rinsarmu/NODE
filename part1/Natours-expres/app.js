const express = require('express');
const app = express()

app.get('/',(req,res)=>{
    res.send('Natours app start here')
})

app.listen(8000, ()=>{console.log("port is running on 8000")})