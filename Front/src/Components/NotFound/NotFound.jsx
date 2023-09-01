import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Helpers/RoutesPath";
import Container from "react-bootstrap/esm/Container";

export default function NotFound() {
  return (
    <Container fluid className="text-center">
      <div className="error">404</div>
      <br />
      <br />
      <span className="info">Game Over: Not Found</span>
      <Link to={ROUTES.HOME}>
        <button className="btn-error">
          <span> BACK TO HOME</span>
        </button>
      </Link>
    </Container>
  );
}
