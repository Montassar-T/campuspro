const Worker = require('../models/Worker');







const getAll = async (req,res)=>{
    try{
        const workers =await Worker.find().exec();
        if(workers)
        {res.status(200).json({
            status: 'success',
            data: workers
        });}

    }catch(err){
        console.log(err);
        res.status(500).send({message:'Server Error'});
    }
}





module.exports = {getAll}