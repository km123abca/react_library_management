import React, { useState } from "react";
import {
  Button,
  Alert,
  Breadcrumb,
  Card,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";
function BootstrapDemo() {
  const [email, setEmail] = useState("");
  const handlesubmit = (e) => {
    e.preventDefault();
    alert(email + " will be stored ");
  };
  return (
    <Container className="mt-3">
      {" "}
      {/*try using fluid */}
      {/* other variants are secondary,success etc */}
      <Alert variant="primary">
        Hello Wonderful People, this here is an alert
      </Alert>
      <Breadcrumb>
        <Breadcrumb.Item>Test</Breadcrumb.Item>
        <Breadcrumb.Item active>Test2</Breadcrumb.Item>
        <Breadcrumb.Item>Test3</Breadcrumb.Item>
      </Breadcrumb>
      {/* Example Card starts */}
      <Card className="mb-3">
        <Card.Img
          src="x.jpg"
          style={{ width: "450px", height: "250px", margin: "auto" }}
        />
        <Card.Body>
          <Card.Title>Example</Card.Title>
          <Card.Text>
            This is a Demo of React Bootstrap card, Check out the styling in
            case of the above image
          </Card.Text>
          <Button className="btn btn-warning">Feldsbar</Button>
        </Card.Body>
      </Card>
      {/* Example Card Ends */}
      {/* An Example form starts */}
      <Form className="col-lg-6 col-md-10 col-sm-12 col-xs-12 mx-auto">
        <Form.Group controlId="formEmail">
          <Form.Label className="font-weight-bold">Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We're doing some stuff here
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label className="font-weight-bold">Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="secondary" type="submit" onClick={handlesubmit}>
          Press Me
        </Button>
      </Form>
      {/* An Example form ends */}
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="formEmail">
              <Form.Label className="font-weight-bold">
                Email Address
              </Form.Label>
              <Form.Control type="email" placeholder="Example@email.com" />
              <Form.Text className="text-muted">
                We're doing some stuff here
              </Form.Text>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formPassword">
              <Form.Label className="font-weight-bold">Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Col>
          <Col>
            <Button variant="secondary" type="submit" className="mx-auto mt-4">
              Press Me
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default BootstrapDemo;
