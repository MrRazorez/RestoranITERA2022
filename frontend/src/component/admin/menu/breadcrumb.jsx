import Breadcrumb from "react-bootstrap/Breadcrumb";
import "./breadcrumb.css";
import { useLocation } from "react-router-dom";

function BreadcrumbComponent() {
  const pathname = useLocation().pathname.split("/");

  return (
    <Breadcrumb>
      {pathname[2] == "transaksi" || pathname[2] == "transaksi-detail" ? (
        <Breadcrumb.Item
          href="/admin/transaksi"
          className={`${
            pathname[2] === "transaksi" || pathname[2] === "transaksi-detail"
              ? ""
              : "d-none"
          }`}
        >
          Transaksi
        </Breadcrumb.Item>
      ) : (
        <Breadcrumb.Item
          href="/admin/menu"
          className={`${
            pathname[2] === "menu" ||
            pathname[2] === "tambah" ||
            pathname[2] === "edit" ||
            pathname[2] === "detail"
              ? ""
              : "d-none"
          }`}
        >
          Menu
        </Breadcrumb.Item>
      )}

      <Breadcrumb.Item
        href="/admin/menu/tambah"
        className={`${pathname[2] === "tambah" ? "" : "d-none"}`}
      >
        Tambah Menu
      </Breadcrumb.Item>
      <Breadcrumb.Item
        href="/admin/menu/edit"
        className={`${pathname[2] === "edit" ? "" : "d-none"}`}
      >
        Edit Menu
      </Breadcrumb.Item>
      <Breadcrumb.Item
        href="/admin/menu/detail"
        className={`${pathname[2] === "detail" ? "" : "d-none"}`}
      >
        Detail Menu
      </Breadcrumb.Item>

      <Breadcrumb.Item
        href="/admin/transaksi-detail"
        className={`${pathname[2] === "transaksi-detail" ? "" : "d-none"}`}
      >
        Detail Transaksi
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default BreadcrumbComponent;
