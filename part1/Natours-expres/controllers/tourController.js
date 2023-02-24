const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf8'))

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status:'success',
        results:tours.length,
        requestedAt: req.requestTime,
        data:{
            tours:tours 
        }
    })
}

exports.getTour =  (req, res) => {
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

exports.createTour =  (req, res) => {
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

exports.updateTour =  (req, res) => {
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

exports.deleteTour =  (req, res) => {
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
