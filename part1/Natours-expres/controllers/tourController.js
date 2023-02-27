const Tour = require('../models/tourModels')
const APIFeatures = require('./../utils/ApiFeatures');



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

exports.getAllTours = async(req, res) => {
    try{
        // BUILD QUERY
        // Filtering using where
        // const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy')
        console.log(req.query)

        //1. Filtering
        const queryObj = {...req.query}
        const excludedFields = ['page', 'sort', 'limit','fields'] //excluded object when we filter the data
        excludedFields.forEach(el => delete queryObj[el])


        //2. Advanced Filtering
        let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|lte|gt|lt)\b/g,match =>`$${match}`)
        console.log("dd")
        console.log(JSON.parse(queryStr))

        // let querySort = {}
        // if(req.query.sort){
        //     // const sortBy = req.query.sort.split(',').join(" ")
        //     // const sortBy = [...req.query.sort]
        //     // console.log(sortBy)
        //     const name = req.query.sort
        //     console.log(name, "ddds")
        //     let c = {}
        //     // for(let i = 0; i <name.length; i++){
        //     //     querySort[name[i]] = -1
        //     // }
        //     console.log(querySort)
            
        // }
        

        // const query = await Tour.find(JSON.parse(queryStr)).sort({name: 1}).select('name')
        let queryFields = "name"
        let querySort = {};
        let queryLimit = 2;

        //3. Sort
        if(req.query.sort){
           console.log("Sort: ", req.query.sort)
           
           const sortBy = req.query.sort.split(',')
           for(let item of sortBy){
            querySort[item]=-1
           }

        }else{
            querySort = {name:1};

        }

        //4. Fields
        if(req.query.fields){
            console.log("req.query Fields", req.query.fields)
            queryFields = req.query.fields.split(',').join(' ')
        } else {
            queryFields = '-__v'
            console.log("No fields")
        }
        
        console.log("FIELDS: ", queryFields)
        //5. Limit
        if(req.query.limit){
            console.log("Limit: ", req.query.limit)
            queryLimit = +req.query.limit
        } else {
            queryLimit = 2
        }

        if(req.query.page){
            console.log("Query Page", req.query.page)
            // const page = req.query.page * 1 || 1;
            // const limit = req.query.limit * 1 || 100;
            // const skip = (page - 1) * limit;
        
            // query = query.skip(skip).limit(limit);
        
        }

        const query = await Tour.find(JSON.parse(queryStr)).select(queryFields).sort(querySort).limit(queryLimit)
  
        // console.log(query)
        // Execute Query 

        // if(req.query.sort){
        //     const sortBy = req.query.sort.split(',').join(' ')
        //     console.log(sortBy,'LLLL')

        //     query = query.sort({name: 1})
        // }

        const tours = await query

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
