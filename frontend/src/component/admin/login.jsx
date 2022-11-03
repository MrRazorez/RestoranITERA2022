import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Login = () => {
  let navigate = useNavigate();
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        background: "linear-gradient(to right,  #254EDB, #3366FF, #6690FF )",
      }}
    >
      <Form
        className="bg-light p-5 rounded-2 shadow-sm"
        style={{ width: "450px", height: "auto" }}
      >
        <h4 className="text-center pb-5">Admin login</h4>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group className="text-center mt-5">
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              navigate("/admin");
            }}
          >
            Login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Login;
