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
    workerId: z.string().min(3,{message:'Provide a valide worker'}),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Provide a valid date' }),
    type: z.string().min(3,{message:'Provide a valide type'}),
  });
  const [absences, setAbsences] = useState([]);

  useEffect(() => {
    if (absenceData) {
      setAbsences(absenceData.data);
    }
  }, [absenceData]);

  

  const handleAdd = async (absence) => {
    
    const {data} = await addAbsence(absence);
    setAbsences(prev => [...prev, data.data])

  };

  return (
    <div className="container p-8">
      <h1 className="font-bold text-2xl">Absences</h1>
      <Table data={absences} deleteItem={deleteAbsence} addItem={handleAdd} editItem={editAbsence} formConfig={absenceFormConfig} setData={setAbsences} zodObject={Absence} />

    </div>
  );
};
