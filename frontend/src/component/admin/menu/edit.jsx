import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import BreadcrumbComponent from "./breadcrumb";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class Edit extends React.Component {
  constructor() {
    super();
    this.state = {
      nama: "",
      jenis: "food",
      harga: "",
      foto: "",
      fotoref: "",
      updateFoto: null,
    };
    this.uid = "";
  }

  async uploadMenu(e) {
    e.preventDefault();

    if (
      this.state.nama === "" ||
      this.state.jenis === "" ||
      this.state.harga === ""
    ) {
      alert("Form Kurang Lengkap");
      return;
    }

    const formdata = new FormData();
    formdata.append("nama", this.state.nama);
    formdata.append("jenis", this.state.jenis);
    formdata.append("harga", this.state.harga);
    formdata.append("foto", this.state.foto);
    formdata.append("ref", this.state.fotoref);
    formdata.append("updatefoto", this.state.updateFoto);

    try {
      await axios
        .put("http://localhost:8000/menu/" + this.uid, formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data.status);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async callAPI() {
    try {
      await axios.get("http://localhost:8000/menu/" + this.uid).then((res) => {
        this.setState({ nama: res.data.menu.nama });
        this.setState({ jenis: res.data.menu.jenis });
        this.setState({ harga: res.data.menu.harga });
        this.setState({ foto: res.data.menu.foto });
        this.setState({ fotoref: res.data.menu.ref });
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
    let { uid } = this.props.params;
    this.uid = uid;
    this.callAPI();
  }

  render() {
    return (
      <div className="p-0">
        <BreadcrumbComponent />
        <Row className="mb-3 mt-5">
          <Col className="col-12 col-sm-6">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <h6 className="mb-3">Nama Menu</h6>
              <Form.Control
                type="text"
                style={{ backgroundColor: "#E5E3F6" }}
                placeholder="Masukkan Nama Menu"
                value={this.state.nama}
                onChange={(data) => this.setState({ nama: data.target.value })}
              />
            </Form.Group>
          </Col>
          <Col className="col-12 col-sm-6">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <h6 className="mb-3">Jenis Menu</h6>
              <Form.Select
                aria-label="Default select example"
                style={{ backgroundColor: "#E5E3F6" }}
                value={this.state.jenis}
                onChange={(data) => this.setState({ jenis: data.target.value })}
              >
                <option value="food">Food</option>
                <option value="drink">Drink</option>
                <option value="dessert">Dessert</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="col-12 col-sm-6">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <h6 className="mb-3">Harga</h6>
              <Form.Control
                type="text"
                style={{ backgroundColor: "#E5E3F6" }}
                placeholder="Masukkan Harga Menu"
                value={this.state.harga}
                onChange={(data) => this.setState({ harga: data.target.value })}
              />
            </Form.Group>
          </Col>
          <Col></Col>
        </Row>

        <Row className="mb-3">
          <Col>
            {/* <Button variant="primary">Pilih Gambar</Button> */}
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => this.setState({ updateFoto: e.target.files[0] })}
            />
          </Col>
          <Col></Col>
        </Row>

        <p className="mb-5">
          {this.state.updateFoto != null ? (
            <img
              src={URL.createObjectURL(this.state.updateFoto)}
              style={{
                width: "12rem",
              }}
            />
          ) : this.state.fotoref != null ? (
            <img
              src={this.state.fotoref}
              style={{
                width: "12rem",
              }}
            />
          ) : (
            <></>
          )}
        </p>

        <Button
          className="mb-5"
          variant="warning"
          onClick={(e) => {
            this.uploadMenu(e);
            window.location.assign("/admin/menu");
          }}
        >
          Ubah Menu
        </Button>
      </div>
    );
  }
}

export default withParams(Edit);
