import React from 'react';
import { Link } from 'react-router-dom';
import {ROUTES} from '../../Helpers/RoutesPath'
import './LandingPage.css'
import logo from "../../Img/Logo.png"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const Landing = () => {
  return (
    <Container fluid className="landing-page">
      <Row >
        <Col>
          <img className='logo' src={logo}></img>
        </Col>
      </Row>
      <Row>
        <Col><p className='slogan'>Immerse yourself in the gaming world!</p></Col>
      </Row>
      <Row>
        <Col>
        <Link to={ROUTES.HOME}>
        <button className="btn-landing"><span> START
  </span></button>
      </Link>
      </Col>
      </Row>
    </Container>
  );
};

export default Landing;
