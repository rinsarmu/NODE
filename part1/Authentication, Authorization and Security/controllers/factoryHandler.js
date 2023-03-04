const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/AppError')

exports.deleteOne = Model=> catchAsync(async (req, res, next) => {
    const{id} = req.params
   const doc = await Model.findByIdAndDelete(id)
    if(!doc){
        return next(new AppError(`No doc is found with this id`, 404))
     }
    console.log('Deleted')
    res.status(204).json({
        status:'success',
        data:null
    })
   
  
})