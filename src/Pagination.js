import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Jumbotron } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { constants } from "./constants";
import { Arena } from "./Arena";
import { Ispovest } from "./Ispovest";
import seedrandom from "seedrandom";
import { IoMdArrowRoundForward, IoMdArrowRoundBack } from "react-icons/io";

export const Pagination = (props) => {
  const {
    page,
    setPage,
    waitingForAsync,
    disableRight,
    disableLeft = page <= 0,
  } = props;

  return (
    <Row style={{ marginTop: 20, marginBottom: 20 }}>
      <Col
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <IoMdArrowRoundBack
          style={{
            fontSize: 80,
            color: disableLeft ? "grey" : "whitesmoke",
            background: "rgba(0,0,0,0.66)",
            borderRadius: 10,
            padding: 10,
            cursor: "pointer",
            pointerEvents: disableLeft ? "none" : null,
          }}
          onClick={() => setPage(page - 1)}
        />
      </Col>
      <Col style={{ display: "flex", justifyContent: "center" }}>
        <span
          style={{
            textAlign: "center",
            fontSize: 80,
            color: "whitesmoke",
            background: "rgba(0,0,0,0.66)",
            borderRadius: 10,
            lineHeight: 1,
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          {waitingForAsync ? "spinner" : page + 1}
        </span>
      </Col>
      <Col
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <IoMdArrowRoundForward
          style={{
            fontSize: 80,
            color: disableRight ? "grey" : "whitesmoke",
            background: "rgba(0,0,0,0.66)",
            borderRadius: 10,
            padding: 10,
            cursor: "pointer",
            pointerEvents: disableRight ? "none" : null,
          }}
          onClick={() => setPage(page + 1)}
        />
      </Col>
    </Row>
  );
};
