const jwt = require('jsonwebtoken');


const verifyJWT= (res,req,next)=>{
    const authHeader = req.header.authorization || req.header.Authorization;

    if( !authHeader.startsWith("Bearer")){
        return res.status(401).send({message:"Unauthorized"})
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,decode)=>{
        if(err) return res.status(403).send({message:"Forbidden"})
        req.user= decode.UserInfo.id;
        next();
    } )
}
module.exports = verifyJWT;