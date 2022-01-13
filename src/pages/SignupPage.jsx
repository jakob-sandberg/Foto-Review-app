import React, { useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/AuthContext";

const Signuppage = () => {
  const { signup } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [setError] = useState(null);
  const emailRef = useRef();
  const pwRef = useRef();
  const pwConfirmRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pwRef.current.value !== pwConfirmRef.current.value) {
      return setError("You've failed to match your password");
    }
    setError(null);
    try {
      setLoading(true);
      await signup(emailRef.current.value, pwRef.current.value);
      navigate("/");
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <Container className="row d-flex justify-content-center">
      <Form onSubmit={handleSubmit} className="col-md-4 mt-5">
        <Form.Group id="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required ref={emailRef} />
        </Form.Group>

        <Form.Group id="pw" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required ref={pwRef} />
        </Form.Group>

        <Form.Group id="pw-confirm" className="mb-3">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control type="password" required ref={pwConfirmRef} />
        </Form.Group>

        <Button disabled={loading} type="submit">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};

export default Signuppage;
