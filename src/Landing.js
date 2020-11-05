import React from "react";
import "./Landing.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Landing() {
  return (
    <Container className="landingContainer">
      <Col>
        <Row className="landingRow">
          <Col className="landingInfo">
            Dobrodošli na ispovesti.ml. Na ovom sajtu pronaći ćete ispovesti
            generirane generativnim tekstualnim modelom pod imenom{" "}
            <a href="https://openai.com/blog/better-language-models/">gpt-2</a>{" "}
            - naučenom nad skupom od 120 hiljada ispovesti preuzetih sa sajta{" "}
            <a href="http://ispovesti.com">ispovesti.com</a>. Naš rad nad
            sastojao se od prikupljanja originalnog materijala (ispovesti), te
            treniranja modela kako bi upio njihovu bit. Rezultirajući model
            generirao je sve ispovesti koje se nalaze na ovom sajtu. Sors kod
            projekta dostupan je na{" "}
            <a href="https://github.com/dojitza/ispovesti.ml-backend">
              githubu
            </a>
          </Col>
        </Row>
        <Row className="landingRow">
          <Col className="landingCol">
            <Link to="/generated" className="landingButton generiraj">
              Generiraj nove i sudi
            </Link>
          </Col>
          <Col className="landingCol">
            <Link to="/published" className="landingButton citaj">
              Čitaj stare
            </Link>
          </Col>
        </Row>
      </Col>
    </Container>
  );
}
