const express = require('express');
const app = express()
const fs = require('fs');

// 1. MIDDLEWARES
app.use(express.json())

app.use((req,res,next)=>{
    console.log("Hello from the middleware")
    next();
})

app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString()
    console.log("Hello from the middleware")
    next();
})

//2. CONTROLLERS

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf8'))

const getAllTours = (req, res) => {
    res.status(200).json({
        status:'success',
        results:tours.length,
        requestedAt: req.requestTime,
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

const getAllUsers = (req,res)=>{
    res.status(500).json({
        status:'error',
        message:'THis route is not yet defined'
    })
}

const createUser = (req,res)=>{
    res.status(500).json({
        status:'error',
        message:'THis route is not yet defined'
    })
}

const getUser = (req,res)=>{
    res.status(500).json({
        status:'error',
        message:'THis route is not yet defined'
    })
}

const updateUser = (req,res)=>{
    res.status(500).json({
        status:'error',
        message:'THis route is not yet defined'
    })
}

const deleteUser = (req,res)=>{
    res.status(500).json({
        status:'error',
        message:'THis route is not yet defined'
    })
}
// app.get('/api/v1/tours', getAllTours)

// app.post('/api/v1/tours',createTour)
// app.get('/api/v1/tours/:id',getTour)


// app.patch('/api/v1/tours/:id',updateTour)

// app.delete('/api/v1/tours/:id',deleteTour)

//3. ROUTE



const tourRouter = express.Router()
const userRouter = express.Router()


tourRouter.route('/')
    .get(getAllTours)
    .post(createTour)

tourRouter.route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)


userRouter.route('/')
    .get(getAllUsers)
    .post(createUser)

userRouter.route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

    //4. SERVER
app.listen(8000, ()=>{console.log("port is running on 8000")})