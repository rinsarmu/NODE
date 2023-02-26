const Tour = require('../models/tourModels')
const APIFeatures = require('./../utils/ApiFeatures');



exports.getAllTours = async (req, res) => {
    try {
      // EXECUTE QUERY
      const features = new APIFeatures(Tour.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const tours = await features.query;
  
      // SEND RESPONSE
      res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
          tours
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };

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
