import React, { Component }from 'react';
// import "../CSS/OrderForm.css";




class OrderForm extends Component {
constructor(props) {
  super(props);
  this.state={
    }
  }



  render() {
const subtotal = this.props.order.reduce((acc, item)=> {
  let total = acc + item.price
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

      <div className="row justify-content-between">
          <div className="col-12">{orderList}
          <hr class="solid"/>
          </div>
        </div>

      <div className="row justify-content-center">
        <div classname="col-6">
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
