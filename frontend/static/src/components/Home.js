import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import './Home.css'
import logo from './../images/logoblue.jpeg';

class Home extends Component {

  render() {
    return(

      <div className = "container-fluid">
        <div className=" align-items-start mb-2">
          <img className="logo" src={logo} alt="Logo"/>
        </div>
      </div>

    );
  }
}

export default Home;
