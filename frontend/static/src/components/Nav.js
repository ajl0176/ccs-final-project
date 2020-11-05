import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return(
    <React.Fragment>
    <h1> Organic on the Go</h1>
    <nav className="navbar navbar-expand-lg navbar bg-light">
    <ul className="navbar-nav mr-auto">
      <li><Link to={'/'} className="nav-link">Home</Link></li>
      <li><Link to={'/menu'} className="nav-link">Menu</Link></li>
      <li><Link to={'/location'} className="nav-link">Location</Link></li>
      <li><Link to={'/Checkout'} className="nav-link">Check Out</Link></li>
      <li><Link to={'/login'} className="nav-link">Log-In</Link></li>
      <li><Link to={'/registration'} className="nav-link">Register</Link></li>
    </ul>
    </nav>
    <hr />
    </React.Fragment>
  )
}

export default Nav;
