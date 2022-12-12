import React, { Component } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import BreadcrumbComponent from "../menu/breadcrumb";

export class TransaksiAdmin extends Component {
  static propTypes = {};

  render() {
    return (
      <div>
        <BreadcrumbComponent />
        <h6 className="mb-5">Halaman tentang pesanan yang telah masuk</h6>
        {Array.from({ length: 6 }).map((_, index) => (
          <a
            href="/admin/transaksi-detail"
            key={index}
            className="d-flex p-4 my-3 text-decoration-none btn btn-outline-primary fs-4 align-items-center "
          >
            <AiOutlineShoppingCart className="fs-1 me-3" />
            Anton
          </a>
        ))}
      </div>
    );
  }
}

export default TransaksiAdmin;
