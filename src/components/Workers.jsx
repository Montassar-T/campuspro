import React, { useEffect, useState } from "react";
import {  useAddWorkerMutation, useDeleteWorkerMutation, useEditWorkerMutation, useFetchWorkersQuery } from "../features/workers";
import Table from "./Table";
import z from "zod";

import { workerFormConfig } from "../config/workerFormConfig";

const Workers = () => {
  // const dispatch = useDispatch();
  // const { workers } = useSelector((state) => state.workers);
  const {data: workersData} = useFetchWorkersQuery();
  const [deleteWorker] = useDeleteWorkerMutation();
  const [addWorker] = useAddWorkerMutation();
  const [editWorker] = useEditWorkerMutation();

  const [workers, setWorkers] = useState([]);


  const handleAdd = async (worker)=>{
    const {data} = await addWorker(worker)
    setWorkers(prev=> [...prev,data.data])
  }

  const Worker = z.object({
    firstName: z.string().min(1,{ message: "Firstame is required" }),
    lastName: z.string().min(1,{ message: "Lastname is required" }),
    cin: z.string().min(8, { message: "Provide a valid Cin" }),
    fonction: z.string().min(1,{ message: "Provide a valid Fonction" }),
  });
  
  useEffect(() => {
   if(workersData){
    setWorkers(workersData.data)
   }
  }, [workersData]);
  
  

 
 


  return (
    <div className="container p-8">
    <h1 className="font-bold text-2xl">Workers</h1>
    <Table data={workers} deleteItem={deleteWorker} addItem={handleAdd} setData={setWorkers} editItem={editWorker} zodObject={Worker} formConfig={workerFormConfig}  />



    </div>
  );
};

export default Workers;
