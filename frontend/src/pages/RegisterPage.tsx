import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const VotingPage: React.FC = () => {
  return (
    <Container className="mt-5">
      <h1>Cadastro</h1>
      <Link to="/login">Já tem uma conta? Faça login</Link>
    </Container>
  );
};

export default VotingPage;
