import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWorkers } from "../features/workers";
import Table from './Table'
import { deleteWorker } from "../features/workers";

const Workers = () => {
  const dispatch = useDispatch();
  const { workers , error } = useSelector((state) => state.workers);

  useEffect(() => {
    dispatch(fetchWorkers());
  }, [dispatch]);






  
  return (
    <div className="container">
      <h1 className="font-bold text-2xl">Workers</h1>
      <Table data={workers}  />
      
    </div>
  );
};

export default Workers;
