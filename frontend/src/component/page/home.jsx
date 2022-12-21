import React from "react";
import axios from "axios";
import {
  Col,
  Container,
  Form,
  Row,
  Button,
  Card,
  Modal,
} from "react-bootstrap";
import store from "../../app/store";
import { addCart } from "../../features/keranjang/cartSlice";
import { uangRupiah } from "./currency";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      menu: [],
      dataMenu: {},
      show: false,
      popupUid: null,
      popupNama: null,
      popupKategori: null,
      popupHarga: null,
      popupImg: null,
      searchCategory: "",
      searchName: "",
    };
  }

  async callAPI() {
    try {
      await axios.get(process.env.REACT_APP_BACKEND_URL+"/menu").then((res) => {
        this.setState({ dataMenu: res.data.menu });
        this.setState({ menu: Object.keys(res.data.menu) });
        this.setState({ loading: false });
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

  handleAddCart() {
    store.dispatch(addCart(this.state.popupUid));
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <>
        {this.state.loading ? (
          <div className="d-flex flex-column align-items-center p-5 pt-5">
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
            <Container className="my-5">
              <Row className="flex-column-reverse flex-md-row mb-4 mx-2 mx-sm-0">
                <Col md={4} className="p-2">
                  <Form.Select
                    className="border-primary"
                    style={{ width: "35%" }}
                    onChange={(data) => {
                      this.setState({ searchCategory: data.target.value });
                    }}
                  >
                    <option value="">All </option>
                    <option value="food">Food</option>
                    <option value="drink">Drink</option>
                    <option value="dessert">Dessert</option>
                  </Form.Select>
                </Col>
                <Col md={{ span: 5, offset: 3 }} className="p-2">
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2 border-primary"
                      aria-label="Search"
                      onChange={(e) => {
                        this.setState({ searchName: e.target.value });
                      }}
                    />
                  </Form>
                </Col>
              </Row>

              <Row>
                {this.state.dataMenu !== null ? (
                  this.state.menu
                    .filter(
                      // eslint-disable-next-line
                      (val) => {
                        if (
                          this.state.searchName === "" &&
                          this.state.searchCategory === ""
                        ) {
                          return val;
                        } else if (
                          this.state.dataMenu[val].nama
                            .toLowerCase()
                            .includes(this.state.searchName.toLowerCase())
                        ) {
                          if (
                            this.state.dataMenu[val].jenis
                              .toLowerCase()
                              .includes(this.state.searchCategory.toLowerCase())
                          ) {
                            return val;
                          }
                        }
                      }
                    )
                    .map((e, i) => {
                      return (
                        <Col
                          className="my-2 px-2 col-6 p-0 d-flex justify-content-center"
                          xl={3}
                          md={4}
                          sm={6}
                          key={i}
                        >
                          <div
                            className="btn p-0 w-100"
                            style={{
                              height: "18em",
                            }}
                            onClick={() => {
                              this.setState({
                                popupUid: e,
                                popupNama: this.state.dataMenu[e].nama,
                                popupKategori: this.state.dataMenu[e].jenis,
                                popupHarga: this.state.dataMenu[e].harga,
                                popupImg: this.state.dataMenu[e].ref,
                                show: true,
                              });
                            }}
                          >
                            <Card
                              className="shadow pb-1"
                              style={{
                                width: "100%",
                                height: "100%",
                              }}
                            >
                              <Card.Img
                                variant="top"
                                src={this.state.dataMenu[e].ref}
                                style={{
                                  height: "65%",
                                }}
                              />
                              <Card.Body className="text-center">
                                <Card.Title>
                                  {this.state.dataMenu[e].nama}
                                </Card.Title>
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
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body className="d-flex flex-column align-items-center">
                  <img src={this.state.popupImg} width="60%" alt=""/>
                  <div className="fs-3 mt-3">{this.state.popupNama}</div>
                  <div className="fs-5 text-primary">
                    {this.state.popupKategori}
                  </div>
                  <div className="fs-5">{uangRupiah(this.state.popupHarga)}</div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="btn btn-primary"
                    onClick={() => {
                      this.handleAddCart();
                      this.setState({ show: false });
                    }}
                  >
                    Tambah
                  </Button>
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
        )}
      </>
    );
  }
}

export default Home;
