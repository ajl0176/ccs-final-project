import React from 'react';
import { Link } from 'react-router-dom';

function Nav(props) {
  return(
    <React.Fragment>
    <h1> Organic on the Go</h1>
    <nav className="navbar navbar-expand-lg navbar bg-light">
    <ul className="navbar-nav mr-auto">
      <li><Link to={'/home'} className="nav-link">Home</Link></li>
      <li><Link to={'/menu'} className="nav-link">Menu</Link></li>
      <li><Link to={'/location'} className="nav-link">Location</Link></li>
      {props.isAuth
        ?
        <button className="navbar-buttons mr-2" onClick={props.handleLogout}>Log out</button>
        :
        <li><Link to={'/login'} className="nav-link">Log-In</Link></li>
      }


    </ul>
    </nav>

    <hr />
    </React.Fragment>
  )
}

export default Nav;
