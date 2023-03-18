const Tour = require('../models/tourModels')
const APIFeatures = require('./../utils/ApiFeatures');
const {Data} = require('./../utils/utilApp');
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/AppError')
const factory = require('./factoryHandler')




// exports.getAllTours = async (req, res, next) => {
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
// exports.getAllTours = catchAsync(async(req, res, next) => {

//         const tours = await Data(req,Tour)
//         //Send Response
//         if(tours.length=== 0){
//             // console.log("No tours found")
//             return next(new AppError(`No tours found`, 404))
//          }
//         res.status(200).json({
//             status:'success',
//             results:tours.length,
//             data: {
//                 tours:tours
//             }
//         })
    
// })




exports.createTour= factory.createOne(Tour)
exports.updateTour = factory.updateOne(Tour)
exports.deleteTour = factory.deleteOne(Tour)
exports.getTour = factory.getOne(Tour,{path: 'reviews'})
exports.getAllTours = factory.getAll(Tour)
// exports.getTour = catchAsync(async (req, res, next) => {
 
//     const {id} = req.params;
//     const tour = await Tour.findById(id).populate('reviews');
//     // const tour = await Tour.findOne({_id: req.params.id})
  
    
//     if(!tour){
//        return next(new AppError(`No tour found`, 404))
//     }
//     res.status(200).json({
//         status:'success',
//         data:{
//             tour:tour 
//         }
//     })
// })

// exports.createTour = catchAsync(async (req, res, next) => {
    
//     console.log("created")
    
//     const newTour = await Tour.create(req.body)
//     res.status(201).json(
//         {
//             status: "success", 
//             tours: newTour
//         })

// })

// exports.updateTour = catchAsync(async (req, res, next) => {
//         const {id} = req.params;
//         const tour = await Tour.findByIdAndUpdate(id, req.body, ({
//             new:true,
//             runValidators: true
//         }));

//         if(!tour){
//             return next(new AppError(`No tour found`, 404))
//          } 
//         res.status(200).json({
//             status:'success',
//             data:{
//                 tour
//             }
//         })
// })

// exports.deleteTour =  catchAsync(async (req, res, next) => {
//     const{id} = req.params
//    const tour = await Tour.findByIdAndDelete(id)
//     if(!tour){
//         return next(new AppError(`No tour found`, 404))
//      }
//     console.log('Deleted')
//     res.status(204).json({
//         status:'success',
//         data:null
//     })
   
   
// })

//Using Pipeline
exports.getTourStats = catchAsync(async(req,res,next)=>{


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

    
})

exports.getMonthlyPlan = catchAsync(async(req,res,next)=>{
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
})