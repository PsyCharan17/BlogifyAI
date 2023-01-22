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
          background: "rgb(26,35,126)",
          // background:
          // "linear-gradient(90deg, rgba(57,17,206,1) 2%, rgba(29,124,253,1) 46%, rgba(52,196,202,1) 84%)",
        }}
      >
        <Container
          style={{ display: "flex", flex: 1, justifyContent: "space-between" }}
        >
          <div>
            <Navbar.Brand
              href="#home"
              style={{
                fontSize: "30px",
                paddingBottom: "30px",
                color: "white",
                textDecoration: "none",
              }}
            >
              Blogify.ai
            </Navbar.Brand>
          </div>
          <div>
            <Nav className="me-auto">
              <Nav.Link
                href="#home"
                style={{
                  padding: "0 40px",
                  fontSize: "20px",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                <strong>Blogs</strong>
              </Nav.Link>
              <Nav.Link
                href="#features"
                style={{
                  padding: "0 40px",
                  fontSize: "20px",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                <strong>Login/Signup</strong>
              </Nav.Link>
            </Nav>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarTop;
