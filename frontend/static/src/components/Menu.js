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
    this.submitOrder = this.submitOrder.bind(this);
    this.fetchMenuItems = this.fetchMenuItems.bind(this);
    this.fetchAddOns = this.fetchAddOns.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
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

  async deleteItem(e) {
    // e.preventDefault();

    const options = {
      method: 'DELETE',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
        },
      };
      const handleError = (err) => console.warn(err);
      const response =  await fetch (`/api/v1/menuitems/${this.state.menuitems}`, options)
      const data = await response.json().catch(handleError)
      console.log(data);
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
            <OrderForm order={this.state.order} deleteOrder={this.deleteOrder} submitOrder={this.submitOrder}/>
          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default Menu;
