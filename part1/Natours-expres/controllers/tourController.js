const fs = require('fs');
const Tour = require('../models/tourModels')
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf8'))

exports.getAllTours = async(req, res) => {
    try{
        const tours = await Tour.find();
        res.status(200).json({
            status:'success',
            results:tours.length,
            requestedAt: req.requestTime,
            data:{
                tours:tours 
            }
        })
    }  catch(err){
        res.status(500).json({
            status: 'fail',
            message: err
        })
        
    }
}

// exports.checkId = (req,res,next,val)=>{
//     const {id} = req.params;
//     let tour = tours.find(el=> el.id == id)
//     if(!tour){
//        return res.status(404).json({
//             status: 'fail',
//             message: 'tour not found'
//         })
//     }
//     next();
// }

// exports.checkBody =(req,res,next)=>{
//     const {name,price} = req.body;
//     if(!name || !price){
//         return res.status(400).json({
//             status: 'fail',
//             message: 'Missing name or price'
//         })

//     }
//     next()

// }

exports.getTour = async (req, res) => {
    try{
        const {id} = req.params;
        const tour = await Tour.findById(id);
        // const tour = await Tour.findOne({_id: req.params.id})
      
        res.status(200).json({
            status:'success',
            data:{
                tour:tour 
            }
        })
    } catch(err) {
        res.status(404).json({
            status: 'fail',
            message: 'tour not found'
        })
    }
    

}

exports.createTour = async (req, res) => {
    console.log(req.body)
    try{
        console.log("created")
        
        const newTour = await Tour.create(req.body)
        res.status(201).json(
            {
                status: "success", 
                tours: newTour
            })
    } catch(err){
        res.status(400).json(
            {
                status: "fail", 
                message:err
                
            })
    }

}

exports.updateTour = async (req, res) => {
   
    try{
        const {id} = req.params;
        const tour = await Tour.findByIdAndUpdate(id, req.body, ({
            new:true,
            runValidators: true
        }));
        res.status(200).json({
            status:'success',
            data:{
                tour
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'fail',
            message: err
        })
    }
}

exports.deleteTour =  async (req, res) => {
  
    try{
        const{id} = req.params
       await Tour.findByIdAndDelete(id)
        console.log('Deleted')
        res.status(204).json({
            status:'success',
            data:null
        })
    } catch(err){
        res.status(400).json({
            status:'success',
            message:"Something is happened during"
        })
    }
   
}
