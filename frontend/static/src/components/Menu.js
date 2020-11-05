import React, { Component } from 'react';
import OrderForm from './OrderForm'
import MenuList from './MenuList';


class Menu extends Component {

constructor(props) {
  super(props);

  this.state = {
    entrees: [],
    order: [],
    cart: [],
    subtotal: 0

  };
this.addOrder = this.addOrder.bind(this);
this.deleteOrder = this.deleteOrder.bind(this);
this.submitOrder = this.submitOrder.bind(this);


}

addOrder(item){
  console.log(item);
  const order = [...this.state.order, item];
  //console.log(order);
  this.setState({order, order});


}

deleteOrder(item){
  console.log(item);
  const order = [...this.state.order];
  const index = order.indexOf(order);
  order.splice(index, 1);
  this.setState({order, order});
}

submitOrder() {
  alert("Your order was submitted!");
  this.setState({order: []});
}


componentDidMount() {
  const entrees = [
      {
        item: `DEVILED EGGS`,
        description: `Country ham, capers, pickled okra, evoo`,
        price:7
      },
    ];
  this.setState ({ entrees })

};


  render(){

    return(
      <div className="row">
      <MenuList entrees={this.state.entrees} addOrder={this.addOrder} />
      <OrderForm order={this.state.order} deleteOrder={this.deleteOrder} submitOrder={this.submitOrder}/>

    </div>

    );
  }
}

export default Menu;



// <RestMenu subtotal={this.state.total} subtotal = {this.state.subtotal} deleteOrder = {this.deleteOrder} checkOut = {this.checkOut}/>
