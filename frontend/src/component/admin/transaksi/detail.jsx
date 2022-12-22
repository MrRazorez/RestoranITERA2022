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
      customer: "",
      order: [],
      dataMenu: {},
      total: 0,
      pay: 0
    };
    this.uid = "";
    this.charge = 0;
  }

  async callAPI() {
    try {
      await axios.get(process.env.REACT_APP_BACKEND_URL+"/menu").then((res) => {
        this.setState({ dataMenu: res.data.menu });
      });

      await axios.get(process.env.REACT_APP_BACKEND_URL+"/order/" + this.uid).then((res) => {
        this.setState({
          customer: res.data.customer,
          order: res.data.order
        });
      });

      var totalAmount = 0;
      
      for (let i = 0; i < this.state.order.length; i++) {
        totalAmount += 
          this.state.dataMenu[this.state.order[i].uid].harga *
          this.state.order[i].total;
      }

      this.setState({ total: totalAmount });
      this.charge = this.state.pay - totalAmount;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        alert("Terjadi kesalahan server. Silahkan refresh kembali!");
      } else if (error.code === "ERR_BAD_REQUEST") {
        alert(error.response.data.status);
        document.location.reload();
      }
    }
  }

  async assignOrder(data) {
    try {
      await axios.post(process.env.REACT_APP_BACKEND_URL+"/report", data).then(
        () => {
          window.location.replace("/admin/transaksi");
        }
      );
    } catch (error) {
      this.notification("Laporan Gagal Terkirim!");
    }
  }

  async notification(status) {
    const showNotification = () => {
      const notification = new Notification("Pesan dari Syran Resto", {
        body: status,
      });

      setTimeout(() => {
        notification.close();
      }, 3 * 1000);
    };

    let granted = false;

    if (Notification.permission === "granted") {
      granted = true;
    } else if (Notification.permission !== "denied") {
      let permission = await Notification.requestPermission();
      granted = permission === "granted" ? true : false;
    }

    granted
      ? showNotification()
      : console.log("Anda harus izinkan Notifikasi dalam browser anda!");
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

        { this.state.dataMenu !== null ? (
          this.state.order.map((data, index) => {
            return (
              <Row key={index} className="border border-1 shadow-sm mx-3 p-3 mb-3">
                <Col className="col-12 col-sm p-2 d-flex justify-content-center">
                  <img
                    src={this.state.dataMenu[data.uid].ref}
                    alt=""
                    width={150}
                  />
                </Col>
                <Col className="p-2 d-flex flex-column justify-content-center">
                  <h5>{this.state.dataMenu[data.uid].nama}</h5>
                  <h6>{uangRupiah(this.state.dataMenu[data.uid].harga)}</h6>
                </Col>
                <Col className="col-2 col-sm p-2 d-flex align-items-center justify-content-center">
                  <h5>x {data.total}</h5>
                </Col>
                <Col className="p-2 d-flex align-items-center justify-content-center">
                  <h6>{uangRupiah(this.state.dataMenu[data.uid].harga*data.total)}</h6>
                </Col>
              </Row>
            )})) : (<Row></Row>)}

        <Row className="border border-1 shadow-sm mx-3 p-3 mb-3">
          <Col className="d-none d-sm-flex justify-content-center align-items-center">
            {" "}
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            <h5>Total</h5>
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            <h5>{uangRupiah(this.state.total)}</h5>
          </Col>
        </Row>

        <Row className="border border-1 shadow-sm mx-3 p-3 mb-5 ">
          <Col className="pe-5">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <h6 className="mb-3">Bayar</h6>
              <Form.Control
                type="number"
                style={{ backgroundColor: "#E5E3F6" }}
                placeholder="Masukkan Nominal Bayar"
                value={this.state.pay}
                onChange={(e) => {
                    this.setState({pay: e.target.value});
                    this.charge = e.target.value - this.state.total;
                  }
                }
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
                value={uangRupiah(this.charge)}
                disabled
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex mb-5 pe-4  justify-content-end">
          <Button variant="success" onClick={
            () => {
              if (this.state.pay >= this.state.total) {
                const data = {
                  uid: this.uid,
                  customer: this.state.customer,
                  total: this.state.total,
                  pay: Number(this.state.pay),
                  charge: this.charge
                };
                this.assignOrder(data);
              } else {
                this.notification("BAYAR DULU!!!!");
              }
            }
          }>Bayar Sekarang</Button>
        </div>
      </div>
    );
  }
}

export default withParams(DetailTransaksi);
