import React from "react";
import { Outlet } from "react-router";

function Layout() {
  return (
    <>
      <h2>Layout</h2>
      <Outlet />
    </>
  );
}

export default Layout;
