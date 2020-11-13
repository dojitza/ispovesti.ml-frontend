import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { constants } from "./constants";
import { toHHMMSS } from "./helpers";

export function IspovestGenerationModal(props) {
  const { updateData, showGenerationModal, setShowGenerationModal } = props;
  const [showIntro, setShowIntro] = useState(true);
  const [generatedIspovest, setGeneratedIspovest] = useState({
    id: null,
    text: null,
  });
  const [generationState, setGenerationState] = useState(
    constants.GENERATION_STATE_INITIAL
  );
  const [queuePosition, setQueuePosition] = useState();
  const [prefix, setPrefix] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [waitingForPublish, setWaitingForPublish] = useState(false);
  const [eta, setEta] = useState(constants.GENERATION_ESTIMATE_SECONDS);
  const waitingForGeneration =
    generationState === constants.GENERATION_STATE_GENERATING;

  useEffect(() => {
    const intervalRef = setInterval(() => {
      tick();
    }, 1000);
    return () => clearInterval(intervalRef);
  });

  const tick = () => {
    if (waitingForGeneration) {
      setEta(eta - 1);
      if (
        generationState === constants.GENERATION_STATE_GENERATING &&
        (eta <= 1 || eta % 10 === 0)
      ) {
        pollForGeneratedIspovest();
      }
      if (eta <= 1) {
        setEta(9);
      }
    }
  };

  const sendGenerateRequest = async (prefix) => {
    setGeneratedIspovest({ id: null, text: null });
    const response = await fetch(`${constants.API_ROOT}/generateIspovest`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prefix: prefix }),
    });
    if (!response.isError) {
      setGenerationState(constants.GENERATION_STATE_GENERATING);
      pollForGeneratedIspovest();
    }
  };

  const pollForGeneratedIspovest = async () => {
    const response = await fetch(`${constants.API_ROOT}/generateIspovest`);
    if (!response.isError) {
      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.id) {
        setGeneratedIspovest(responseJson);
        setGenerationState(constants.GENERATION_STATE_GENERATED);
        setEta(constants.GENERATION_ESTIMATE_SECONDS);
      } else {
        if (responseJson.queuePosition != queuePosition) {
          setEta(
            (responseJson.queuePosition + 1) *
              constants.GENERATION_ESTIMATE_SECONDS
          );
          setQueuePosition(responseJson.queuePosition);
        }
      }
    }
  };

  const publishIspovest = async (id, authorName) => {
    setWaitingForPublish(true);
    const response = await fetch(`${constants.API_ROOT}/publishIspovest`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ispovestId: id,
        authorName: authorName,
      }),
    });
    if (response.ok) {
      setShowGenerationModal(false);
      updateData();
    } else {
      alert("Došlo je do greške, pokušajte opet opet");
    }
    setWaitingForPublish(false);
  };

  const renderIspovestDivText = (generationState) => {
    switch (generationState) {
      case constants.GENERATION_STATE_INITIAL:
        return "Ovde će da se prikaže generisovana ispovest";
      case constants.GENERATION_STATE_GENERATING:
        return (
          <Spinner style={{ padding: 30 }} animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        );
      case constants.GENERATION_STATE_GENERATED:
        return generatedIspovest.text;
      default:
        return "Ovde će da se prikaže generisovana ispovest";
    }
  };

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
              traje do {constants.GENERATION_ESTIMATE_SECONDS / 60}min i ako je
              aktivno mnogo korisnika bit ćete stavljeni u red za čekanje.
              Jednom kada se ispovest generira moći ćete da ju prihvatite ili
              generirate novu, sve dok ne budete zadovoljni sa svojom ispovesti.
              Jednom kada ste zadovoljni, opcionalno upišite svoje ime i
              kliknite prihvati. Ispovest će se objaviti u generiraj sekciji gde
              će ući u konkurenciju za objavljivanje na glavnoj listi i našim
              ostalim platformama (ig, fb). Ispovest možete da objavite jednom
              svakih {constants.SUBMISSION_THRESHOLD_SECONDS / 60} min.
            </Row>
            <Row className="modalRow buttonRow">
              <button
                title="Može"
                className="button continueButton mozeButton"
                onClick={() => setShowIntro(false)}
              >
                Može
              </button>
            </Row>
          </>
        ) : (
          <>
            <Row className="modalRow modalText">Početak ispovesti</Row>
            <Row className="modalRow modalInput">
              <input
                type="text"
                maxLength="20"
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
            <Row className="modalRow ispovestText generatedIspovestText">
              {renderIspovestDivText(generationState)}
            </Row>
            {queuePosition >= 0 && !generatedIspovest.id && (
              <Row className="modalRow queueInfoText">
                Vaša ispovest je {queuePosition + 1}. u redu čekanja, otprilike
                vreme do završetka: {toHHMMSS(eta)}
              </Row>
            )}
            <Row className="modalRow modalText">Vaše ime</Row>
            <Row className="modalRow modalInput">
              <input
                type="text"
                maxLength="20"
                value={authorName}
                onChange={(event) => setAuthorName(event.target.value)}
              />
            </Row>
            <Row className="modalRow">
              <Col className="modalCol">
                <button
                  title="Objavi"
                  className={`button continueButton ${
                    waitingForGeneration || generatedIspovest.id === null
                      ? "disabledButton"
                      : ""
                  }`}
                  onClick={() => {
                    const r = window.confirm(
                      "Da li ste sigurni da želite objaviti ispovest? Ispovest možete da objavite jednom svakih " +
                        constants.SUBMISSION_THRESHOLD_SECONDS / 3600 +
                        " časova"
                    );
                    if (r == true) {
                      publishIspovest(generatedIspovest.id, authorName);
                      setShowGenerationModal(false);
                    }
                  }}
                  disabled={
                    waitingForGeneration || generatedIspovest.id === null
                  }
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
