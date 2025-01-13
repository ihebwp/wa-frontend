import React from "react"
import "./style.css"
import { Col, Container, Row } from "react-bootstrap"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Divider, Grid } from "@mui/material";
const Footer = () => {
  return (
    <footer>
        <Container>
          <Row className="footer-row">
            <Col md={3} sm={5} className='box'>
              <div className="logo">
                  <ion-icon name="bag"></ion-icon>
                  <h1>WA Commerce</h1>
              </div>
              <p>Wa commerce Company : Shopping online</p>
            </Col>
            <Col md={3} sm={5} className='box'>
              <h2>Links</h2>
              <ul>
                <li>Home</li>
                <li>Shop</li>
                <li>Cart</li>
               
              </ul>
            </Col>
            <Col md={3} sm={5} className='box'>
            <h2>Get in touch</h2>
              <ul>
                <li><FacebookIcon/> Facebook </li>
                <li><InstagramIcon/> Instagram </li>
                <li><LinkedInIcon/> LinkedIn </li>
               
              </ul>
            </Col>
            <Col md={3} sm={5} className='box'>
              <h2>Contact Us</h2>
              <ul>
                <li>Tunis, Tunisie</li>
                <li>Email: aymenbourogaa5@gmail.com</li>
                <li>Phone: +216 95970265</li>
              </ul>
            </Col>
          </Row>
          <Grid
  container

  direction="column"
  alignItems="center"
  justifyContent="center"
  sx={{ marginTop: '10vh' }}
>
<Divider >
&copy; <span>{`${new Date().getFullYear()} Wa-commerce, `}</span>All rights reserved.
  
</Divider>
          </Grid>
        </Container>
    </footer>
  )
}

export default Footer
