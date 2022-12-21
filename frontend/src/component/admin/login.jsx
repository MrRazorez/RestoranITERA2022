import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import resto from "../../assets/restaurant-interior.jpg";

import axios from "axios";

const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();

    return <Component navigate={navigate} {...props} />;
  };

  return Wrapper;
};

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      status: "",
    };
  }

  async Auth(e) {
    e.preventDefault();
    const { navigate } = this.props;
    try {
      await axios
        .post(process.env.REACT_APP_BACKEND_URL + "/users/login", {
          email: this.state.email,
          password: this.state.password,
        })
        .then((res) => {
          window.localStorage.setItem("restoran_token", res.data.token);
          navigate("/admin");
        });
    } catch (error) {
      if (error.response) {
        this.setState({
          status: error.response.data.status,
        });
      }
    }
  }

  componentDidMount() {
    if (window.localStorage.getItem("restoran_token")) {
      window.location.replace("/admin");
    }
  }

  render() {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          background: `url(${resto})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(52, 52, 52, 0.5)",
          }}
        >
          <Form
            className="bg-light p-5 rounded-2 shadow"
            style={{ width: "450px", height: "auto" }}
            onSubmit={(e) => this.Auth(e)}
          >
            <h4 className="text-center pb-5">Admin login</h4>
            <h6 className="text-center">{this.state.status}</h6>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="text"
                placeholder="E-mail"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="text-center mt-5">
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
