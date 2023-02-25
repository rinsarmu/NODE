// Entry of the application.
// //all db configuration, environment et
const dotenv = require('dotenv')
const app = require('./app')
const mongoose = require('mongoose');
const { Number } = require('mongoose');

dotenv.config({path: './config.env'})
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    strictQuery: false
    
})
    .then(con=>{
        console.log(con.connections)
        console.log("Db connection established")
    });

const tourSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'A Tour must have a name'],
        unique: true
    },
    rating: {
        type:Number,
        default: 4.5
    },
    price:{
        type: Number,
        required: [true, 'A tour must have a price']
    }
})

const Tour = mongoose.model('Tour', tourSchema)
// console.log(process.env)
const PORT = process.env.PORT || 8000

app.listen(PORT, ()=>{console.log("port is running on 8000")})

