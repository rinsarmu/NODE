const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'A Tour must have a name'],
        unique: true,
        trim: true

    },
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
    rating: {
        type:Number,
        default: 4.5
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
        default: Date.now()
    },
    startDates: [Date]

})

const Tour = mongoose.model('Tour', tourSchema)
module.exports = Tour