const jwt = require('jsonwebtoken');


const verifyJWT= (res,req,next)=>{
    console.log('Headers:', req.headers); // Log all headers

    const authHeader = req.headers.authorization ||req.headers.Authorization; 
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