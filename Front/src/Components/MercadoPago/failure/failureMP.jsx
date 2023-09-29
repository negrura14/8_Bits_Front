
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from '../../../Helpers/RoutesPath'

const FailureMP = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const collectionStatus = queryParams.get("collection_status");
  const paymentId = queryParams.get("payment_id");
  const status = queryParams.get("status");

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Estado de carga

  useEffect(() => {
    // Puedes agregar lógica adicional aquí, por ejemplo, guardar el registro de rechazo en tu base de datos si es necesario.
  }, []);

  const handleGoHomeClick = () => {
    setIsLoading(true); // Establece isLoading en true al hacer clic
    navigate("/");
  };

  const handleTryAgainClick = () => {
    setIsLoading(true); // Establece isLoading en true al hacer clic
    navigate(ROUTES.CHECKOUT);
  };

  // Muestra un mensaje de carga si isLoading es true
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Renderiza el componente normal si isLoading es false
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Payment Rejected</h2>
              <p className="card-text">Your payment was rejected</p>
              <p className="card-text">Payment ID: {paymentId}</p>
              <p className="card-text">Status: {status}</p>

              <button onClick={handleGoHomeClick} className="btn btn-primary">
                Go to Home
              </button>
              <p>or</p>
              <button onClick={handleTryAgainClick} className="btn btn-primary">
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailureMP;

// import React, { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {ROUTES} from '../../../Helpers/RoutesPath'

// const FailureMP = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const collectionStatus = queryParams.get("collection_status");
//   const paymentId = queryParams.get("payment_id");
//   const status = queryParams.get("status");


//   const navigate = useNavigate();
  
//   console.log('QUE MUESTRO ?',queryParams);

//   useEffect(() => {
//     // Puedes agregar lógica adicional aquí, por ejemplo, guardar el registro de rechazo en tu base de datos si es necesario.
//   }, []);

//   return (
//     <div className="container mt-5">
//       <div className="row">
//         <div className="col-md-6 offset-md-3">
//           <div className="card">
//             <div className="card-body">
//               <h2 className="card-title">Payment Rejected</h2>
//               <p className="card-text">Your payment was rejected </p>
//               <p className="card-text">Payment ID: {paymentId}</p>
//               <p className="card-text">Status: {status}</p>
              
//               <button onClick={() => navigate("/")} className="btn btn-primary">
//                 Go to Home
//               </button>
//               <p>or </p>
//               <button onClick={() => navigate(ROUTES.CHECKOUT)} className="btn btn-primary">
//                Try again
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FailureMP;