// Entry of the application.
// //all db configuration, environment et
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const Tour = require('./../../models/tourModels')
const User = require('./../../models/userModels')
const Review = require('./../../models/reviewModel')



dotenv.config({path: './config.env'})
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  
    
})
    .then(con=>{
        console.log("Db connection established")
    });

// REad json file
const tours = fs.readFileSync(path.join(__dirname,'/tours.json'))
const reviews = fs.readFileSync(path.join(__dirname,'/reviews.json'))
const users = fs.readFileSync(path.join(__dirname,'/users.json'))

const importData = async (req, res)=>{
    try{
        await Tour.create(JSON.parse(tours))
    //  await User.create(JSON.parse(users))
    //  await Review.create(JSON.parse(reviews))

        console.log("Data succesfully saved")
    }catch(err){
        console.error(err)

    }
    process.exit()
}

const deleteData = async(req, res)=>{
    try{
        await Tour.deleteMany()
        // await User.deleteMany()
        // await Review.deleteMany()

        console.log("Data successfully deleted")
    } catch(err){
        console.log("SOmething is happend in th json file")
    }
    process.exit()
}
console.log(process.argv[2])
process.argv[2] === '--import'
    ?importData()
    :deleteData();

    // node dev-data/data/import-dev-data.js --import
