import React, { useEffect, useState } from "react";
import { Container, Row, Col, Jumbotron, Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { constants } from "./constants";
import { Arena } from "./Arena";
import { Ispovesti } from "./Ispovesti";
import { Landing } from "./Landing";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
    <Router>
      <div className="content">
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
          <Link
            className="mainLink"
            to="/"
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
          </Link>
        </Jumbotron>

        <Switch>
          <Route path="/published">
            <Container className="body" style={{ marginTop: -30 }}>
              <Row>
                <Col>
                  <Ispovesti />
                </Col>
              </Row>
            </Container>
          </Route>
          <Route path="/generated"></Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
