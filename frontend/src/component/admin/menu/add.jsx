import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

const Add = () => {
  return (
    <div>
      <h4 className="mb-5">Menu</h4>
      <Row className="mb-3">
        <Col className="pe-5">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <h6 className="mb-3">Nama Menu</h6>
            <Form.Control
              type="text"
              style={{ backgroundColor: "#D9D9D9" }}
              placeholder="Masukkan Nama Menu"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <h6 className="mb-3">Jenis Menu</h6>
            <Form.Select
              aria-label="Default select example"
              style={{ backgroundColor: "#D9D9D9" }}
            >
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="pe-5">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <h6 className="mb-3">Harga</h6>
            <Form.Control
              type="text"
              style={{ backgroundColor: "#D9D9D9" }}
              placeholder="Masukkan Nama Menu"
            />
          </Form.Group>
        </Col>
        <Col></Col>
      </Row>

      <Row className="mb-3">
        <Col>
          {/* <Button variant="primary">Pilih Gambar</Button> */}
          <input type="file" />
        </Col>
        <Col></Col>
      </Row>

      <Button variant="danger">Tambah Menu</Button>
    </div>
  );
};

export default Add;
