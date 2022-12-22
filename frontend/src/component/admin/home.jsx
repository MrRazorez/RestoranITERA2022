import axios from "axios";
import React, { Component } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

export class HomeAdmin extends Component {
  constructor() {
    super();
    this.state = {
      data: [
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
      ],
      feedback: [
        {
          desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic ",
          rating: "5",
        },
        {
          desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic ",
          rating: "5",
        },
      ]
    }
  }

  async callAPI() {
    try {
      await axios.get(process.env.REACT_APP_BACKEND_URL+"/total").then((res) => {
        this.setState({
          data: [
            {
              name: "Food",
              value: res.data.food,
              bg: "#43C750",
            },
            {
              name: "Drink",
              value: res.data.drink,
              bg: "#5286EB",
            },
            {
              name: "Dessert",
              value: res.data.dessert,
              bg: "#C86A26",
            },
          ],
          feedback: []
        });
      });

      await axios.get(process.env.REACT_APP_BACKEND_URL+"/feedback").then((res) => {
        this.setState({
          feedback: res.data.feedback
        });
      });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        alert("Terjadi kesalahan server. Silahkan refresh kembali!");
      } else if (error.code === "ERR_BAD_REQUEST") {
        alert(error.response.data.status);
        document.location.reload();
      }
    }
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <Container>
        <h4 className="mb-4">Total Menu</h4>
        <Row className="mb-5">
          {this.state.data.map((e, i) => {
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
          {this.state.feedback.map((e, i) => {
            return (
              <Card className="mb-4" key={i}>
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
