import React from "react";
import './Loading.css';
import logo from "../../Img/Logo.png"



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
      <>

      <img className="logoL" src={logo}></img>
      <div className="loading">
      Loading&#8230;
      </div>
      </>
    );
  }