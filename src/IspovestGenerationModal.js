import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { constants } from "./constants";

export function IspovestGenerationModal(props) {
  const { showGenerationModal, setShowGenerationModal } = props;
  const [showIntro, setShowIntro] = useState(true);
  const [generatedIspovest, setGeneratedIspovest] = useState("");
  const [prefix, setPrefix] = useState("");
  const [waitingForGeneration, setWaitingForGeneration] = useState(false);

  const sendGenerateRequest = async (prefix) => {
    setWaitingForGeneration(true);
    const response = await fetch(
      `${constants.API_ROOT}/generateIspovest?prefix=${prefix}`
    );
    setGeneratedIspovest(await response.json());
    setWaitingForGeneration(false);
  };

  const publishIspovest = async (prefix) => {};

  return (
    <Modal
      size="m"
      centered="true"
      show={showGenerationModal}
      onHide={() => setShowGenerationModal(false)}
      backdrop="static"
      keyboard={false}
      className="my-modal"
      animation={true}
    >
      <Modal.Body>
        {showIntro ? (
          <>
            <Row className="modalRow ispovestText">
              Dobrodošli u generiranje ispovesti. Na idućem ekranu Upišite
              početak ispovesti ako želite (do 20 znakova!) i kliknite
              generiraj. Zbog velikih zahtjeva na sistem generiranje ispovesti
              traje oko minute i ako je aktivno mnogo korisnika bit ćete
              stavljeni u red za čekanje. Jednom kada se ispovest generira moći
              ćete ju prihvatiti ili generirati novu, sve dok ne budete
              zadovoljni sa svojom ispovesti. Jednom kada ste zadovoljni,
              opcionalno upisite svoje ime i kliknite prihvati. Ispovest će se
              objaviti u generiraj sekciji gde će ući u konkurenciju za
              objavljivanje na glavnoj listi i nasim ostalim platformama (ig,
              fb)
            </Row>
            <Row className="modalRow buttonRow">
              <button
                title="Može"
                className="button continueButton"
                onClick={() => setShowIntro(false)}
              >
                Može
              </button>
            </Row>
          </>
        ) : (
          <>
            <Row className="modalRow modalText">Početak ispovesti</Row>
            <Row className="modalRow">
              <input
                type="text"
                maxlength="20"
                value={prefix}
                onChange={(event) => setPrefix(event.target.value)}
              />
            </Row>
            <Row className="modalRow">
              <button
                title="Generiraj"
                className={`button continueButton ${
                  waitingForGeneration ? "disabledButton" : ""
                }`}
                onClick={() => sendGenerateRequest(prefix)}
                disabled={waitingForGeneration}
              >
                Generiraj
              </button>
            </Row>

            <Row className="modalRow ispovestText">
              {waitingForGeneration ? (
                <Spinner
                  style={{ padding: 30 }}
                  animation="border"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </Spinner>
              ) : (
                generatedIspovest
              )}
            </Row>
            <Row className="modalRow modalText">Vaše ime</Row>
            <Row className="modalRow">
              <input type="text" maxlength="20" />
            </Row>
            <Row className="modalRow">
              <Col className="modalCol">
                <button
                  title="Objavi"
                  className={`button continueButton ${
                    waitingForGeneration ? "disabledButton" : ""
                  }`}
                  onClick={() => {
                    const r = window.confirm(
                      "Da li ste sigurni da želite objaviti ispovest?"
                    );
                    if (r == true) {
                      publishIspovest(generatedIspovest);
                      setShowGenerationModal(false);
                    }
                  }}
                  disabled={waitingForGeneration}
                >
                  Objavi
                </button>
              </Col>
              <Col className="modalCol">
                <button
                  title="Odustani"
                  className="button continueButton"
                  onClick={() => {
                    const r = window.confirm(
                      "Da li ste sigurni da želite odustati?"
                    );
                    if (r == true) {
                      setShowGenerationModal(false);
                    }
                  }}
                >
                  Odustani
                </button>
              </Col>
            </Row>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
