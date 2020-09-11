import React, { useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export function ArenaIspovest(props) {
  const { ispovest } = props;
  return (
    <Row style={{ margin: 5 }}>
      <Col className="ispovestText" style={{ backgoundColor: "rgba(0,0,0,1)" }}>
        Verili smo se loool
      </Col>
    </Row>
  );
}
