import React from "react";
import Side from "./Side";
import { Outlet } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";
export const Wrapper = () => {
  return (
    <>
    <RequireAuth>
      <Side />
      <Outlet />
      </RequireAuth>
    </>
  );
};
