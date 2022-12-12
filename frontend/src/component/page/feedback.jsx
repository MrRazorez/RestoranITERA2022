import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import axios from "axios";

export class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      desc: null,
      rating: 5,
    };
  }

  handleRating = (number) => {
    this.setState({ rating: number });
  };

  async sendFeedback(e) {}

  render() {
    return (
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
    );
  }
}

export default Feedback;
