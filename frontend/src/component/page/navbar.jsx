import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useLocation } from "react-router-dom";

function NavbarScreen() {
  const pathname = useLocation().pathname;
  return (
    <Navbar
      className="px-3 px-lg-5 sticky-top"
      bg="dark"
      variant="dark"
      expand="lg"
    >
      <Container fluid>
        <Navbar.Brand href="#" className="fs-4 fw-bold">
          Syran <span className="text-info">Resto.</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto me-3">
            <Nav.Link
              className={`${pathname === "/" ? "active" : ""} ms-auto`}
              href="/"
            >
              Home
            </Nav.Link>
            <Nav.Link
              className={`${pathname === "/keranjang" ? "active" : ""} ms-auto`}
              href="/keranjang"
            >
              Keranjang
            </Nav.Link>
            <Nav.Link
              className={`${pathname === "/fasilitas" ? "active" : ""} ms-auto`}
              href="/fasilitas"
            >
              Fasilitas
            </Nav.Link>
            <Nav.Link
              className={`${pathname === "/feedback" ? "active" : ""} ms-auto`}
              href="/feedback"
            >
              Feedback
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarScreen;
