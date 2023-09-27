import React from "react";
import { useLocation } from "react-router-dom";

const FailureMP = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const failureReason = queryParams.get("failure_reason");

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Payment Rejected</h2>
              <p className="card-text">Your payment was rejected for the following reason:</p>
              <p className="card-text">{failureReason}</p>
              <a href="/" className="btn btn-primary">
                Go to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailureMP;