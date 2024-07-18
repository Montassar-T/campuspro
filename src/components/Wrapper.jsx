import React, { useEffect, useState } from "react";
import Side from "./Side";
import { Outlet } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";
import { useGetAbsencesQuery } from "../features/absence";
export const Wrapper = () => {
  const { data: absenceData } = useGetAbsencesQuery();
  const [absences, setAbsences] = useState([]);

  useEffect(() => {
    if (absenceData) {
      setAbsences(absenceData.data);
    }
  }, [absenceData]);


  return (

    <>
    <RequireAuth>
      <Side />
      <Outlet absences={absences} setAbsences={setAbsences}   />
      
      </RequireAuth>
    </>
  );
};
