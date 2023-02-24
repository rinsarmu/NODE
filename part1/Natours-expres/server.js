//Entry of the application 
//all db configuration, environment et
const app = require('./app')
const PORT = process.env.PORT || 8000

app.listen(PORT, ()=>{console.log("port is running on 8000")})
