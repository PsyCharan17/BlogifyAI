import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavbarTop() {
  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        style={{
          marginBottom: "0px",
          background: "rgb(57,17,206)",
          background:
            "linear-gradient(90deg, rgba(57,17,206,1) 2%, rgba(29,124,253,1) 46%, rgba(52,196,202,1) 84%)",
        }}
      >
        <Container>
          <Navbar.Brand
            href="#home"
            style={{ display: "flex", flex: 1, fontSize: "30px" }}
          >
            Blogify.ai
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              href="#home"
              style={{ padding: "0 20px", fontSize: "20px" }}
            >
              <strong>Home</strong>
            </Nav.Link>
            <Nav.Link
              href="#features"
              style={{ padding: "0 20px", fontSize: "20px" }}
            >
              <strong>Blogs</strong>
            </Nav.Link>
            <Nav.Link
              href="#pricing"
              style={{ padding: "0 20px", fontSize: "20px" }}
            >
              <strong>Login/Signup</strong>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarTop;
