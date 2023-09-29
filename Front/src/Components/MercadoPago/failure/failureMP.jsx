
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from '../../../Helpers/RoutesPath'
import Logo from "../../../Img/Logo.png"

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
    <div className="row d-flex justify-content-center">
      <div className="col-md-10 backgroundinvoice">
        
        <div className="row">
          <div className="col-sm-6">
              <img className="imgFS" src={Logo}/>
          </div>
         
    
          <div className="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
              <hr className="d-sm-none" />
              <div className="text-white">
                  <div className="mt-1 mb-2 text-600 ">
                      Invoice
                  </div>
    
                  <div className="my-2 "><i className="fa fa-circle text-secondary me-1"></i> <span className="text-600">Payment ID:</span> {paymentId}</div>
    
                  <div className="my-2"><i className="fa fa-circle text-secondary me-1"></i> <span className="text-600">Status:</span> <span className="text-danger">{status}</span></div>
              </div>
          </div>
          
      </div>
    
      <div className="mt-4 ">
        
          <div className="row border-b-2 brc-default-l2 d-flex"></div>
          <div className="d-flex justify-content-center">

            <div className=" divPaymentError d-flex justify-content-center align-items-center text-white">
              <div>
                <h2 className="card-title text-white">Payment Rejected</h2>
                <p className="card-text text-white">Your payment was rejected</p>
              </div>
                
            </div>
          </div>
    
    
          
    
          <hr />
    
          <div className="d-flex justify-content-center">
            <button onClick={handleGoHomeClick} className="btn btn-outline-primary text-white bg-transparent px-4 ">
              Go to Home
            </button>
            <div className="d-flex justify-content-center align-items-center mx-4 p-2">
              <p className="m-0 text-white">or</p>

            </div>
            <button onClick={handleTryAgainClick} className="btn btn-outline-primary text-white bg-transparent px-4 ">
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