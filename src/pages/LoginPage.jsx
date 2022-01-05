import React from "react";

import { Container, Form, Button } from "react-bootstrap";

const Loginpage = () => {
  return (
    <Container className="row d-flex justify-content-center">
      <h1 className="text-center mt-5">Login to upload your masterpieces</h1>
      <Form className="col-md-4 mt-5">
        <Form.Group id="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required />
        </Form.Group>

        <Form.Group id="pw" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required />
        </Form.Group>

        <Button type="submit">Log In</Button>
      </Form>
    </Container>
  );
};

export default Loginpage;
