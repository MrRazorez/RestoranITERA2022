import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Row, Col, Form, Button } from "react-bootstrap";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class Detail extends React.Component {
  constructor() {
    super();
    this.state = {
      nama: '',
      jenis: 'food',
      harga: '',
    }
    this.uid = '';
  }

  async callAPI() {
    try {
        await axios.get('http://localhost:8000/menu/'+this.uid).then(
            (res) => {
                this.setState({nama: res.data.menu.nama});
                this.setState({jenis: res.data.menu.jenis});
                this.setState({harga: res.data.menu.harga});
            }
        );
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
        <h4 className="mb-5">Detail</h4>
        <Row className="mb-3">
          <Col className="pe-5">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <h6 className="mb-3">Nama Menu</h6>
              <Form.Control
                type="text"
                style={{ backgroundColor: "#D9D9D9" }}
                placeholder="Masukkan Nama Menu"
                value={this.state.nama}
                disabled
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <h6 className="mb-3">Jenis Menu</h6>
              <Form.Select
                aria-label="Default select example"
                style={{ backgroundColor: "#D9D9D9" }}
                value={this.state.jenis}
                disabled
              >
                <option value="food">Food</option>
                <option value="drink">Drink</option>
                <option value="dessert">Dessert</option>
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
                value={this.state.harga}
                disabled
              />
            </Form.Group>
          </Col>
          <Col></Col>
        </Row>
  
        <Button variant="danger" onClick={() => window.history.back()}>Kembali</Button>
      </div>
    );
  }
};

export default withParams(Detail);
