import Breadcrumb from "react-bootstrap/Breadcrumb";
import "./breadcrumb.css";

function BreadcrumbComponent() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/admin/menu">Menu</Breadcrumb.Item>
      <Breadcrumb.Item href="/admin/menu/tambah" className="d-none">
        Tambah Menu
      </Breadcrumb.Item>
      <Breadcrumb.Item href="/admin/menu/edit" className="d-none">
        Edit Menu
      </Breadcrumb.Item>
      <Breadcrumb.Item href="/admin/menu/detail" className="d-none">
        Detail Menu
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default BreadcrumbComponent;
