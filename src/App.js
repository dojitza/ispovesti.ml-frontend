import React, { useEffect, useState } from "react";
import { Container, Row, Col, Jumbotron } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { constants } from "./constants";
import { Arena } from "./Arena";

import { Ispovesti } from "./Ispovesti";

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${constants.API_ROOT}/user`);
        const userData = await response.json();
        setUserData(userData);
        console.log(userData);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="body">
      <Jumbotron
        style={{
          backgroundColor: "rgba(0,0,0,0)",
          display: "flex",
          justifyContent: "center",
          marginBottom: 0,
        }}
      >
        <div
          style={{
            display: "inline-block !important",
            backgroundColor: "rgba(0,0,0,0.66)",
            color: "whitesmoke",
            fontSize: 50,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 10,
          }}
        >
          Ispovesti.ml
        </div>
      </Jumbotron>
      <Container className="body">
        <Row>
          <Col>
            <Ispovesti />
          </Col>
        </Row>
        <Row>
          <Col align="center">
            <Arena
              showIntro={!userData?.arenaIntroCompleted}
              setUserData={setUserData}
              userData={userData}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
