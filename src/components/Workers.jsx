import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWorkers } from "../features/workers";

const Workers = () => {
  const dispatch = useDispatch();
  const { workers, loading, error } = useSelector((state) => state.workers);

  useEffect(() => {
    dispatch(fetchWorkers());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1>Workers</h1>
      <table className="table-auto   w-full ">
        <thead className="bg-zinc-900   text-white">
          <tr className="rounded">
            <th className="p-4">First Name</th>
            <th>Last Name</th>
            <th>CIN</th>
            <th>Fonction</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workers.length > 0 ? (
            workers.map((worker) => (
              <tr  key={worker._id}>
                <td className="p-4">{worker.firstName}</td>
                <td>{worker.lastName}</td>
                <td>{worker.cin}</td>
                <td>{worker.fonction}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No workers found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Workers;
