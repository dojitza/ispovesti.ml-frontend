import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Jumbotron } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { constants } from "./constants";
import { Arena } from "./Arena";
import { Ispovest } from "./Ispovest";

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
              <Ispovest
                ispovest={ispovest}
                likes={likes}
                dislikes={dislikes}
                handleLikeClick={handleLikeClick}
                handleDislikeClick={handleDislikeClick}
              />
            ))}
          </Col>
        </Row>
        <Row>
          <Col align="center">
            <Arena />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;