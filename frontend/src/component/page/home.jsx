import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";

const Home = () => {
  const [show, setShow] = useState(false);
  const [popup, setpopup] = useState();

  const handleClose = () => setShow(false);

  //const data = ["sate", "petis", "gudek", "bakso", "jus", "dessert badai"];
  const [menu, setMenu] = useState([]);

  const callAPI = async () => {
    try {
      var res = await axios.get('http://localhost:8000/menu');
      setMenu(res.data.menu);
    } catch (error) {
      console.log(error);
      alert(error.response.data.status);
    }
  }

  useEffect(() => {callAPI()}, []);

  let usDollar = Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
  });

  return (
    <>
      <Container className="my-5">
        <Row className="flex-column-reverse flex-md-row mb-4 mx-2">
          <Col md={4} className="p-2">
            <Form.Select className="border-primary" style={{ width: "35%" }}>
              <option>All </option>
              <option>Food</option>
              <option>Drink</option>
              <option>Dessert</option>
            </Form.Select>
          </Col>
          <Col md={{ span: 5, offset: 3 }} className="p-2">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="btn btn-primary">Search</Button>
            </Form>
          </Col>
        </Row>

        <Row>
          {menu.map((e, i) => {
            return (
              <Col className="my-1 col-6" xl={3} md={4} sm={6} key={i}>
                <div
                  className="btn"
                  onClick={() => {
                    setpopup(e.nama);
                    setShow(true);
                  }}
                >
                  <Card className="shadow-sm">
                    <Card.Img
                      variant="top"
                      src="https://asset-a.grid.id//crop/0x0:0x0/700x465/photo/2021/07/13/gambar-ilustrasi-bisa-memperjela-20210713123218.jpg"
                    />
                    <Card.Body className="text-center">
                      <Card.Title>{e.nama}</Card.Title>
                      <Card.Text>{usDollar.format(e.harga)}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            );
          })}
        </Row>

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body> {popup} </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Tambah Ke Keranjang
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default Home;
