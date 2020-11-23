import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Contact.css';
import truck from './../images/truckfacingright.jpeg';



class Contact extends Component {
constructor(props) {
  super(props);
  this.state={
    }
  }

  render() {
    return(
    <div className="contact-title">
      <img className="contact-pic" src={truck} alt="truck"/>
        <div className="centered-title"> Contact Information:</div>
        <div className="centered-phone"> PHONE: 864-616-1151 </div>
        <div className="centered-email"> EMAIL: Organiconthego1@gmail.com</div>
      </div>

    );
  }
}

export default Contact;
