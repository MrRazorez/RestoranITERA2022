import React from "react";
import { Container, Row, Form, InputGroup, Button, Col } from "react-bootstrap";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { connect } from "react-redux";
import store from "../../app/store";
import { incrementCart, decrementCart } from "../../features/keranjang/cartSlice";
import { uangRupiah } from "./currency";
import axios from "axios";

class Keranjang extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      dataMenu: {},
      dataCart: [],
      total: 0,
      customer: "",
      table: ""
    };
  }

  async callAPI() {
    try {
      await axios.get(process.env.REACT_APP_BACKEND_URL+"/menu").then((res) => {
        this.setState({ dataMenu: res.data.menu });
        this.setState({ dataCart: this.props.cart.value });
      });

      var totalAmount = 0;

      for (let i = 0; i < this.state.dataCart.length; i++) {
        totalAmount +=
          this.state.dataMenu[this.state.dataCart[i].uid].harga *
          this.state.dataCart[i].total;
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

  async sendOrder() {
    try {
      await axios.post(process.env.REACT_APP_BACKEND_URL+"/order", {
        customer: this.state.customer,
        table: this.state.table,
        value: (localStorage.getItem("cart"))? JSON.parse(localStorage.getItem('cart')).value : {}
      }).then((res) => {
        localStorage.clear();
        this.setState({
          loading: true
        });
        this.notification(res);
      });
    } catch (error) {
      if (error.response) {
        this.notification(error.response);
      }
    }
  }

  async notification(response) {
    const exitLobby = () => window.location.replace("/");

    const showNotification = () => {
      const notification = new Notification("Pesan dari Syran Resto", {
        body: response.data.msg,
      });

      if (response.status === 201) {
        setTimeout(() => {
          notification.close();
          exitLobby();
        }, 3 * 1000);
  
        notification.onclick = exitLobby;
        return;
      }

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
    this.callAPI();
  }

  componentDidUpdate() {
    if (document.getElementById("update_total") !== null) {
      document.getElementById("update_total").innerHTML = uangRupiah(this.state.total);
    }
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
      <Container className="mt-5">
        <h4 className="mb-3">Keranjang</h4>

        {/* Input Name */}
        <Row className="py-4 mx-1 px-md-3 border border-1 shadow-sm">
          <h5 className="mb-2">Nama Pemesan</h5>
          <InputGroup size="md" className="px-md-4">
            <Form.Control
              placeholder="Tuliskan Nama Anda..."
              aria-label="nama"
              aria-describedby="basic-addon1"
              style={{ backgroundColor: "#E9E9E9" }}
              value={this.state.customer}
              onChange={(data) =>
                this.setState({ customer: data.target.value })
              }
            />
          </InputGroup>
        </Row>

        {/* Detail */}
        {this.state.dataCart != null && this.state.dataMenu != null ? (
          this.state.dataCart.map((e, i) => {
            return (
              <Row className="border border-1 shadow-sm mx-3 p-3 mb-3" key={i}>
                <Col className="p-2 d-flex justify-content-center">
                  <img
                    src={this.state.dataMenu[e.uid].ref}
                    alt=""
                    width={150}
                  />
                </Col>
                <Col className="p-2 d-flex flex-column align-items-center justify-content-center">
                  <h5>{this.state.dataMenu[e.uid].nama}</h5>
                  <h6>{uangRupiah(this.state.dataMenu[e.uid].harga)} /porsi</h6>
                </Col>
                <Col className="p-2 d-flex align-items-center justify-content-center">
                  <Button variant="outline-primary">
                    <AiOutlineMinus style={{ fontSize: 22 }} onClick={() => {
                      store.dispatch(decrementCart(e.uid));
                      var amount = this.state.total;
                      if (e.total > 1) {
                        amount -= this.state.dataMenu[e.uid].harga;
                      }
                      this.setState({
                        dataCart: JSON.parse(localStorage.getItem('cart')).value,
                        total: amount
                      });
                    }}/>
                  </Button>
                  <h5 className="mx-4">{e.total}</h5>
                  <Button variant="outline-primary">
                    <AiOutlinePlus style={{ fontSize: 22 }} onClick={() => {
                      store.dispatch(incrementCart(e.uid));
                      var amount = this.state.total + this.state.dataMenu[e.uid].harga;
                      this.setState({
                        dataCart: JSON.parse(localStorage.getItem('cart')).value,
                        total: amount
                      });
                    }}/>
                  </Button>
                </Col>
                <Col className="p-2 d-flex align-items-center justify-content-center">
                  <h5>
                    {uangRupiah(this.state.dataMenu[e.uid].harga * e.total)}
                  </h5>
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
        <Row className="border border-1 shadow-sm mx-1 my-3 py-2 px-2 py-md-4 px-md-4">
          <Col className="col-12 col-md-9">
            <Row className="d-flex flex-column-reverse flex-md-row ">
              <Col className="col-6 col-md-3 px-2 py-1 d-flex justify-md-content-center ">
                <Form.Select className="border-primary"  onChange={(data) => this.setState({ table: data.target.value })}>
                  <option>Pilih Meja</option>
                  {[...Array(10)].map((x, i) => (
                    <option value={x} key={i}>
                      Meja {i + 1}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col className="col-12 col-md-6 offset-md-3 px-2 py-1 p-md-0">
                <Row className="my-2">
                  <Col>
                    <h5>Total</h5>
                  </Col>
                  <Col>
                    <h5 id="update_total">{uangRupiah(this.state.total)}</h5>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col className="col-12 col-md-3 p-0 py-3 p-md-0 d-flex justify-content-center">
            <Button
              onClick={() => {
                this.sendOrder();
              }}
            >
              Pesan Sekarang
            </Button>
          </Col>
        </Row>
      </Container>
      )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(Keranjang);
