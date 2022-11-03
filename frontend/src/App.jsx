import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// User Component
import Home from "./component/page/home";
import Fasilitas from "./component/page/fasilitas";
import Feedback from "./component/page/feedback";
import Layout from "./component/page/layout";
import Keranjang from "./component/page/keranjang";

// Admin Component
import Login from "./component/admin/login";
import AdminLayout from "./component/admin/layout/layout";
import HomeAdmin from "./component/admin/home";
import LaporanAdmin from "./component/admin/laporan/laporan";

// Admin Transaksi Component
import TransaksiAdmin from "./component/admin/transaksi/transaksi";
import DetailTransaksi from "./component/admin/transaksi/detail";

// Admin Menu Component
import MenuAdmin from "./component/admin/menu/menu";
import Add from "./component/admin/menu/add";
import Edit from "./component/admin/menu/edit";
import Detail from "./component/admin/menu/detail";

// Not Found Component
import Notfound from "./component/not found/notfound";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="keranjang" element={<Keranjang />} />
            <Route path="fasilitas" element={<Fasilitas />} />
            <Route path="feedback" element={<Feedback />} />
          </Route>

          <Route path="login" element={<Login />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<HomeAdmin />} />
            <Route path="transaksi" element={<TransaksiAdmin />} />
            <Route
              path="transaksi-detail"
              element={<DetailTransaksi />}
            ></Route>
            <Route path="menu" element={<MenuAdmin />}></Route>
            <Route path="tambah" element={<Add />} />
            <Route path="edit" element={<Edit />} />
            <Route path="detail" element={<Detail />} />
            <Route path="laporan" element={<LaporanAdmin />} />
          </Route>

          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
