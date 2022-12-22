import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import axios from "axios";

export class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      desc: "",
      rating: 0,
    };
  }

  handleRating = (number) => {
    this.setState({ rating: number });
  };

  async sendFeedback(e) {
    e.preventDefault();

    try {
      const data = {
        desc: this.state.desc,
        rating: this.state.rating
      }
      
      await axios.post(process.env.REACT_APP_BACKEND_URL+"/feedback", data).then(
        (res) => {
          this.setState({
            loading: true
          });
          this.notification(res);
        }
      );
    } catch (error) {
      if (error.response) {
        this.notification(error.response);
      }
    }
  }

  async notification(response) {
    const exitLobby = () => window.location.replace("/");

    const showNotification = () => {
      const notification = new Notification("Pesan dari Syran Resto", {
        body: response.data.msg,
      });

      if (response.status === 201) {
        setTimeout(() => {
          notification.close();
          exitLobby();
        }, 3 * 1000);
  
        notification.onclick = exitLobby;
        return;
      }

      setTimeout(() => {
        notification.close();
      }, 3 * 1000);
    };

    let granted = false;

    if (Notification.permission === "granted") {
      granted = true;
    } else if (Notification.permission !== "denied") {
      let permission = await Notification.requestPermission();
      granted = permission === "granted" ? true : false;
    }

    granted
      ? showNotification()
      : console.log("Anda harus izinkan Notifikasi dalam browser anda!");
  }

  render() {
    return (
      <>
      {this.state.loading ? (
          <div className="d-flex flex-column align-items-center p-5 pt-5">
            <div
              className="spinner-border text-primary"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>

            <h2 id="content" className="text-center pt-4">
              Loading...
            </h2>
          </div>
        ) : (
      <Container className="mt-5 p-3">
        <h4 className="mb-3">Feedback</h4>
        <div className="mx-2">
          <textarea
            placeholder="Tuliskan saran dan kritik Anda disini..."
            cols="10"
            rows="10"
            className="p-3"
            onChange={(data) => this.setState({ desc: data.target.value })}
            style={{
              width: "100%",
            }}
            required
          ></textarea>
        </div>
        <Row className="my-3 mx-2">
          <Col className="col-12 d-flex" sm={2}>
            <div className="ms-auto">
              <Rating
                initialValue={this.state.rating}
                onClick={this.handleRating}
              />
            </div>
          </Col>
          <Col className="d-flex mt-3 mt-sm-0">
            <Button
              className="ms-auto"
              onClick={(e) => {
                this.sendFeedback(e);
              }}
            >
              Kirim Feedback
            </Button>
          </Col>
        </Row>
      </Container>
      )}
      </>
    );
  }
}

export default Feedback;