import React from "react";
import Side from "./Side";
import { Outlet } from "react-router-dom";

export const Wrapper = () => {
  return (
    <>
      <Side />
      <Outlet />
    </>
  );
};
