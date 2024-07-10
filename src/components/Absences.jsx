import React, { useEffect, useState } from "react";
import Table from "./Table";

 import {absenceFormConfig} from '../config/absenceFormConfig'
import {
  useAddAbsenceMutation,
  useDeleteAbsenceMutation,
  useEditAbsenceMutation,
  useGetAbsencesQuery,
} from "../features/absence";
import z from "zod";

export const Absences = () => {
  const { data: absenceData } = useGetAbsencesQuery();
  const [editAbsence] = useEditAbsenceMutation();
  const [deleteAbsence] = useDeleteAbsenceMutation();
  const [addAbsence] = useAddAbsenceMutation();

  const Absence = z.object({
    date: z.date(),
    type: z.string(),
    workerId: z.string(),
  });
  const [absences, setAbsences] = useState([]);

  useEffect(() => {
    if (absenceData) {
      console.log(absenceData)
      setAbsences(absenceData.data);
    }
  }, [absenceData]);

  // const handleAdd = async () => {
    

  // };

  return (
    <div className="container p-8">
      <h1 className="font-bold text-2xl">Absences</h1>
      <Table data={absences} deleteItem={deleteAbsence} addItem={addAbsence} editItem={editAbsence} formConfig={absenceFormConfig} setData={setAbsences} zodObject={Absence} />

    </div>
  );
};
