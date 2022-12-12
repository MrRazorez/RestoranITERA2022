import React, { Component } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import BreadcrumbComponent from "../menu/breadcrumb";

export class DetailTransaksi extends Component {
  render() {
    return (
      <div>
        <BreadcrumbComponent />
        <h6 className="mb-5">
          Halaman tentang detail dari pesanan yang telah masuk
        </h6>

        {Array.from({ length: 3 }).map((_, index) => (
          <Row key={index} className="border border-1 shadow-sm mx-3 p-3 mb-3">
            <Col className="col-12 col-sm p-2 d-flex justify-content-center">
              <img
                src="https://asset-a.grid.id//crop/0x0:0x0/700x465/photo/2021/07/13/gambar-ilustrasi-bisa-memperjela-20210713123218.jpg"
                alt=""
                width={150}
              />
            </Col>
            <Col className="p-2 d-flex flex-column justify-content-center">
              <h5>Sate</h5>
              <h6>Rp. 2000</h6>
            </Col>
            <Col className="col-2 col-sm p-2 d-flex align-items-center justify-content-center">
              <h5>x 1</h5>
            </Col>
            <Col className="p-2 d-flex align-items-center justify-content-center">
              <h6>Rp. 2000,-00</h6>
            </Col>
          </Row>
        ))}

        <Row className="border border-1 shadow-sm mx-3 p-3 mb-3">
          <Col className="d-none d-sm-flex justify-content-center align-items-center">
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
                style={{ backgroundColor: "#E5E3F6" }}
                placeholder="Masukkan Nominal Bayar"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <h6 className="mb-3">Kembali</h6>
              <Form.Control
                type="text"
                style={{ backgroundColor: "#D9D9D9" }}
                placeholder="Nilai Kembalian"
                disabled
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex mb-5 pe-4  justify-content-end">
          <Button variant="success">Bayar Sekarang</Button>
        </div>
      </div>
    );
  }
}

export default DetailTransaksi;
