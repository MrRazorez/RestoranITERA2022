import React from "react";
import axios from "axios";
import { Col, Container, Form, Row, Button, Card, Modal, } from "react-bootstrap";
import { uangRupiah } from "./currency";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      menu: [],
      dataMenu: {},
      show: false,
      popupNama: null,
      popupHarga: null,
    };
  }

  async callAPI() {
    try {
      await axios.get("http://localhost:8000/menu").then((res) => {
        this.setState({ dataMenu: res.data.menu });
        this.setState({ menu: Object.keys(res.data.menu) });
      });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        alert("Terjadi kesalahan server. Silahkan refresh kembali!");
      } else if (error.code === "ERR_BAD_REQUEST") {
        alert(error.response.data.status);
        document.location.reload();
      }
    }
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
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
            {this.state.dataMenu !== null ? (
              this.state.menu.map((e, i) => {
                return (
                  <Col className="my-1 col-6" xl={3} md={4} sm={6} key={i}>
                    <div
                      className="btn"
                      onClick={() => {
                        this.setState({
                          popupNama: this.state.dataMenu[e].nama,
                        });
                        this.setState({
                          popupHarga: this.state.dataMenu[e].harga,
                        });
                        this.setState({ show: true });
                      }}
                    >
                      <Card className="shadow-sm">
                        <Card.Img
                          variant="top"
                          src={this.state.dataMenu[e].ref}
                          width={150}
                          height={150}
                        />
                        <Card.Body className="text-center">
                          <Card.Title>{this.state.dataMenu[e].nama}</Card.Title>
                          <Card.Text>
                            {uangRupiah(this.state.dataMenu[e].harga)}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  </Col>
                );
              })
            ) : (
              <Col></Col>
            )}
          </Row>

          <Modal
            show={this.state.show}
            onHide={() => {
              this.setState({ show: false });
            }}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Modal Heading</Modal.Title>
            </Modal.Header>
            <Modal.Body> {this.state.popupNama} </Modal.Body>
            <Modal.Body> {uangRupiah(this.state.popupHarga)} </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  this.setState({ show: false });
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </>
    );
  }
}

export default Home;
