import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

import { Container, Form, Button } from "react-bootstrap";

const Loginpage = () => {
  const emailRef = useRef();
  const pwRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // try to login the user with the specified credentials
    try {
      setLoading(true);
      await login(emailRef.current.value, pwRef.current.value);
      navigate("/");
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <Container className="row d-flex justify-content-center">
      <h1 className="text-center mt-5">Login to upload your masterpieces</h1>

      <Form onSubmit={handleSubmit} className="col-md-4 mt-5">
        <Form.Group id="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required ref={emailRef} />
        </Form.Group>

        <Form.Group id="pw" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required ref={pwRef} />
        </Form.Group>

        <Button disabled={loading} type="submit">
          Log In
        </Button>
      </Form>
    </Container>
  );
};

export default Loginpage;
