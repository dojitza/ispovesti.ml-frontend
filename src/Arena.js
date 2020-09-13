import React, { useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ArenaIspovest } from "./ArenaIspovest";
import { Ispovest } from "./Ispovest";

import "./index.css";

export function Arena() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${constants.API_ROOT}/arenaIspovesti`);
      const ispovesti = await response.json();
      setIspovesti(ispovesti);
    };

    fetchData();
  }, []);

  return (
    <>
      <button
        className="button"
        variant="dark"
        onClick={handleShow}
        style={{
          fontSize: 36,
          backgroundColor: "rgba(0, 0, 0, 0.66)",
          color: "lightGray",
        }}
      >
        Arena
      </button>

      <Modal
        size="xl"
        centered="true"
        show={show}
        onHide={handleClose}
        backdrop={true}
        className="my-modal"
        animation={true}
      >
        <Modal.Body>
          <ArenaIspovest
            ispovest={ispovest}
            handleLikeClick={handleLikeClick}
            handleDislikeClick={handleDislikeClick}
            handleSuperlikeClick={handleSuperlikeClick}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
