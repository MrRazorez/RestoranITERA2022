import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Rating } from "react-simple-star-rating";

const Feedback = () => {
  const [rating, setRating] = useState(5);

  const handleRating = (number) => {
    setRating(number);
  };

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
              <Rating initialValue={rating} onClick={handleRating} />
            </div>
            {console.log(rating)}
          </Col>
          <Col className="d-flex mt-3 mt-sm-0">
            <Button className="ms-auto">Kirim Feedback</Button>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default Feedback;
