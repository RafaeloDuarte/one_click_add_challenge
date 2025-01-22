import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import './config/i18n.ts'

import VotingPage from './pages/VotingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { store } from "./store";
import { useAuth } from './context/AuthContext';

const App: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Provider store={store}>
      <Router>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">Voting App</Navbar.Brand>
            <Nav className="ms-auto">
              <Nav className="ms-auto">
                {isAuthenticated ? (
                  <Button onClick={logout}>Logout</Button>
                ) : (
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                )}
              </Nav>
            </Nav>
          </Container>
        </Navbar>

        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<VotingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Container>
      </Router>
    </Provider>
  )
};

export default App;
