import React, { useEffect } from 'react'
import { NavLink} from 'react-router-dom';
import { ROUTES } from '../../Helpers/RoutesPath.jsx';
import logo from '../../Img/Imagen1.png'

function Footer() {

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };

    // Agregar un listener al botón en el montaje del componente
    const button = document.getElementById('scrollToTopButton');
    if (button) {
      button.addEventListener('click', scrollToTop);
    }

    // Limpiar el listener cuando el componente se desmonta
    return () => {
      if (button) {
        button.removeEventListener('click', scrollToTop);
      }
    };
  }, []);
  
  return (
    <div className="container-fluid nav-bar mt-auto">
  <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 mt-4 border-top">
    <p className="col-md-4 mb-0 text-white">© 2023 8Bits, Inc</p>

    <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
    <img  src={logo} width="80px" alt="" />
    </a>

    <ul className="nav col-md-4 justify-content-end">
      <li className="nav-item"><NavLink className='nav-link px-2 text-body-primary' onClick={() => window.scrollTo(0, 0)} to={ROUTES.HOME}>Home</NavLink></li>
      <li className="nav-item"><NavLink className='nav-link px-2 text-body-primary' onClick={() => window.scrollTo(0, 0)} to={ROUTES.STORE}>Store</NavLink></li>
      <li className="nav-item"><NavLink className='nav-link px-2 text-body-primary' onClick={() => window.scrollTo(0, 0)} to={ROUTES.ABOUT}>About us</NavLink></li>
    </ul>
  </footer>
</div>
  )
}

export default Footer