import React, { Component } from 'react';
// import MenuList from './MenuList';




class OrderForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      }
    }

    render() {
      const subtotal = this.props.order.reduce((acc, item)=> {
      let total = acc + Number(item.price)
          return total
      }, 0);

      let orderList = this.props.order.map((item, index)=> (
        <div className="d-flex" key={index}>
          <h5 className="col-8">{item.entree}</h5>
          <h5 className="col-2">${item.price}</h5>
          <button type="button" className="btn col-2" onClick={()=>this.props.deleteOrder(item)}>Delete</button>
        </div>
      ));

          return(
            <div className="col">
              <div className="justify-content-md-center row">
                <h2 className="main-title">Order Form</h2>
              </div>
              <hr/>
              <div className="Information">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" name="name" value={this.state.name} onChange={this.handleChange}/>
              <label htmlFor="email">Email</label>
              <input type="text" className="form-control" id="email" name="email" value={this.state.email} onChange={this.handleChange}/>
              <label htmlFor="email">Phone</label>
              <input type="text" className="form-control" id="phone" name="phone" value={this.state.phone} onChange={this.handleChange}/>
              </div>
              <br />
            <div className="row justify-content-between">
                <div className="col-12">{orderList}
                <hr className="solid"/>
                </div>
              </div>

            <div className="row justify-content-center">
              <div className="col-6">
                  <div className="subtotal">
                      <h4>Total: ${subtotal}</h4>

                      <button onClick={this.props.submitOrder}>Check Out</button>

                </div>
              </div>
            </div>
        </div>
            )
          }
      };
      export default OrderForm;
