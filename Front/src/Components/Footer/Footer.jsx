import React from 'react'
import { NavLink} from 'react-router-dom';
import { ROUTES } from '../../Helpers/RoutesPath.jsx';
import logo from '../../Img/Imagen1.png'

function Footer() {
  return (
    <div class="container-fluid nav-bar">
  <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 mt-4 border-top">
    <p class="col-md-4 mb-0 text-white">© 2023 8Bits, Inc</p>

    <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
    <img  src={logo} width="80px" alt="" />
    </a>

    <ul class="nav col-md-4 justify-content-end">
      <li class="nav-item"><NavLink className='nav-link px-2 text-body-primary' to={ROUTES.HOME}>Home</NavLink></li>
      <li class="nav-item"><NavLink className='nav-link px-2 text-body-primary' to={ROUTES.STORE}>Store</NavLink></li>
      <li class="nav-item"><NavLink className='nav-link px-2 text-body-primary' to={ROUTES.ABOUT}>About us</NavLink></li>
    </ul>
  </footer>
</div>
  )
}

export default Footer