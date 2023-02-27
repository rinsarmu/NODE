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
  
    
})
    .then(con=>{
        console.log(con.connections)
        console.log("Db connection established")
    }).catch(err=>{console.log(err, "connection error")});
    
    
    
    const PORT = process.env.PORT || 8000
    app.listen(PORT, ()=>{console.log("port is running on 8000")})



