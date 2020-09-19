import React, { useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoMdStar, IoMdHeart, IoMdClose } from "react-icons/io";
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
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        >
          {ispovest.text}
        </Col>
      </Row>
      <Row style={{ paddingTop: 10 }}>
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={() => handleDislikeClick(ispovest.id)}
            title="Dislajk"
            style={{
              padding: 4,
              cursor: "pointer",
              backgroundColor: "red",
              borderRadius: "50%",
            }}
          >
            <IoMdClose
              style={{
                cursor: "pointer",
                color: "white",
                fontSize: 40,
              }}
            ></IoMdClose>
          </div>
        </Col>
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={() => handleSuperlikeClick(ispovest.id)}
            title="Superlajk (jedan dnevno)"
            style={{
              padding: 3,
              cursor: "pointer",
              backgroundColor: "#12aded",
              borderRadius: "50%",
            }}
          >
            <IoMdStar
              style={{
                cursor: "pointer",
                color: "white",
                fontSize: 40,
              }}
            ></IoMdStar>
          </div>
        </Col>
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={() => handleLikeClick(ispovest.id)}
            title="Lajk"
            style={{
              padding: 8,
              cursor: "pointer",
              backgroundColor: "#52cb95",
              borderRadius: "50%",
            }}
          >
            <IoMdHeart
              style={{
                cursor: "pointer",
                color: "white",
                fontSize: 30,
              }}
            ></IoMdHeart>
          </div>
        </Col>
      </Row>
    </Col>
  );
}
