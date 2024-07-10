import React, { useEffect, useState } from "react";
import {  useAddWorkerMutation, useDeleteWorkerMutation, useEditWorkerMutation, useFetchWorkersMutation } from "../features/workers";
import Table from "./Table";
import z from "zod";

const Workers = () => {
  // const dispatch = useDispatch();
  // const { workers } = useSelector((state) => state.workers);
  const [fetchWorkers] = useFetchWorkersMutation();
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
    const fetchData = async () => {
      try {
        
        const {data} = await fetchWorkers();
        setWorkers(data.data);
        
      } catch (error) {
        console.error("Failed to fetch workers:", error);
        
      };
      
    }
    fetchData();
  }, [fetchWorkers]);
  
  

 
 


  return (
    <div className="container p-8">
    <h1 className="font-bold text-2xl">Workers</h1>
    <Table data={workers} deleteItem={deleteWorker} addItem={handleAdd} setData={setWorkers} editItem={editWorker} zodObject={Worker}  />



    </div>
  );
};

export default Workers;
