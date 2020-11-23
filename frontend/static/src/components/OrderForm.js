import React, { Component } from 'react';
import { Col, Row, Form, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
 import './OrderForm.css';
// import emailjs from 'emailjs-com';


class OrderForm extends Component {
  constructor(props) {
    super(props);
      this.state ={
        value:'',
      };

      this.sendEmail = this.sendEmail.bind(this);

    }

    sendEmail(e) {


      e.preventDefault(); // prevent reload
      // console.log(e.target.orderList.value)


      const subtotal = this.props.order.reduce((acc, item)=> {
      let total = acc + Number(item.price)
          return total
      }, 0);



      let orderList = '';
      this.props.order.forEach(item => {
        console.log(item);
        orderList +=  item.entree
      });
      console.log(orderList);

      // let subtotal = '';
      // this.props.order.forEach(item.price =>{
      //   console.log(price);
      //   subototal += item.price
      // } )


      let params = {
        user_id: 'user_sr0w503Gqj0aj0jeBbrWw',
        service_id: 'service_wdl1o7j',
        template_id: 'template_17m2cti',
        template_params: {
          'name':  e.target.name.value,
          'phone': e.target.phone.value,
          'email': e.target.email.value,
          'date': e.target.date.value,
          'pickup': e.target.pickup.value,
          'instructions': e.target.instructions.value,
          'orderList': orderList,
          'subtotal': `$ ${subtotal}`,
          // 'subtotal': subtotal,

        }
      };

      let headers = {
          'Content-type': 'application/json'
      };

      let options = {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(params)
      };

      fetch('https://api.emailjs.com/api/v1.0/email/send', options)
        .then((httpResponse) => {
            if (httpResponse.ok) {
                console.log('Your mail is sent!');
            } else {
                return httpResponse.text()
                  .then(text => Promise.reject(text));
            }
        })
        .catch((error) => {
            console.log('Oops... ' + error);
        });

        e.target.reset();
        this.props.checkOut();

    }


    render() {

      const subtotal = this.props.order.reduce((acc, item)=> {
      let total = acc + Number(item.price)
          return total
      }, 0);

      let orderList = this.props.order.map((item, index)=> (
        <div className="d-flex" key={index}>
          <h5 className="col-8 md={6}">{item.entree}</h5>
          <h5 className="col-2 md={6}">${item.price}</h5>
          <strong><button type="button" id="delete-order-item-button" className="btn col-2" onClick={()=>this.props.deleteOrder(item)}>DELETE</button></strong>
        </div>
      ));

      // function sendEmail(e){
        // e.preventDefault();
        // console.log(e.target)

      //   emailjs.sendForm('service_wdl1o7j', 'template_17m2cti', e.target, 'user_sr0w503Gqj0aj0jeBbrWw')
      //   .then((result) => {
      //     console.log(result.text);
      // }, (error) => {
      //     console.log(error.text);
      // });
      // e.target.reset()
      // }

          return(
          <React.Fragment>
            <Form onSubmit={this.sendEmail}>
              <h2 className="foodCategory">Order Form</h2>
              <br />
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" onChange={this.handleChange}/>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input type="text" name="phone" onChange={this.handleChange}/>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" onChange={this.handleChange}/>
              </FormGroup>
              <FormGroup>
                <Label for="date">Date</Label>
                <Input
                  type="date"
                  name="date"
                  onchange={this.handleChange}
                />
                </FormGroup>
                <FormGroup>
                  <Label for="pickup">Pick-Up Time </Label>
                  <Input
                    type="time"
                    id="pickup"
                    name="pickup"
                    min="11:00"
                    max="14:00"
                    onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                <Label for="name1">Special Instructions</Label>
                <Input type="text" name="instructions"  onChange={this.handleChange}/>
              </FormGroup>

            <FormGroup>
                <div className="row justify-content-between">
                  <div className="col-12 orders">
                    {orderList}
                  <hr className="solid"/>
                  </div>
                </div>
            </FormGroup>
            <FormGroup>
            <div className="row justify-content-center">
              <div className="col-6">
                  <div className="subtotal">
                      <h4>Total: ${subtotal}</h4>
                  </div>
              </div>
            </div>

            <div className="col-6">
              <input type="submit" className="btn btn-info" value="Check Out"/>
            </div>
            </FormGroup>
        </Form>
      </React.Fragment>
            )
          }
      };
      export default OrderForm;
