import React, { Component } from "react";
import { Row, Col, Card, Container, ListGroup } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

export class HomeAdmin extends Component {
  data = [
    {
      name: "Food",
      value: "202",
      bg: "#43C750",
    },
    {
      name: "Drink",
      value: "100",
      bg: "#5286EB",
    },
    {
      name: "Dessert",
      value: "20",
      bg: "#C86A26",
    },
  ];

  feedback = [
    {
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic ",
      rating: "5",
    },
    {
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic ",
      rating: "5",
    },
  ];

  render() {
    return (
      <Container>
        <h4 className="mb-4">Total Penjualan</h4>
        <Row className="mb-5">
          {this.data.map((e, i) => {
            return (
              <Col className="p-2" key={i}>
                <Card className="py-4" style={{ backgroundColor: `${e.bg}` }}>
                  <Card.Body className="text-center">
                    <Card.Title className="fs-1 text-white">
                      {e.value}
                    </Card.Title>
                    <Card.Title className="text-white">{e.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>

        <h4 className="mb-4">Feedback</h4>

        <div>
          {this.feedback.map((e, i) => {
            return (
              <Card className="mb-4">
                <Card.Body>
                  <Card.Text> {e.desc} </Card.Text>
                  <footer className="d-flex justify-content-end">
                    <Rating initialValue={e.rating} className="ms-auto" />
                  </footer>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </Container>
    );
  }
}

export default HomeAdmin;
