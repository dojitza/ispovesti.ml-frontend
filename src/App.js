import React, { useEffect, useState } from "react";
import { Container, Row, Col, Jumbotron } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { constants } from "./constants";
import { Arena } from "./Arena";

import { Ispovesti } from "./Ispovesti";

function App() {
  return (
    <div className="body">
      <Jumbotron className="jumbotron text-center"></Jumbotron>
      <Container className="body">
        <Row>
          <Col>
            <Ispovesti />
          </Col>
        </Row>
        <Row>
          <Col align="center">
            <Arena />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
