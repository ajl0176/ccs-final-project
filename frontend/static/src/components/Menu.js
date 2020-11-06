import React, { Component } from 'react';
import MenuList from './MenuList';
import OrderForm from './OrderForm';


class Menu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      menuItems: [],
      order: [],
      subtotal: 0
    };

    this.addOrder = this.addOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
  }

  addOrder(item) {
    console.log(item);
    const order = [...this.state.order, item];
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

    fetch('/api/v1/menuitems/')
      .then(response => response.json())
      .then(data => this.setState({menuItems: data}))
      .then(error=> console.log('Error', error));
  }

  render(){
    return (
      <React.Fragment>
        <div className="row">
        <MenuList menuItems={this.state.menuItems} addOrder={this.addOrder} />
        <OrderForm order={this.state.order} deleteOrder={this.deleteOrder} submitOrder={this.submitOrder}/>

        </div>
      </React.Fragment>
    );
  }
}

export default Menu;
