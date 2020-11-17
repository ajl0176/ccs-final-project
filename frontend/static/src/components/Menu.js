import React, { Component } from 'react';
import MenuList from './MenuList';
import OrderForm from './OrderForm';
import Cookies from 'js-cookie';

class Menu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      menuItems: [],
      addOns: [],
      order: [],
      subtotal: 0,
    };

    this.addOrder = this.addOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.checkOut = this.checkOut.bind(this);
    this.fetchMenuItems = this.fetchMenuItems.bind(this);
    this.fetchAddOns = this.fetchAddOns.bind(this);
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

  checkOut() {
    this.setState({order: []});
  }

  fetchMenuItems() {
    fetch('/api/v1/menuitems/')
      .then(response => response.json())
      .then(data => this.setState({menuItems: data}))
      .then(error=> console.log('Error', error));

  }

  fetchAddOns() {
    fetch('/api/v1/menuitems/addons/')
      .then(response => response.json())
      .then(data => this.setState({addOns: data}))
      .then(error=> console.log('Error', error));
  }


  componentDidMount() {
    this.fetchMenuItems();
    this.fetchAddOns();
  }



  render(){
    return (
      <React.Fragment>

        <div className="row">
          <div className="col-7">
            <MenuList menuItems={this.state.menuItems} addOns={this.state.addOns} addOrder={this.addOrder} />

          </div>
          <div className="col-5">
            <OrderForm order={this.state.order} deleteOrder={this.deleteOrder} checkOut={this.checkOut}/>

          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default Menu;
