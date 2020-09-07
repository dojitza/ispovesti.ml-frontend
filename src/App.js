import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Jumbotron } from "react-bootstrap";
import backgroundImage from "./darker-honeycomb.png";
import "bootstrap/dist/css/bootstrap.min.css";

import { constants } from "./constants";
function App() {
  const [ispovesti, setIspovesti] = useState(null);
  const dislikes = constants.LIKE_VARIATIONS;
  const likes = constants.DISLIKE_VARIATIONS;

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
      body: "",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Created Gist:", data.html_url);
      });
  };

  const handleDislikeClick = (ispovestId) => {};

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
                        onClick={() => handleLikeClick(ispovest.id)}
                      >
                        {dislikes[Math.floor(Math.random() * dislikes.length)]}
                      </button>
                      <span className="reactionCount">{ispovest.dislikes}</span>
                    </Col>
                    <Col className="reaction" md="auto">
                      <button className="button" variant="dark">
                        {likes[Math.floor(Math.random() * likes.length)]}
                      </button>
                      <span className="reactionCount">{ispovest.likes}</span>
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
