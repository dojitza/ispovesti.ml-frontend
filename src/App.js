import React, { useEffect, useState } from "react";
import { Container, Row, Col, Jumbotron, Pagination } from "react-bootstrap";
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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 0,
        }}
      >
        <div
          style={{
            textAlign: "center",
            backgroundColor: "rgba(0,0,0,0.66)",
            color: "whitesmoke",
            fontSize: 50,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 10,
            width: 300,
          }}
        >
          Ispovesti.ml
        </div>
      </Jumbotron>
      <Container className="body" style={{ marginTop: -30 }}>
        <Row>
          <Col>
            <Ispovesti />
          </Col>
        </Row>
      </Container>
      <Col style={{ display: "flex", justifyContent: "center" }}>
        <Arena
          showIntro={!userData?.arenaIntroCompleted}
          setUserData={setUserData}
          userData={userData}
        />
      </Col>
    </div>
  );
}

export default App;
