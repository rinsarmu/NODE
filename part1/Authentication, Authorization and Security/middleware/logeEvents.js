const path = require('path');
const fsPromise = require('fs').promises;
const fs = require('fs')

const logEvents = async (msg,logName )=>{
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${msg}\n`

    try{
        if(!fs.existsSync(path.join(__dirname, '..', 'logs', logName), logItem)){
        await fsPromise.mkdir(path.join(__dirname, '..', 'logs'))
        }
        
        await fsPromise.appendFile(path.join(__dirname, '..', 'logs', logName), logItem)
    } catch(err){
        console.error(err)
    }
}

module.exports = logEvents