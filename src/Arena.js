import React, { useState, useEffect } from "react";
import { Modal, Container, Row, Col, Button, Jumbotron } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ArenaIspovest } from "./ArenaIspovest";
import { ArenaIntro } from "./ArenaIntro";
import { constants } from "./constants";

import "./index.css";

export function Arena(props) {
  const { showIntro, setUserData, userData } = props;
  const [arenaIspovesti, setArenaIspovesti] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${constants.API_ROOT}/arenaIspovesti`);
        const arenaIspovesti = await response.json();
        setArenaIspovesti(arenaIspovesti);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleReactionClick = (ispovestId, reaction) => {
    if (arenaIspovesti.length === 1) {
      setShow(false);
      setTimeout(() => setArenaIspovesti(arenaIspovesti.slice(1)), 1000);
      alert("Svajpali ste sve ispovesti u današnjoj areni");
    } else {
      setArenaIspovesti(arenaIspovesti.slice(1));
    }

    fetch(`${constants.API_ROOT}/arenaIspovesti/${ispovestId}/postReaction`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reaction),
    });
  };

  const handleLikeClick = (ispovestId) => {
    handleReactionClick(ispovestId, "like");
  };

  const handleDislikeClick = (ispovestId) => {
    handleReactionClick(ispovestId, "dislike");
  };

  const handleSuperlikeClick = (ispovestId) => {
    if (userData.superlikesLeft > 0) {
      setUserData({ ...userData, superlikesLeft: userData.superlikesLeft - 1 });
      handleReactionClick(ispovestId, "superlike");
    } else {
      alert("Utrošili ste sve superlajkove!");
    }
  };

  return (
    <>
      <button
        title="Sudi robotu"
        className="button"
        variant="dark"
        onClick={() =>
          arenaIspovesti.length > 0
            ? handleShow()
            : alert("Nema više ispovesti u areni, vratite se sutra!")
        }
        style={{
          fontSize: 36,
          backgroundColor:
            arenaIspovesti.length > 0
              ? "rgba(200, 200, 200, 0.66)"
              : "rgba(100, 100, 100, 0.66)",
          color: "black",
          lineHeight: 2,
          margin: 60,
          marginBottom: 100,
        }}
      >
        <span>Sudi robotu</span>
      </button>

      <Modal
        size="m"
        centered="true"
        show={show}
        onHide={handleClose}
        backdrop={true}
        className="my-modal"
        animation={true}
      >
        <Modal.Body>
          {showIntro ? (
            <ArenaIntro
              handleEnterArenaClick={() =>
                setUserData({ ...userData, arenaIntroCompleted: true })
              }
            />
          ) : (
            arenaIspovesti.length > 0 && (
              <ArenaIspovest
                ispovest={arenaIspovesti[0]}
                handleLikeClick={handleLikeClick}
                handleDislikeClick={handleDislikeClick}
                handleSuperlikeClick={handleSuperlikeClick}
              />
            )
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
