import React, { Component } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import resto from "../../assets/resto.png";
import masjid from "../../assets/masjid.png";
import toilet from "../../assets/toilet.png";
import wifi from "../../assets/wifi.png";
import cctv from "../../assets/cctv.png";

export class Fasilitas extends Component {
  data = [
    {
      logo: wifi,
      desc: "Restaurant Randu menyedian wi-fi gratis dengan kecepatan tinggi. Masukkan password wi-fi anda: 12345678",
    },
    {
      logo: toilet,
      desc: "Restaurant Randu menyedian 2 Lokasi Toilet, yaitu toilet pria dan toilet wanita, yang masing-masing lokasi terdiri dari 5 toilet",
    },
    {
      logo: masjid,
      desc: "Restaurant Randu menyedian 1 mushola, yang dapat digunakan oleh +- 50 orang per sesi.",
    },
    {
      logo: cctv,
      desc: "Restaurant Randu menyedian 50 cctv yang terletak di masing-masing sudut ruangan, kasir, dapur, dan juga tempat parkir.",
    },
  ];

  render() {
    return (
      <Container className="my-5">
        <Row className="mb-5">
          <Col className="col-12 col-md-6 col-lg-4 offset-lg-1 p-0 mb-2 p-lg-3">
            <img src={resto} width="100%" />
          </Col>
          <Col className="col-12 col-md-6 p-3 px-4">
            <h3>Syran Resto</h3>
            <hr />
            <div style={{ textAlign: "justify" }}>
              Syran Resto merupakan salah satu restoran di Bandar Lampung yang
              menampilkan konsep restoran indoor dan outdoor dengan pemandangan
              Kota Bandar Lampung. Randu Resto juga memiliki lokasi luas
              sehingga sangat cocok dijadikan lokasi berkumpul dengan rekan atau
              keluarga.
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center p-0">
          <hr className="w-25 d-none d-sm-flex mt-2" />
          <h4 className="w-auto px-4 d-flex justify-content-center text-center">
            Fasilitas Randu Resto
          </h4>
          <hr className="w-25 d-none d-sm-flex mt-2" />
        </Row>
        <ListGroup className="px-md-5 mt-4 pb-5">
          {this.data.map((e, i) => {
            return (
              <ListGroup.Item className="my-2 border border-2" key={i}>
                <Row className="p-3">
                  <Col
                    md={3}
                    className="d-flex justify-content-center offset-md-1"
                  >
                    <img src={e.logo} alt="" />
                  </Col>
                  <Col md={7} style={{ fontSize: 17 }}>
                    {e.desc}
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Container>
    );
  }
}

export default Fasilitas;
