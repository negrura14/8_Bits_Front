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
      <div className="loading-container">
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="lg"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </Button>
      </div>
    );
  }