import React, { useState, useEffect } from "react";
import { Modal, Container, Row, Col, Button, Jumbotron } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ArenaIspovest } from "./ArenaIspovest";
import { ArenaIntro } from "./ArenaIntro";
import { constants } from "./constants";
import seedrandom from "seedrandom";
import { Ispovest } from "./Ispovest";
import { Pagination } from "./Pagination.js";
import { IspovestGenerationModal } from "./IspovestGenerationModal";
import "./Arena.css";

export function Arena() {
  const [ispovesti, setIspovesti] = useState([]);
  const [page, setPage] = useState(0);
  const [waitingForAsync, setWaitingForAysnc] = useState(false);
  const [showGenerationModal, setShowGenerationModal] = useState(false);
  seedrandom(localStorage.getItem("randomSeed"), { global: true });

  const likes = constants.LIKE_VARIATIONS;
  const superlikes = constants.SUPERLIKE_VARIATIONS;
  const dislikes = constants.DISLIKE_VARIATIONS;

  const generatedToday = false;

  useEffect(() => {
    const fetchData = async () => {
      setWaitingForAysnc(true);
      try {
        const response = await fetch(
          `${constants.API_ROOT}/arenaIspovesti?page=${page}`
        );
        const ispovesti = await response.json();
        setIspovesti(ispovesti);
      } catch (e) {
        console.log(e);
      }
      setWaitingForAysnc(false);
    };
    fetchData();
  }, [page]);

  const handleReactionClick = (ispovestId, reaction) => {
    setWaitingForAysnc(true);
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
    setWaitingForAysnc(false);
  };

  const handleLikeClick = (ispovestId) => {
    handleReactionClick(ispovestId, "like");
  };

  const handleDislikeClick = (ispovestId) => {
    handleReactionClick(ispovestId, "dislike");
  };

  const handleSuperlikeClick = (ispovestId) => {
    handleReactionClick(ispovestId, "superlike");
  };

  return (
    <>
      <IspovestGenerationModal
        showGenerationModal={showGenerationModal}
        setShowGenerationModal={setShowGenerationModal}
      />
      <div>
        <div className="ispovestGenerationModalButtonContainer">
          <button
            title="Generiraj novu ispovest"
            className="ispovestGenerationModalButton"
            variant="dark"
            onClick={() =>
              !generatedToday
                ? setShowGenerationModal(true)
                : alert("Nema više ispovesti u areni, vratite se sutra!")
            }
          >
            <span>Generiraj novu ispovest</span>
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
