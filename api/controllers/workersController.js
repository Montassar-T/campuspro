const Worker = require("../models/Worker");

const deleteWorker = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Worker.deleteOne({ _id: id });
    if (deleted.deletedCount > 0) { // Check if a document was deleted
        res.status(200).json({
          success: true,
          message: "Worker deleted successfully",
          id:id
        });
      } else {
        res.status(404).json({ // Change status code to 404 if worker not found
          success: false,
          message: "Worker not found",
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

const getAll = async (req, res) => {
  try {
    const workers = await Worker.find().exec();
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
};


const addWorker = async (req,res) =>{
  const {lastName,firstName,cin,fonction} =  req.body
  try{
    const newWorker = new Worker({lastName,firstName,cin,fonction});
    const saved = await newWorker.save();
    if(saved){
      res.status(200).json({data:newWorker})
    }

  }catch(err){
    console.log(err)
    res.status(500).json({message: "Server error"})
  }
}

const editWorker = async(req,res)=>{
  const {_id, lastName, firstName, cin, fonction}=  req.body;
  try{
    let worker = await Worker.findById(_id).exec();
    if(!worker){
      res.status(404).json({message:"Worker not found"})
    }
    else{
      worker.lastName = lastName;
      worker.firstName=firstName;
      worker.cin=cin;
      worker.fonction=fonction;
      const saved = await worker.save()
      if(saved){
        res.status(200).json({message:"Worker updated successfuly"});

      }else{
        res.status(500).json({message:"Error updating worker"})
      }
    }
  }catch(err){
    console.log(err);
    res.status(500).json({message: "Server error"})
  }
}

module.exports = { getAll, deleteWorker, addWorker, editWorker };
