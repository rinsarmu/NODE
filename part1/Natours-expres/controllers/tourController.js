const Tour = require('../models/tourModels')
const APIFeatures = require('./../utils/ApiFeatures');
const {Data} = require('./../utils/utilApp');




// exports.getAllTours = async (req, res) => {
//     try {
//       // EXECUTE QUERY
//       const features = new APIFeatures(Tour.find(), req.query)
//         .filter()
//         .sort()
//         .limitFields()
//         .paginate();
//       const tours = await features.query;
  
//       // SEND RESPONSE
//       res.status(200).json({
//         status: 'success',
//         results: tours.length,
//         data: {
//           tours
//         }
//       });
//     } catch (err) {
//       res.status(404).json({
//         status: 'fail',
//         message: err
//       });
//     }
//   };

exports.aliasTopTours = (req,res,next)=>{
    req.query.limit = '5'
    req.query.sort = 'ratingsAverage,price'
    req.query.fields = 'name,price, ratingsAverages,summary,difficulty'
    next();
}
exports.getAllTours = async(req, res) => {
    try{
       
        const tours = await Data(req,Tour)
        //Send Response
        res.status(200).json({
            status:'success',
            results:tours.length,
            data: {
                tours:tours
            }
        })
    } catch(err){
        console.log(err)
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

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

//Using Pipeline
exports.getTourStats = async(req,res,)=>{
    try{

        const stats = await Tour.aggregate([
            {
                $match: {
                    ratingsAverage: {$gte: 4.5}
                }
            },
            {
                $group:{
                    // _id: '$ratingsAverage',
                    _id:{$toUpper: '$difficulty'},
                    numTours: {
                        $sum: 1 
                    },
                    numRatings:{
                        $sum: '$ratingsQuantity'
                    },
                    avgRating:{
                        $avg: '$ratingsAverage'
                    },
                    avgPrice:{
                        $avg: '$price'
                    },
                    minPrice:{
                        $min: '$price'
                    },
                    maxPrice:{
                        $max: "$price"
                    }

                    
                }
            },
            {
                $sort:{
                    avgPrice: 1

                }
            // {
            //     $match:{
            //         _id:{
            //             $ne: 'EASY'
            //         }
            //     }
            }
        ])

        res.status(200).json({
            status:'success',
            data:{
                stats
            }
        })

    } catch(err){
        res.status(500).json({
            status: 'fail',
            message: err
        })
    }
}

exports.getMonthlyPlan = async(req,res)=>{
    try{

        const year = req.params.year*1
        const plan = await Tour.aggregate([
            {
                $unwind:'$startDates'
            },
            {
                $match:{
                    startDates:{
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)

                    }
                }
            },
            {
                $group :{
                    _id: {
                        $month: '$startDates'
                    },
                    numToursStart: {
                        $sum:1
                    },
                    tours:{
                        $push:"$name"

                        
                    }
                }
             },
             {
                $addFields:{month: '$_id'}
             },
             {
                $project: {
                    _id:0
                }
             },
             {
                $sort:{numToursStart: -1}
             },
             {
                $limit: 12
             }
        ])

        res.status(200).json({
            status:'success',
            data:{
                plan
            }
        })
    } catch(err) {
        console.log(err)
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }

}