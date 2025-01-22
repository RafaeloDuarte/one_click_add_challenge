import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  return (
    <Container className="mt-5">
      <h1>Login</h1>
      <Link to="/register">Não tem uma conta? Registre-se</Link>
    </Container>
  );
};

export default LoginPage;
