import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

export class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      rating: 5,
    };
  }

  handleRating = (number) => {
    this.state.setstate({ rating: number });
  };

  render() {
    return (
      <Container className="mt-5">
        <Row>
          <h4 className="mb-3">Feedback</h4>
          <textarea
            placeholder="Tuliskan saran dan kritik Anda disini..."
            cols="30"
            rows="10"
            className="mx-2 p-3"
          ></textarea>
          <Row className="my-3 mx-2">
            <Col className="col-12 d-flex" sm={2}>
              <div className="ms-auto">
                <Rating
                  initialValue={this.state.rating}
                  onClick={this.handleRating}
                />
              </div>
              {console.log(this.state.rating)}
            </Col>
            <Col className="d-flex mt-3 mt-sm-0">
              <Button className="ms-auto">Kirim Feedback</Button>
            </Col>
          </Row>
        </Row>
      </Container>
    );
  }
}

export default Feedback;
