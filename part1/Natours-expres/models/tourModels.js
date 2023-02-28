const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator')

const tourSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'A Tour must have a name'],
        unique: true,
        trim: true,
        maxLength:[40, ' A Tour must have less or equal 40 characters'],
        minLength:[10, ' A Tour must have more or equal 10 characters'],
        validate: [validator.isAlpha, 'Tour name must only contain characters']

    },
    slug: String,
    duration:{
        type: String,
        required:[true, 'A Tour must have a duration'],
        trim: true
    },
    maxGroupSize:{
        type: Number,
        required:[true, 'A Tour must have a maxGroupSize']
    },
    difficulty:{
        type: String,
        required:[true, 'A Tour must have a difficult'],
        enum:{
            values: ['easy', 'medium', 'difficult'],
            message: "Difficult is either: easy, medium or difficult "
        }
    },
  
    ratingsAverage: {
        type:Number,
        default: 4.5,
        min: [1, 'A tour must be greater than 1.0'],
        max: [5, 'A Tour must be less 5.0']

    },
    ratingsQuantity:{
        type: Number,
        default: 0
    },
    price:{
        type: Number,
        required: [true, 'A tour must have a price']
    },
    priceDiscount:{
        type: Number,
        validate: {
            validator: function(val){
                // this only points to current doc on new document creation
            return val < this.price// 100 < 200
            },
            message: 'The priceDiscount must be less than the price'

        }
    },
    summary:{
        type: String,
        required: [true, "A tour must have a summary"],
        trim: true
    },
    description:{
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have acover image']
    },
    images:[String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date],
    secretTour:{
        type: Boolean,
        default: false
    }

},
{
    toJSON:{ virtuals: true},
    toObject:{ virtuals: true}
}
)

tourSchema.virtual('durationWeeks').get(function(){
    return this.duration / 7
})

// Document middleware: runs before saved()  and .create() 
tourSchema.pre('save', function(next){
    // console.log(this)
    this.slug = slugify(this.name, {lower: true})
    next();

})

// tourSchema.pre('save', function(next){
//     console.log("WIll save documetn...")
//     next();
// })

// tourSchema.post('save', function(doc,next){
// console.log(doc)
// next()
// })

//QUERY MIDDLEWARE 
// tourSchema.pre('find', function(next){

tourSchema.pre(/^find/, function(next){

    this.find({secretTour: {$ne: true}})
    this.start = Date.now();
    next()
})

tourSchema.post(/^find/, function(doc, next){
    // console.log(`Query took ${Date.now() - this.start} millisecond`)
    next()
})

//Aggregation middleware
tourSchema.pre('aggregate', function(next){
    this.pipeline().unshift({$match:{secretTour:{$ne: true}}})
    console.log(this.pipeline())

    next()
})


const Tour = mongoose.model('Tour', tourSchema)
module.exports = Tour