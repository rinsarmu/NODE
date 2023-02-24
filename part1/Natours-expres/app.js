const express = require('express');
const app = express()
const fs = require('fs');

app.use(express.json())

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
app.post('/api/v1/tours', (req, res) => {
    console.log(req.body)
    const newId = tours[tours.length-1].id+1
    console.log(newId)
    const newTour = Object.assign({id:newId}, req.body)
    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours.json`, JSON.stringify(tours), (err)=>{
        res.status(201).json(
            {
                message: "success", 
                result:tours.length,
                data: {
                     tours 
                    }
            })

    })
    // res.send('Done')
})

// app.get('/',(req,res)=>{
//     res.status(200).json({message:'Natours app  start here', app:"Natours"})
// })

// app.post('/',(req,res)=>{
//     res.send("req.body is sent over")
// })

app.listen(8000, ()=>{console.log("port is running on 8000")})