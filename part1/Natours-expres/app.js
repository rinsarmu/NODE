const express = require('express');
const app = express()
const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours.json`, 'utf8'))
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status:'success',
        results:tours.length,
        data:{
            tours:tours 
        }
    })
})

// app.get('/',(req,res)=>{
//     res.status(200).json({message:'Natours app  start here', app:"Natours"})
// })

// app.post('/',(req,res)=>{
//     res.send("req.body is sent over")
// })

app.listen(8000, ()=>{console.log("port is running on 8000")})