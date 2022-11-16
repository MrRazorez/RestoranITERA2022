import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import NavbarScreen from "./navbar";

export class Layout extends Component {
  render() {
    return (
      <div>
        <NavbarScreen />
        <Outlet />
      </div>
    );
  }
}

export default Layout;
