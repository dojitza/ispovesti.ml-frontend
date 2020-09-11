import React, { useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export function Ispovest(props) {
  const {
    ispovest,
    likes,
    dislikes,
    handleDislikeClick,
    handleLikeClick,
  } = props;
  return (
    <Row style={{ margin: 5 }} className="ispovest">
      <Col>
        <Col className="ispovestText">{ispovest.text}</Col>
        <Row className="reactionContainer">
          <Col
            className="reaction"
            xl="auto"
            lg="auto"
            md="auto"
            sm="auto"
            xs="auto"
          >
            <button
              className="button"
              variant="dark"
              onClick={() => {
                handleLikeClick(ispovest.id);
              }}
              disabled={ispovest.timesLiked > 0 || ispovest.timesDisliked > 0}
              style={
                ispovest.timesLiked > 0
                  ? { backgroundColor: "rgba(50, 50, 50, 0.5)" }
                  : {}
              }
            >
              {likes[Math.floor(Math.random() * likes.length)]}
            </button>
            <span className="reactionCount">{ispovest.likes}</span>
          </Col>
          <Col
            className="reaction"
            xl="auto"
            lg="auto"
            md="auto"
            sm="auto"
            xs="auto"
          >
            <button
              className="button"
              variant="dark"
              onClick={() => {
                handleDislikeClick(ispovest.id);
              }}
              disabled={ispovest.timesLiked > 0 || ispovest.timesDisliked > 0}
              style={
                ispovest.timesDisliked > 0
                  ? { backgroundColor: "rgba(50, 50, 50, 0.5)" }
                  : {}
              }
            >
              {dislikes[Math.floor(Math.random() * dislikes.length)]}
            </button>
            <span className="reactionCount">{ispovest.dislikes}</span>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
