import React from "react";
import imgNotFound from "../../assets/404.png";

const Notfound = () => {
  return (
    <div
      className="d-flex justify-content-center"
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
      }}
    >
      <div className="d-flex flex-column align-items-center">
        <img src={imgNotFound} alt="" />
        <h2 className="text-secondary">404</h2>
        <h2 className="text-secondary">Page Not Found</h2>
      </div>
    </div>
  );
};

export default Notfound;
