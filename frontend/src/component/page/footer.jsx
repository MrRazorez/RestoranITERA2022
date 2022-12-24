import React from "react";
import { BsEnvelope, BsFillTelephoneFill } from "react-icons/bs";
import { BiMap } from "react-icons/bi";

function FooterScreen() {
  return (
    <>
      <footer className="text-center text-lg-start bg-dark text-white pt-2 mt-5">
        <section className="my-5">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-5 col-lg-5  mx-auto mb-4">
                <h6 className="fw-bold mb-4 fs-5">Syran Resto</h6>
                <p>
                  restoran Bandar Lampung yang menampilkan konsep restoran
                  indoor dan outdoor dengan pemandangan Kota Bandar Lampung.
                  lokasi yang luas sangat cocok dijadikan untuk berkumpul dengan
                  rekan atau keluarga
                </p>
              </div>

              <div className="col-md-4 col-lg-3  mx-auto mb-md-0 mb-4">
                <h6 className="fw-bold mb-4 fs-5">Contact</h6>
                <p>
                  <BiMap className="fs-4 me-2" /> Bandarlampung, Lampung
                </p>
                <p>
                  <BsEnvelope className="fs-5 me-3" />
                  syran@gmail.com
                </p>
                <p>
                  <BsFillTelephoneFill className="fs-5 me-3" />
                  +62 8123 1145 990
                </p>
              </div>
            </div>
          </div>
        </section>
        <div
          className="text-center p-3"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
        >
          © 2022 Copyright:
          <a className="text-reset fw-bold text-decoration-none ms-2" href="/">
            Syran-Resto.com
          </a>
        </div>
      </footer>
    </>
  );
}

export default FooterScreen;
