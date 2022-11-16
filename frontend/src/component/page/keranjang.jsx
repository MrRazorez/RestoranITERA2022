import React, { Component } from "react";
import { Container, Row, Form, InputGroup, Button, Col } from "react-bootstrap";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { uangRupiah } from "./currency";
import axios from "axios";

class Keranjang extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      customer: "",
    };
  }

  async notification(status) {
    // create and show the notification
    const showNotification = () => {
      // create a new notification
      const notification = new Notification("Pesan dari Syran Resto", {
        body: status,
      });

      // close the notification after 5 seconds and navigate to Home Screen
      setTimeout(() => {
        notification.close();
        window.location.replace("/");
      }, 5 * 1000);

      // navigate to a Home Screen when clicked
      notification.onclick = () => window.location.replace("/");
    };

    // check notification permission
    let granted = false;

    if (Notification.permission === "granted") {
      granted = true;
    } else if (Notification.permission !== "denied") {
      let permission = await Notification.requestPermission();
      granted = permission === "granted" ? true : false;
    }

    // show notification or error
    granted
      ? showNotification()
      : console.log("Anda harus izinkan Notifikasi dalam browser anda!");
  }

  async orderNow() {
    try {
      await axios
        .post("http://localhost:8000/order", {
          order: { nama: this.state.customer, data: this.state.currCart.data },
        })
        .then((res) => {
          this.notification(res.data.status);
          localStorage.clear();
        });
    } catch (error) {
      if (error.response.data.status) {
        window.alert(error.response.data.status);
      } else {
        console.log(error);
      }
    }
  }

  componentDidMount() {
    var currCart = JSON.parse(localStorage.getItem("cart"));

    if (this.state.currCart != null) {
      this.state.total = this.state.currCart.data[0].total;
      this.state.currCart.data = this.state.currCart.data.slice(
        1,
        this.state.currCart.length
      );
    }
  }

  render() {
    return (
      <Container className="mt-5">
        <Row>
          <h4 className="mb-4">Keranjang</h4>

          {/* Input Name */}
          <Row className="py-4 px-5 border border-1 shadow-sm mx-3 mb-3">
            <h5 className="mb-2">Nama Pemesan</h5>
            <InputGroup size="lg">
              <Form.Control
                placeholder="Tuliskan Nama Anda..."
                aria-label="nama"
                aria-describedby="basic-addon1"
                style={{ backgroundColor: "#E9E9E9" }}
                value={this.state.customer}
                onChange={(data) => this.state.setCustomer(data.target.value)}
              />
            </InputGroup>
          </Row>

          {/* Detail */}
          {this.state.currCart != null ? (
            this.state.currCart.data.map((e, i) => {
              return (
                <Row className="border border-1 shadow-sm mx-3 p-3 mb-3">
                  <Col className="p-2 d-flex justify-content-center">
                    <img
                      src="https://asset-a.grid.id//crop/0x0:0x0/700x465/photo/2021/07/13/gambar-ilustrasi-bisa-memperjela-20210713123218.jpg"
                      alt=""
                      width={150}
                    />
                  </Col>
                  <Col className="p-2 d-flex flex-column align-items-center justify-content-center">
                    <h5>{e.nama}</h5>
                    <h6>{uangRupiah(e.harga)} /porsi</h6>
                  </Col>
                  <Col className="p-2 d-flex align-items-center justify-content-center">
                    <Button variant="outline-primary">
                      <AiOutlineMinus style={{ fontSize: 22 }} />
                    </Button>
                    <h5 className="mx-4">1</h5>
                    <Button variant="outline-primary">
                      <AiOutlinePlus style={{ fontSize: 22 }} />
                    </Button>
                  </Col>
                  <Col className="p-2 d-flex align-items-center justify-content-center">
                    <h5>{uangRupiah(e.harga)}</h5>
                  </Col>
                  <Col className="p-2 d-flex justify-content-center align-items-center">
                    <Button variant="outline-danger">
                      <BsFillTrashFill style={{ fontSize: 22 }} />
                    </Button>
                  </Col>
                </Row>
              );
            })
          ) : (
            <Row></Row>
          )}

          {/* Total */}
          <Row className="border border-1 shadow-sm mx-3 p-3">
            <Col className="d-flex justify-content-center align-items-center">
              <Form.Select className="w-75 border-primary">
                <option>Pilih Meja</option>
                {[...Array(10)].map((x, i) => (
                  <option>Meja {i + 1}</option>
                ))}
              </Form.Select>
            </Col>
            <Col className="d-flex justify-content-center align-items-center">
              {" "}
            </Col>
            <Col className="d-flex justify-content-center align-items-center">
              <h5>Total</h5>
            </Col>
            <Col className="d-flex justify-content-center align-items-center">
              <h5>{uangRupiah(this.state.total)}</h5>
            </Col>
            <Col className="d-flex justify-content-center align-items-center">
              <Button onClick={() => this.orderNow()}>Pesan Sekarang</Button>
            </Col>
          </Row>
        </Row>
      </Container>
    );
  }
}

export default Keranjang;
