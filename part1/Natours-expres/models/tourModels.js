const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'A Tour must have a name'],
        unique: true,
        trim: true

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
        required:[true, 'A Tour must have a difficult']
    },
  
    ratingsAverage: {
        type:Number,
        default: 4.5
    },
    ratingsQuantity:{
        type: Number,
        default: 0
    },
    price:{
        type: Number,
        required: [true, 'A tour must have a price']
    },
    priceDiscount:Number,
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
    console.log(`Query took ${Date.now() - this.start} millisecond`)
    next()
})

const Tour = mongoose.model('Tour', tourSchema)
module.exports = Tour