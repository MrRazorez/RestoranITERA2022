import axios from "axios";
import React, { Component } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import BreadcrumbComponent from "../menu/breadcrumb";

export class TransaksiAdmin extends Component {
  constructor() {
    super();
    this.state = {
      order: [],
      orderList: {},
    };
  }

  async callAPI() {
    try {
      await axios
        .get(process.env.REACT_APP_BACKEND_URL + "/order")
        .then((res) => {
          this.setState({
            order: Object.keys(res.data.order),
            orderList: res.data.order,
          });
        });
    } catch (error) {
      console.log(error.response);
    }
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <div>
        <BreadcrumbComponent />
        <h6 className="mb-5">Halaman tentang pesanan yang telah masuk</h6>

        {this.state.order.map((data, index) => (
          <a
            href={"/admin/transaksi-detail/" + data}
            key={index}
            className="d-flex p-4 my-3 text-decoration-none btn btn-outline-primary fs-4 align-items-center "
          >
            <AiOutlineShoppingCart className="fs-1 me-3" />
            {this.state.orderList[data]}
          </a>
        ))}
      </div>
    );
  }
}

export default TransaksiAdmin;
