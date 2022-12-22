import axios from "axios";
import React, { Component } from "react";
import { Row, Table, Button } from "react-bootstrap";
import { AiFillFileText } from "react-icons/ai";
import { uangRupiah } from "../../page/currency";
import print from "./print";

export class LaporanAdmin extends Component {
  constructor() {
    super();
    this.state = {
      report: [],
      reportData: {},
    };
  }

  async callAPI() {
    try {
      await axios
        .get(process.env.REACT_APP_BACKEND_URL + "/report")
        .then((res) => {
          console.log(res.data);
          this.setState({ reportData: res.data.report });
          this.setState({ report: Object.keys(res.data.report) });
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
      <div>
        <h4 className="fw-bold">Laporan</h4>
        <h6 className="mb-5">Halaman tentang laporan hasil penjualan</h6>

        <Row className="mb-5">
          <div className="d-flex justify-content-end ">
            <Button
              variant="danger"
              className=" d-flex align-items-center py-2 px-3"
              target="_blank"
              onClick={() => print(this.state.report, this.state.reportData)}
            >
              <AiFillFileText className="fs-4 me-2" />
              Cetak
            </Button>
          </div>
        </Row>

        <Table responsive>
          <thead className="bg-primary text-light">
            <tr>
              <th>No</th>
              <th>ID</th>
              <th>Tanggal</th>
              <th>Pelanggan</th>
              <th>Total Harga</th>
              <th>Bayar</th>
              <th>Kembali</th>
            </tr>
          </thead>
          <tbody>
            {this.state.report.map((e, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{e}</td>
                  <td>{this.state.reportData[e].date}</td>
                  <td>{this.state.reportData[e].customer}</td>
                  <td>{uangRupiah(this.state.reportData[e].total)}</td>
                  <td>{uangRupiah(this.state.reportData[e].pay)}</td>
                  <td>{uangRupiah(this.state.reportData[e].charge)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default LaporanAdmin;
