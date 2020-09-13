import React, { useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export function ArenaIspovest(props) {
  const {
    ispovest,
    handleLikeClick,
    handleDislikeClick,
    handleSuperlikeClick,
  } = props;
  return (
    <Col>
      <Row style={{ margin: 5 }}>
        <Col
          className="ispovestText"
          style={{ backgroundColor: "rgba(0,0,0,1)" }}
        >
          {ispovest.text}
        </Col>
      </Row>
      <Row>
        <Col
          onClick={handleDislikeClick}
          style={{
            cursor: "pointer",
            color: "red",
            fontSize: 50,
            textAlign: "center",
          }}
        >
          <span title={"Dislajk"}>❎</span>
        </Col>
        <Col
          onClick={handleSuperlikeClick}
          style={{
            cursor: "pointer",
            color: "cyan",
            fontSize: 50,
            textAlign: "center",
          }}
        >
          <span title={"Superlajk (jedan dnevno)"}>🌠</span>
        </Col>
        <Col
          onClick={handleLikeClick}
          style={{
            cursor: "pointer",
            color: "red",
            fontSize: 50,
            textAlign: "center",
          }}
        >
          <span title={"Lajk"}>💟</span>
        </Col>
      </Row>
    </Col>
  );
}
