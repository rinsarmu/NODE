const express = require('express');
const app = express()
const fs = require('fs');

app.use(express.json())

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf8'))

const getAllTours = (req, res) => {
    res.status(200).json({
        status:'success',
        results:tours.length,
        data:{
            tours:tours 
        }
    })
}

const getTour =  (req, res) => {
    const {id} = req.params;
    let tour = tours.find(el=> el.id == id)
    if(!tour){
       return res.status(404).json({
            status: 'fail',
            message: 'tour not found'
        })
    }

    res.status(200).json({
        status:'success',
        results:tours.length,
        data:{
            tours:tour 
        }
    })
}

const createTour =  (req, res) => {
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
}

const updateTour =  (req, res) => {
    const {id} = req.params;
    let tour = tours.find(el=> el.id == id)
    if(id*1 > tours.length){
       return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        })
    }

    res.status(200).json({
        status:'success',
        results:tours.length,
        data:{
            tour:"<Updated tour file ...>" 
        }
    })
}

const deleteTour =  (req, res) => {
    const {id} = req.params;
    let tour = tours.find(el=> el.id == id)
    if(id*1 > tours.length){
       return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        })
    }

    res.status(204).json({
        status:'success',
        data:null
    })
}

// app.get('/api/v1/tours', getAllTours)

// app.post('/api/v1/tours',createTour)
// app.get('/api/v1/tours/:id',getTour)


// app.patch('/api/v1/tours/:id',updateTour)

// app.delete('/api/v1/tours/:id',deleteTour)

app.route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour)

app.route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)


// app.get('/',(req,res)=>{
//     res.status(200).json({message:'Natours app  start here', app:"Natours"})
// })

// app.post('/',(req,res)=>{
//     res.send("req.body is sent over")
// })

app.listen(8000, ()=>{console.log("port is running on 8000")})