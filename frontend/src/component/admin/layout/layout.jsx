import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

import { IoHome, IoPersonCircleOutline } from "react-icons/io5";
import { HiShoppingBag } from "react-icons/hi";
import { MdMenuBook } from "react-icons/md";
import { AiTwotoneContainer } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

import "./style.css";

import jwt_decode from "jwt-decode";
import axios from "axios";

function AdminLayout() {
  var [userName, setUserName] = useState("");
  var [loading, setLoading] = useState(true);
  var navigate = useNavigate();

  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    Tokens();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  async function Tokens() {
    if (window.localStorage.getItem("restoran_token")) {
      try {
        await axios
          .post("http://localhost:8000/users/token", {
            token: window.localStorage.getItem("restoran_token"),
          })
          .then((res) => {
            setLoading(false);
            if (res.status !== 202) {
              window.location.replace("/login");
            } else {
              const data = jwt_decode(
                window.localStorage.getItem("restoran_token")
              );
              setUserName(data.userName);
            }
          });
      } catch (error) {
        if (error.response) {
          window.localStorage.removeItem("restoran_token");
          window.location.replace("/login");
        }
      }
    } else {
      window.location.replace("/login");
    }
  }

  async function Logout(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8000/users/logout", {
          token: window.localStorage.getItem("restoran_token"),
        })
        .then((res) => {
          if (res.status === 202) {
            window.localStorage.removeItem("restoran_token");
            navigate("/login");
          }
        });
    } catch (error) {
      console.log(error.response);
    }
  }

  const pathname = useLocation().pathname;
  const pathnameSplit = pathname.split("/");
  const [sidebar, setsidebar] = useState(false);

  return (
    <div className="wrapper d-flex align-items-stretch">
      {loading ? (
        <div className="d-flex w-100 flex-column align-items-center p-5 pt-5">
          <div
            className="spinner-border text-primary"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>

          <h2 id="content" className="text-center pt-4">
            Loading...
          </h2>
        </div>
      ) : (
        <>
          <nav
            id="sidebar"
            className={`${sidebar ? "active" : ""}`}
            style={{
              position: "fixed",
              zIndex: "999",
              height: "100%",
            }}
          >
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
                <h6 className="text-white mt-2">Welcome, {userName}</h6>
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
                    pathname === "/admin/transaksi" ||
                    pathnameSplit[2] === "transaksi-detail"
                      ? "bg-primary"
                      : ""
                  } px-4 py-2`}
                >
                  <Link className="text-decoration-none" to="/admin/transaksi">
                    <HiShoppingBag
                      className="me-3"
                      style={{ fontSize: "18pt" }}
                    />
                    Transaksi
                  </Link>
                </li>
                <li
                  className={`${
                    pathname === "/admin/menu" ||
                    pathnameSplit[2] === "tambah" ||
                    pathnameSplit[2] === "edit" ||
                    pathnameSplit[2] === "detail"
                      ? "bg-primary"
                      : ""
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
                <li
                  className={`${
                    pathname === "/" ? "bg-primary" : ""
                  } px-4 py-2`}
                >
                  <Link
                    className="text-decoration-none"
                    to="/"
                    onClick={(e) => Logout(e)}
                  >
                    <FiLogOut className="me-3" style={{ fontSize: "18pt" }} />
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <div
            id="content"
            className="p-3 p-sm-5 pt-5 mt-4 mt-sm-0"
            style={
              width > 992
                ? {
                    marginLeft: sidebar ? "0" : "20%",
                  }
                : {
                    marginLeft: 0,
                  }
            }
          >
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
}

export default AdminLayout;
