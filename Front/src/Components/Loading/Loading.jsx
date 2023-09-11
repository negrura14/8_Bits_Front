import React from "react";
import './Loading.css';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';



// export default function LoadingPage() {
//     return(
//         <>
      
//       <Button variant="primary" disabled>
//         <Spinner
//           as="span"
//           animation="grow"
//           size="lg"
//           role="status"
//           aria-hidden="true"
//         />
//         Loading...
//       </Button>
//     </>
//     )
// }

export default function LoadingPage() {
    return (
      <div className="m-5 loading-container">
        <div className="center row">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
        <div className="center2 row text-center m-5">
          <div className="loader">
            <div className="scanner">
              <span>Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }