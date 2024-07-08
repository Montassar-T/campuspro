import React, { useEffect, useState } from "react";
import {  useDeleteWorkerMutation, useFetchWorkersMutation } from "../features/workers";
import Table from "./Table";

const Workers = () => {
  // const dispatch = useDispatch();
  // const { workers } = useSelector((state) => state.workers);
  const [fetchWorkers] = useFetchWorkersMutation();
  const [deleteWorker] = useDeleteWorkerMutation();

  const [workers, setWorkers] = useState([]);


  
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
    <Table data={workers} deleteItem={deleteWorker} setData={setWorkers}  />



    </div>
  );
};

export default Workers;
