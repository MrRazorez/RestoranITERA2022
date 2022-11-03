import React from "react";
import { Outlet } from "react-router-dom";
import NavbarScreen from "./navbar";

function Layout() {
  return (
    <div>
      <NavbarScreen />
      <Outlet />
    </div>
  );
}

export default Layout;
