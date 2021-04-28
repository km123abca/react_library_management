import React from "react";
import "./Homepage.css";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useStateValue } from "../StateProvider";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

function Homepage() {
  const [{ user, basket }] = useStateValue();
  return (
    <div>
      <Navbar bg="dark" expand="lg" fixed="top">
        <Navbar.Brand href="#home" className="text-white">
          The BookHouse
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" className="text-white">
              <Link
                to="/fe/"
                style={{ textDecoration: "none", color: "white" }}
              >
                {" "}
                Home
              </Link>
            </Nav.Link>
            <Nav.Link href="#link" className="text-white">
              <Link
                to="/fe/all"
                style={{ textDecoration: "none", color: "white" }}
              >
                {" "}
                Books
              </Link>
            </Nav.Link>
            <NavDropdown
              title={<span className="text-white my-auto">User</span>}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1" className="text-dark">
                <Link
                  to={user ? "/fe/logout" : "/fe/login"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {" "}
                  {user ? "Logout" : "Login"}
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2" className="text-dark">
                <Link
                  to={user ? "/fe/all" : "/fe/register"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {" "}
                  {user ? "Account" : "Register"}
                </Link>
              </NavDropdown.Item>
              {user ? (
                <NavDropdown.Item href="#action/3.1" className="text-dark">
                  <Link
                    to={"/fe/add"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Add a Book
                  </Link>
                </NavDropdown.Item>
              ) : (
                ""
              )}

              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4" className="text-dark">
                Trouble?
              </NavDropdown.Item>
            </NavDropdown>
            <Navbar.Brand className="text-white" style={{ marginLeft: "10px" }}>
              {user ? "Hello " + user.email : "You are a Guest"}
            </Navbar.Brand>
          </Nav>
          <Nav.Link href="#link" className="text-white mr-sm-2">
            <Link
              to="/fe/viewcart"
              style={{ textDecoration: "none", color: "white" }}
            >
              {" "}
              <AddShoppingCartIcon /> {basket.length}
            </Link>
          </Nav.Link>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Homepage;
