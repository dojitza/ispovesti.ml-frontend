import React from "react";
import "./Landing.css";
import { Container, Row, Col, Jumbotron, Pagination } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export function Landing() {
  return (
    <Container className="landingContainer">
      <Row className="landingRow">
        <Col className="landingCol">
          <Link to="/generated" className="landingButton generiraj">
            Generiraj nove i sudi im
          </Link>
        </Col>
        <Col className="landingCol">
          <Link to="/published" className="landingButton citaj">
            Čitaj stare i komentiraj ih{" "}
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
