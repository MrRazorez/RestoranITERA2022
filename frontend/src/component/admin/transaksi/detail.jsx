import React from "react";
import { Row, Col, Button, Form } from "react-bootstrap";

const DetailTransaksi = () => {
  return (
    <div>
      <h4 className="mb-5">DetailTransaksi</h4>

      {Array.from({ length: 3 }).map((_, index) => (
        <Row key={index} className="border border-1 shadow-sm mx-3 p-3 mb-3">
          <Col className="p-2 d-flex justify-content-center">
            <img
              src="https://asset-a.grid.id//crop/0x0:0x0/700x465/photo/2021/07/13/gambar-ilustrasi-bisa-memperjela-20210713123218.jpg"
              alt=""
              width={150}
            />
          </Col>
          <Col className="p-2 d-flex flex-column align-items-center justify-content-center">
            <h5>Sate</h5>
            <h6>Rp. 2000 /porsi</h6>
          </Col>
          <Col className="p-2 d-flex align-items-center justify-content-center">
            <h5>Rp. 2000,-00</h5>
          </Col>
        </Row>
      ))}

      <Row className="border border-1 shadow-sm mx-3 p-3 mb-3">
        <Col className="d-flex justify-content-center align-items-center">
          {" "}
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <h5>Total</h5>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <h5>Rp. 3.000</h5>
        </Col>
      </Row>

      <Row className="border border-1 shadow-sm mx-3 p-3 mb-5 ">
        <Col className="pe-5">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <h6 className="mb-3">Bayar</h6>
            <Form.Control
              type="text"
              style={{ backgroundColor: "#D9D9D9" }}
              placeholder="Masukkan Nama Menu"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <h6 className="mb-3">Kembali</h6>
            <Form.Control
              type="text"
              style={{ backgroundColor: "#D9D9D9" }}
              placeholder="Masukkan Nama Menu"
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex mb-5 pe-4  justify-content-end">
        <Button variant="success">Bayar Sekarang</Button>
      </div>
    </div>
  );
};

export default DetailTransaksi;
