import React, { useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export function ArenaIspovest(props) {
  const { ispovest } = props;
  return (
    <Row
      style={{ margin: 5, cursor: "pointer" }}
      onClick={() => alert("ispovest")}
    >
      <Col
        className="ispovestText"
        style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
      >
        Verili smo se loool
      </Col>
    </Row>
  );
}
