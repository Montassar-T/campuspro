const Absence = require('../models/Absence');




const getAll = async(req,res)=>{
    try {
        const workers = await Absence.find().exec();
        if (workers.length > 0) {
          res.status(200).json({
            status: "success",
            data: workers,
          });
        }
      } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Server Error" });
      }
}


const addAbsence = async (req,res) =>{
    const {date,type,workerId} =  req.body
    try{
      const newAbsence = new Absence({date,type,workerId});
      const saved = await newAbsence.save();
      if(saved){
        res.status(200).json({data:newAbsence})
      }
  
    }catch(err){
      console.log(err)
      res.status(500).json({message: "Server error"})
    }
  }


  const deleteAbsence = async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await Absence.deleteOne({ _id: id });
      if (deleted.deletedCount > 0) { // Check if a document was deleted
          res.status(200).json({
            success: true,
            message: "Absence deleted successfully",
            id:id
          });
        } else {
          res.status(404).json({ // Change status code to 404 if worker not found
            success: false,
            message: "Absence not found",
          });
        }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };
  

  const editAbsence = async(req,res)=>{
    const {_id, date, workerId, type}=  req.body;
    try{
      let absence = await Absence.findById(_id).exec();
      if(!absence){
        res.status(404).json({message:"Worker not found"})
      }
      else{
        absence.date = date;
        absence.workerId=workerId;
        absence.type=type;
        const saved = await absence.save()
        if(saved){
          res.status(200).json({message:"Absence updated successfuly"});
  
        }else{
          res.status(500).json({message:"Error updating absence"})
        }
      }
    }catch(err){
      console.log(err);
      res.status(500).json({message: "Server error"})
    }
  }

module.exports= {
    getAll,
    addAbsence,
    deleteAbsence,
    editAbsence
}