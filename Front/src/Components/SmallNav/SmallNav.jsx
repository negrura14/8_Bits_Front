import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar.jsx'
import { ROUTES } from '../../Helpers/RoutesPath.jsx';
import './SmallNav.css';

function SmallNav() {
  const location = useLocation();
 
  return (
    <div className="small-nav">
      <nav className="d-flex">
        <ul className="nav nav-pills">
          <li className="nav-item margCart">
            <NavLink className="nav-link" to={ROUTES.CREATEGAME}>Create</NavLink>
          </li>
        </ul>
        <div className="search-small-nav"> {/* Mover SearchBar al final */}
          <SearchBar />
        </div>
      </nav>
    </div>
  );


}

export default SmallNav;