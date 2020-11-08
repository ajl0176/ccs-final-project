import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

function Nav(props) {
  return(
    <React.Fragment>
    <nav className="navbar">
    <ul className="navbar-nav mr-auto">
      <li><Link to={'/home'} className="nav-link">Home</Link></li>
      {props.isAuth
      ?
      <li><Link to ={'/menuform'} className="nav-link">Menu Form</Link></li>
      :
      <li><Link to={'/menu'} className="nav-link">Menu</Link></li>
    }
      <li><Link to={'/location'} className="nav-link">Location</Link></li>
      {props.isAuth
        ?
        <button className="navbar-buttons mr-2" onClick={props.handleLogout}>Log out</button>
        :
        <li><Link to={'/login'} className="nav-link">Log-In</Link></li>
      }



    </ul>
    </nav>
    <div>
      <hr />
    </div>

    </React.Fragment>

  )
}

export default Nav;
