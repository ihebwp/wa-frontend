import { Col, Container, Row } from "react-bootstrap";
import productBg from "../../Images/puffs/gallery-13.jpg";
import "./banner.css";
const Banner = ({title}) => {   
    return ( 
        <div className="image-container">
            <div className="overlay">
                <Container>
                    <Row>
                        <Col>
                            <h2>{title}</h2>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Banner;