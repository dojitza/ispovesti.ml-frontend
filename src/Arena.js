import React, { useState, useEffect } from "react";
import {
  Modal,
  Container,
  Row,
  Col,
  Button,
  Jumbotron,
  Spinner,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ArenaIspovest } from "./ArenaIspovest";
import { ArenaIntro } from "./ArenaIntro";
import { constants } from "./constants";
import seedrandom from "seedrandom";
import { Ispovest } from "./Ispovest";
import { Pagination } from "./Pagination.js";
import { IspovestGenerationModal } from "./IspovestGenerationModal";
import "./Arena.css";
import { toHHMMSS } from "./helpers";

export function Arena() {
  const [userData, setUserData] = useState(null);
  const [ispovesti, setIspovesti] = useState([]);
  const [page, setPage] = useState(0);
  const [waitingForAsync, setWaitingForAsync] = useState(false);
  const [showGenerationModal, setShowGenerationModal] = useState(false);
  const [timeLeftForSubmit, setTimeLeftForSubmit] = useState(0);
  seedrandom(localStorage.getItem("randomSeed"), { global: true });

  const likes = constants.LIKE_VARIATIONS;
  const superlikes = constants.SUPERLIKE_VARIATIONS;
  const dislikes = constants.DISLIKE_VARIATIONS;

  const getGenerateButtonText = () =>
    timeLeftForSubmit > 0
      ? toHHMMSS(timeLeftForSubmit)
      : "Generiraj novu ispovest";

  const getGenerateButtonTitle = () =>
    timeLeftForSubmit > 0
      ? "Vreme preostalo do kad opet možete da objavite ispovest"
      : "Generiraj novu ispovest";

  const fetchIspovesti = async () => {
    try {
      const response = await fetch(
        `${constants.API_ROOT}/arenaIspovesti?page=${page}`
      );
      const ispovesti = await response.json();
      setIspovesti(ispovesti);
    } catch (e) {
      console.log(e);
    }
  };

  const tick = () => {
    setTimeLeftForSubmit(timeLeftForSubmit - 1);
    console.log(timeLeftForSubmit);
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${constants.API_ROOT}/user`);
      const userData = await response.json();
      setUserData(userData);
      return userData;
    } catch (e) {
      console.log(e);
    }
  };

  const fetchData = async () => {
    setWaitingForAsync(true);
    const ispovesti = await fetchIspovesti();
    const userData = await fetchUserData();
    setWaitingForAsync(false);
    return { ispovesti: ispovesti, userData: userData };
  };

  useEffect(() => {
    const asyncCaller = async () => {
      const data = await fetchData();
      const userData = data.userData;

      setTimeLeftForSubmit(
        (userData?.lastPublishTime | 0) +
          constants.SUBMISSION_THRESHOLD_SECONDS -
          Math.round(new Date().getTime() / 1000)
      );
    };
    const intervalRef = asyncCaller();
    return () => clearInterval(intervalRef);
  }, [page]);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      tick();
    }, 1000);
    return () => clearInterval(intervalRef);
  });

  const handleReactionClick = (ispovestId, reaction) => {
    setWaitingForAsync(true);
    fetch(`${constants.API_ROOT}/arenaIspovesti/${ispovestId}/putReaction`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reaction),
    });
    const newIspovesti = ispovesti;
    const ito = newIspovesti.find((ispovest) => ispovest.id === ispovestId);
    const alreadyReacted = ito.timesLiked + ito.timesDisliked > 0;
    if (reaction === "like") {
      ito.timesLiked += 1;
      ito.likes += 1;
      if (alreadyReacted) {
        ito.timesDisliked -= 1;
        ito.dislikes -= 1;
      }
    } else if (reaction === "dislike") {
      ito.timesDisliked += 1;
      ito.dislikes += 1;
      if (alreadyReacted) {
        ito.timesLiked -= 1;
        ito.likes -= 1;
      }
    }
    setIspovesti(JSON.parse(JSON.stringify(newIspovesti)));
    setWaitingForAsync(false);
  };

  const handleLikeClick = (ispovestId) => {
    handleReactionClick(ispovestId, "like");
  };

  const handleDislikeClick = (ispovestId) => {
    handleReactionClick(ispovestId, "dislike");
  };

  return (
    <>
      <IspovestGenerationModal
        fetchIspovesti={fetchIspovesti}
        showGenerationModal={showGenerationModal}
        setShowGenerationModal={setShowGenerationModal}
      />
      <div>
        <div className="ispovestGenerationModalButtonContainer">
          <button
            title={getGenerateButtonTitle(timeLeftForSubmit)}
            className={
              "ispovestGenerationModalButton " +
              (timeLeftForSubmit > 0
                ? "ispovestGenerationModalButtonDisabled"
                : "")
            }
            variant="dark"
            onClick={() => setShowGenerationModal(true)}
            disabled={timeLeftForSubmit > 0}
          >
            <span>
              {waitingForAsync ? (
                <Spinner
                  style={{ padding: 30 }}
                  animation="border"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </Spinner>
              ) : (
                getGenerateButtonText(timeLeftForSubmit)
              )}
            </span>
          </button>
        </div>
        <Pagination
          page={page}
          setPage={setPage}
          waitingForAsync={waitingForAsync}
          reachedEndFlag={ispovesti.length < 10}
        />
        {ispovesti?.map((ispovest) => (
          <Ispovest
            extraCssClass="arenaIspovest"
            key={ispovest.id}
            ispovest={ispovest}
            likes={likes}
            dislikes={dislikes}
            handleLikeClick={handleLikeClick}
            handleDislikeClick={handleDislikeClick}
          />
        ))}
        <Pagination
          page={page}
          setPage={setPage}
          waitingForAsync={waitingForAsync}
          reachedEndFlag={ispovesti.length < 10}
        />
      </div>
    </>
  );
}
