import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import BreadcrumbComponent from "./breadcrumb";
import { BsPencilFill, BsFillTrashFill } from "react-icons/bs";
import { Button, Form, Table } from "react-bootstrap";
import { uangRupiah } from "../../page/currency";

const withRouter = (Component) => {
    const Wrapper = (props) => {
      const navigate = useNavigate();
      
      return (
        <Component
          navigate={navigate}
          {...props}
        />
      );
    };
    
    return Wrapper;
};

class MenuAdmin extends React.Component {
    constructor() {
        super();
        this.state = {
            menu: [],
            dataMenu: {}
        }
    }

    tambah() {
        const { navigate } = this.props;
        navigate("/admin/tambah");
    }

    sunting(uid) {
        const { navigate } = this.props;
        navigate("/admin/edit/"+uid);
    }

    detail() {
        const { navigate } = this.props;
        navigate("/admin/detail");
    }

    async hapus(uid) {
        try {
            console.log(uid);
            await axios.delete('http://localhost:8000/deletemenu/'+uid).then(
                () => {
                    this.callAPI();
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

    async callAPI() {
        try {
            await axios.get('http://localhost:8000/menu').then(
                (res) => {
                    this.setState({dataMenu: res.data.menu});
                    this.setState({menu: Object.keys(res.data.menu)});
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
        this.callAPI();
    }

    shouldComponentUpdate() {
        return true;
    }

    render() {
        return (
            <div>
                <BreadcrumbComponent />

                <div className="d-flex my-5">
                    <Button
                        variant="success"
                        className="d-flex align-items-center"
                        onClick={() => this.tambah()}
                    >
                        <AiOutlinePlus className="fs-5 me-2" /> Tambah Item
                    </Button>
                    <Form className="d-flex ms-auto">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-primary">Search</Button>
                    </Form>
                </div>

                <Table responsive>
                    <thead className="bg-primary text-light">
                        <tr>
                            <th>No</th>
                            <th>ID Produk</th>
                            <th>Gambar</th>
                            <th>Nama</th>
                            <th>Harga</th>
                            <th className="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.menu !== null? this.state.menu.map((e, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{e}</td>
                                    <td>
                                        <img src={this.state.dataMenu[e].foto}
                                            width={100} alt="" />
                                    </td>
                                    <td>{this.state.dataMenu[e].nama}</td>
                                    <td>{uangRupiah(this.state.dataMenu[e].harga)}</td>
                                    <td width={210}>
                                        <div className="d-flex ">
                                            <Button
                                            variant="warning"
                                            className="me-2"
                                            onClick={() => this.sunting(this.state.menu[i])}
                                            >
                                            <BsPencilFill />
                                            </Button>
                                            <Button variant="danger" className="me-2" onClick={() => {this.hapus(this.state.menu[i]);window.location.reload()}}>
                                            <BsFillTrashFill />
                                            </Button>
                                            <Button
                                            variant="dark"
                                            onClick={() => this.detail()}
                                            >
                                            Detail
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }): <></>}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default withRouter(MenuAdmin);