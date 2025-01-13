import { Col, Container, Row } from "react-bootstrap";
import "./slidercard.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../contexte";
import ReactAudioPlayer from "react-audio-player";
import audio from '../../audios/audio.mp3'

const SlideCard = ({ title, desc, cover }) => {
  const [darkMode, setDarkMode] = useContext(DarkModeContext);

  return (
    <Container
      style={{
        color: darkMode ? "#000" : "#fff",
        backgroundColor: darkMode ? "#fff" : "#000",
      }}
      className="box"
    >
      <Row>
        <Col md={6}>
          <h1>{title}</h1>
          <p>{desc}</p>
          <Link aria-label="Go to shop Page" to="/shop" className="link">
          
            {/* <button style={{padding:"10px",borderRadius:"20px" }} className="btn-secondary">Visit Collections</button> */}
          </Link>
        </Col>
        <Col md={6}>
          <img style={{marginTop:"40px"}} src={cover} alt="#" />
        </Col>
      </Row>
    </Container>
  );
};

export default SlideCard;
