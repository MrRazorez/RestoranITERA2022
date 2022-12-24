import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import NavbarScreen from "./navbar";
import FooterScreen from "./footer";

export class Layout extends Component {
  render() {
    return (
      <div>
        <NavbarScreen />
        <Outlet />
        <FooterScreen />
      </div>
    );
  }
}

export default Layout;
