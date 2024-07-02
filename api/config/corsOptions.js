const allowedOrigins = require("./allowedOrigins")

const corsOptions = {
    origin: (origin,callback)=>{
        if(allowedOrigins.indexOf(origin) != -1 || !origin){
            callback(null,true)
        }else{
            callback(new Error("Denied by cors"))
        }
    },
    Credential: true, //allow the sent of cookies
    optionsSuccessStatus: 200

   
}

module.exports = corsOptions