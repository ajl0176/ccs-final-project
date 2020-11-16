import React, {Component} from 'react';
import Cookies from 'js-cookie';
import './App.css';
import './Home.css'





class Home extends Component {
 constructor(props){
   super(props);


 }
  render() {
    return(

        <div className="container">


        <div className="logo">
          <img className="logo" src = "/Logo.jpg" alt="Logo"/>
        </div>
        </div>


    );
  }
}

export default Home;
