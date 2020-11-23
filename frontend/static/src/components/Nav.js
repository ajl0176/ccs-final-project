import React from 'react';
import { Link } from 'react-router-dom';

import './Nav.css';

function Nav(props) {
  return(
    <React.Fragment>

    <nav className="navbar navbar-expand-md navbar-dark bg-primary">

      <ul className="navbar-nav mr-auto">
        <li><Link to={'/home'} className="nav-link">Home</Link></li>
        {props.isAuth
        ?
        <li><Link to ={'/menuform'} className="nav-link">Menu Form</Link></li>
        :
        <li><Link to={'/menu'} className="nav-link">Menu</Link></li>
        }
        {props.isAuth
        ?
        <li><Link to={'/locationform'} className="nav-link">Location Form</Link></li>
        :
        <li><Link to={'/location'} className="nav-link">Location</Link></li>
        }
        <li><Link to ={'/contact'} className="nav-link">Contact</Link></li>
        {props.isAuth
        ?
        <button type="button" className="btn  logout btn-secondary "  id="logout" onClick={props.handleLogout}>Log out</button>
        :
        <li><Link to={'/login'} className="nav-login">Admin</Link></li>
        }

      </ul>

    </nav>

    </React.Fragment>
  )
}

export default Nav;
