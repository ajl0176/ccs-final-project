import React, {Component} from 'react';



class Contact extends Component {
constructor(props) {
  super(props);
  this.state={
    }
  }

  render() {
    return(
      <section>

      <div className="image">
      <div className="grid"> <img src="96D790C9-1646-46D9-B0E4-BDFB94FDFEF5_1_105_c.jpeg" alt="Logo"/></div>
      </div>
        <div className="col">
        <h2 className="contact-title"> Please Contact Us At:</h2>
        <h3> EMAIL: Organiconthego1@gmail.com</h3>
        <h3> PHONE: 864-616-1151 </h3>
        </div>
      </section>

    );
  }
}

export default Contact;
