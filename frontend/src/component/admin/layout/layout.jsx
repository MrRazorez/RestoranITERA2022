import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { IoHome, IoPersonCircleOutline } from "react-icons/io5";
import { HiShoppingBag } from "react-icons/hi";
import { MdMenuBook } from "react-icons/md";
import { AiTwotoneContainer } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

import "./style.css";

function AdminLayout() {
  const pathname = useLocation().pathname;
  const [sidebar, setsidebar] = useState(false);

  return (
    <div className="wrapper d-flex align-items-stretch">
      <nav id="sidebar" className={`${sidebar ? "active" : ""}`}>
        <div className="custom-menu">
          <button
            type="button"
            id="sidebarCollapse"
            className="btn btn-dark"
            onClick={() => {
              setsidebar(!sidebar);
            }}
          >
            <FaBars />
            <span className="sr-only">Toggle Menu</span>
          </button>
        </div>
        <div className="pt-5">
          <div className="d-flex flex-column align-items-center my-3 ">
            <IoPersonCircleOutline style={{ fontSize: "60pt" }} />
            <h6 className="text-white mt-2">Admin</h6>
          </div>
          <ul className="list-unstyled components mb-5 ">
            <li
              className={`${
                pathname === "/admin" ? "bg-primary" : ""
              } px-4 py-2`}
            >
              <Link className="text-decoration-none" to="/admin">
                <IoHome className="me-3" style={{ fontSize: "18pt" }} />
                Home
              </Link>
            </li>
            <li
              className={`${
                pathname === "/admin/transaksi" ? "bg-primary" : ""
              } px-4 py-2`}
            >
              <Link className="text-decoration-none" to="/admin/transaksi">
                <HiShoppingBag className="me-3" style={{ fontSize: "18pt" }} />
                Transaksi
              </Link>
            </li>
            <li
              className={`${
                pathname === "/admin/menu" ? "bg-primary" : ""
              } px-4 py-2`}
            >
              <Link className="text-decoration-none" to="/admin/menu">
                <MdMenuBook className="me-3" style={{ fontSize: "18pt" }} />
                Menu
              </Link>
            </li>
            <li
              className={`${
                pathname === "/admin/laporan" ? "bg-primary" : ""
              } px-4 py-2`}
            >
              <Link className="text-decoration-none" to="/admin/laporan">
                <AiTwotoneContainer
                  className="me-3"
                  style={{ fontSize: "18pt" }}
                />
                Laporan
              </Link>
            </li>
            <li className={`${pathname === "/" ? "bg-primary" : ""} px-4 py-2`}>
              <Link className="text-decoration-none" to="/">
                <FiLogOut className="me-3" style={{ fontSize: "18pt" }} />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div id="content" className="p-5 pt-5">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
