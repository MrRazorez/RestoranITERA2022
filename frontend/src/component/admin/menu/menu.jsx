import React from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Form, Breadcrumb } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import BreadcrumbComponent from "./breadcrumb";
import { BsPencilFill, BsFillTrashFill } from "react-icons/bs";

const MenuAdmin = () => {
  const navigate = useNavigate();
  const data = [
    {
      id: "DR1",
      img: "",
      name: "Sate",
      price: "Rp. 2.000",
    },
  ];

  return (
    <div>
      <BreadcrumbComponent />

      <div className="d-flex my-5">
        <Button
          variant="success"
          className="d-flex align-items-center"
          onClick={() => navigate("/admin/tambah")}
        >
          <AiOutlinePlus className="fs-5 me-2" /> Tambah Item
        </Button>
        <Form className="d-flex ms-auto">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-primary">Search</Button>
        </Form>
      </div>

      <Table responsive>
        <thead className="bg-primary text-light">
          <tr>
            <th>No</th>
            <th>ID Produk</th>
            <th>Gambar</th>
            <th>Nama</th>
            <th>Harga</th>
            <th className="text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{e.id}</td>
                <td>
                  <img src={e.img} width={100} />
                </td>
                <td>{e.name}</td>
                <td>{e.price}</td>
                <td width={210}>
                  <div className="d-flex ">
                    <Button
                      variant="warning"
                      className="me-2"
                      onClick={() => navigate("/admin/edit")}
                    >
                      <BsPencilFill />
                    </Button>
                    <Button variant="danger" className="me-2">
                      <BsFillTrashFill />
                    </Button>
                    <Button
                      variant="dark"
                      onClick={() => navigate("/admin/detail")}
                    >
                      Detail
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default MenuAdmin;
