import React from "react";
import { Row, Col } from "react-bootstrap";
import { Table, Button, Form, Breadcrumb } from "react-bootstrap";
import { AiFillFileText } from "react-icons/ai";

const LaporanAdmin = () => {
  const data = [
    {
      id: "DR1",
      tgl: "22-07-2022",
      name: "Sate",
      order: "Sate",
      price: "Rp. 2.000",
    },
  ];

  return (
    <div>
      <h4 className="fw-bold">Laporan</h4>
      <h6 className="mb-5">Halaman tentang laporan hasil penjualan</h6>

      <Row className="mb-5">
        <div className="d-flex justify-content-end ">
          <Button
            variant="danger"
            className=" d-flex align-items-center py-2 px-3 "
          >
            <AiFillFileText className="fs-4 me-2" />
            Cetak
          </Button>
        </div>
      </Row>

      <Table responsive>
        <thead className="bg-primary text-light">
          <tr>
            <th>No</th>
            <th>ID</th>
            <th>Tanggal</th>
            <th>Nama</th>
            <th>Pesanan</th>
            <th>Total Harga</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{e.id}</td>
                <td>{e.tgl}</td>
                <td>{e.name}</td>
                <td>{e.order}</td>
                <td>{e.price}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default LaporanAdmin;
