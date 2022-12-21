import axios from "axios";
import React, { Component } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import BreadcrumbComponent from "../menu/breadcrumb";
import { useParams } from "react-router-dom";
import { uangRupiah } from "../../page/currency";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

export class DetailTransaksi extends Component {
  constructor() {
    super();
    this.state = {
      order: [],
      dataMenu: {},
      total: 0,
    };
    this.uid = "";
  }

  async callAPI() {
    try {
      await axios
        .get(process.env.REACT_APP_BACKEND_URL + "/menu")
        .then((res) => {
          this.setState({ dataMenu: res.data.menu });
        });

      await axios
        .get(process.env.REACT_APP_BACKEND_URL + "/order/" + this.uid)
        .then((res) => {
          this.setState({
            order: res.data.order,
          });
        });

      var totalAmount = 0;

      for (let i = 0; i < this.state.order.length; i++) {
        totalAmount +=
          this.state.dataMenu[this.state.order[i].uid].harga *
          this.state.order[i].total;
      }

      this.setState({ total: totalAmount });
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
    let { uid } = this.props.params;
    this.uid = uid;
    this.callAPI();
  }

  render() {
    return (
      <div>
        <BreadcrumbComponent />
        <h6 className="mb-5">
          Halaman tentang detail dari pesanan yang telah masuk
        </h6>

        {this.state.dataMenu !== null ? (
          this.state.order.map((data, index) => {
            return (
              <Row
                key={index}
                className="border border-1 shadow-sm mx-sm-3 mx-1 p-3 mb-3"
              >
                <Col className="col-12 col-sm p-2 d-flex justify-content-center">
                  <img
                    src={this.state.dataMenu[data.uid].ref}
                    alt=""
                    width={150}
                  />
                </Col>
                <Col className="p-2 d-flex flex-column justify-content-center">
                  <h5 style={{ fontSize: "1rem" }}>
                    {this.state.dataMenu[data.uid].nama}
                  </h5>
                  <h6 style={{ fontSize: "1rem" }}>
                    {uangRupiah(this.state.dataMenu[data.uid].harga)}
                  </h6>
                </Col>
                <Col className="col-2 col-sm p-2 d-flex align-items-center justify-content-center">
                  <h5>x {data.total}</h5>
                </Col>
                <Col className="p-2 d-flex align-items-center justify-content-center">
                  <h6>
                    {uangRupiah(
                      this.state.dataMenu[data.uid].harga * data.total
                    )}
                  </h6>
                </Col>
              </Row>
            );
          })
        ) : (
          <Row></Row>
        )}

        <Row className="border border-1 shadow-sm mx-sm-3 mx-1 p-3 mb-3">
          <Col className="offset-sm-6 d-flex justify-content-center align-items-center">
            <h6>Total</h6>
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            <h6>{uangRupiah(this.state.total)}</h6>
          </Col>
        </Row>

        <Row className="border border-1 shadow-sm mx-sm-3 mx-1 p-3 mb-5 ">
          <Col className="col-12 col-sm pe-sm-5">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <h6 className="mb-3">Bayar</h6>
              <Form.Control
                type="number"
                style={{ backgroundColor: "#E5E3F6" }}
                placeholder="Masukkan Nominal Bayar"
              />
            </Form.Group>
          </Col>
          <Col className="col-12 col-sm">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <h6 className="mb-3">Kembali</h6>
              <Form.Control
                type="number"
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

export default withParams(DetailTransaksi);
