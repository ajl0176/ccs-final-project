import React from 'react';
import { Link } from 'react-router-dom';
import './Footer';

class Footer extends React.Component
{
  render()
  {
    return (
        <Link to={'/login'} className="nav-login">Admin</Link>
    )
  }
}
export default Footer;
