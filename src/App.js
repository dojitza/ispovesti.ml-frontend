import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Jumbotron } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { constants } from "./constants";

function App() {
  const [ispovesti, setIspovesti] = useState(null);
  const likes = constants.LIKE_VARIATIONS;
  const dislikes = constants.DISLIKE_VARIATIONS;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${constants.API_ROOT}/ispovesti`);
      const ispovesti = await response.json();
      setIspovesti(ispovesti);
    };

    fetchData();
  }, []);

  const handleLikeClick = (ispovestId) => {
    fetch(`${constants.API_ROOT}/ispovesti/${ispovestId}/postLike`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: {},
    });
    const newIspovesti = ispovesti;
    const i = ispovesti.findIndex((ispovest) => ispovest.id === ispovestId);
    const newIspovest = ispovesti[i];
    newIspovest.timesLiked += 1;
    newIspovest.likes += 1;
    newIspovesti[i] = newIspovest;
    setIspovesti(JSON.parse(JSON.stringify(newIspovesti)));
  };

  const handleDislikeClick = (ispovestId) => {
    fetch(`${constants.API_ROOT}/ispovesti/${ispovestId}/postDislike`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: {},
    });
    const newIspovesti = ispovesti;
    const i = ispovesti.findIndex((ispovest) => ispovest.id === ispovestId);
    const newIspovest = ispovesti[i];
    newIspovest.timesDisliked += 1;
    newIspovest.dislikes += 1;
    newIspovesti[i] = newIspovest;
    setIspovesti(JSON.parse(JSON.stringify(newIspovesti)));
  };

  return (
    <div className="body">
      <Jumbotron className="jumbotron text-center"></Jumbotron>

      <Container className="body">
        <Row>
          <Col>
            {ispovesti?.map((ispovest) => (
              <Row className="ispovest">
                <Col>
                  <Col className="ispovestText">{ispovest.text}</Col>
                  <Row className="reactionContainer">
                    <Col className="reaction" md="auto">
                      <button
                        className="button"
                        variant="dark"
                        onClick={() => {
                          handleLikeClick(ispovest.id);
                        }}
                        disabled={
                          ispovest.timesLiked > 0 || ispovest.timesDisliked > 0
                        }
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
                    <Col className="reaction" md="auto">
                      <button
                        className="button"
                        variant="dark"
                        onClick={() => {
                          handleDislikeClick(ispovest.id);
                        }}
                        disabled={
                          ispovest.timesLiked > 0 || ispovest.timesDisliked > 0
                        }
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
                    <Col className="commentButtonContainer">
                      <button className="button commentButton" variant="dark">
                        Komentari
                      </button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
        <Col>{/*<Row className="arena ">Arena</Row>*/}</Col>
      </Container>
    </div>
  );
}

export default App;
