import React, { useContext } from "react";
import "./style.css";
import { Col, Container, Row } from "react-bootstrap";
import { serviceData } from "../../utils/products";
import { DarkModeContext } from "../../contexte";

const Wrapper = () => {
  const [darkMode, setDarkMode] = useContext(DarkModeContext);

  return (
    <section
      style={{
        color: darkMode ? "#000" : "#fff",
        backgroundColor: darkMode ? "#fff" : "#000",
      }}
      className="wrapper background"
    >
      <Container>
        <Row>
          {serviceData.map((val, index) => {
            return (
              <Col
                md={3}
                sm={5}
                xs={9}
                style={{
                  color: darkMode ? "#000" : "gold",
                  backgroundColor: darkMode ? "#fff" : "#000",
                }}
                className="feature"
                key={index}
              >
                <div className="icon">{val.icon}</div>
                <h3>{val.title}</h3>
                <p>{val.subtitle}</p>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default Wrapper;
