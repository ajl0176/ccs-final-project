import React, { Component } from 'react';
import OrderForm from './OrderForm';
import MenuList from './MenuList';
import Cookies from 'js-cookie';
import Registration from './Registration'
import LoginForm from './LoginForm';
import MenuForm from './MenuForm';


class Menu extends Component {

constructor(props) {
  super(props);

  this.state = {
    menuitems: [],
    menuitem: {},
    order: [],
    loggedIn: Cookies.get('Authorization')? true: false,
    display: 'all',
    subtotal: 0

  };
this.fetchMenuitems = this.fetchMenuitems.bind(this);
this.addOrder = this.addOrder.bind(this);
this.deleteOrder = this.deleteOrder.bind(this);
this.submitOrder = this.submitOrder.bind(this);
this.logIn = this.logIn.bind(this);
this.registration = this.registration.bind(this);
this.logOut = this.logOut.bind(this);
}

componentDidMount() {
  this.fetchMenuitems();
}

fetchMenuitems(){
  fetch('api/v1/menuitems')
  .then (response => response.json())
  .then (data => this.setState({menuitems: data}))
  .catch (error => console.log('Error:', error));
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

async registration(e, obj){
    e.preventDefault();

  const options = {
    method: 'POST',
    headers: {
      'X-CSRFToken': Cookies.get('csrftoken'),
      'Content-Type': 'application/json'
      },
    body: JSON.stringify(obj),
      };

  const handleError = (err) => console.warn(err);
  const response = await fetch('rest-auth/registration/', options)
  const data = await response.json().catch(handleError)

    if(data.key){
    Cookies.set('Authorization', `Token ${data.key}`);
      this.setState({loggedin: true, display:'menuform'});
      }
  }

async logIn(e, obj, registration){
    e.preventDefault();
    if(registration){
      this.setState({display: 'registration'});
    }else{

    const options = {
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    };

    const handleError = (err) => console.warn(err);
    const response = await fetch('rest-auth/login/', options)
    const data = await response.json().catch(handleError)

  if(data.key){
    Cookies.set('Authorization', `Token ${data.key}`);
    this.setState({isLoggedIn:true, display:'login',})
    localStorage.setItem('is_staff', data.is_staff);
        }
      }
    }


  async logOut(e){
    e.preventDefault();

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
        },
      };

  const handleError = (err) => console.warn(err);
  const response = await fetch('rest-auth/logout/', options);
  const data = await response.json().catch(handleError);

  if(data.detail === "Successfully logged out."){
    Cookies.remove('Authorization');
      this.setState({loggedIn: false, display: 'home'});
      localStorage.removeItem('is_staff');
      }
    }



  render(){
    let html;
    const display = this.state.display;

    if (display === 'registration'){
      html = <Registration registration={this.registration}/>
    } else if (display === 'login') {
      html = <LoginForm logIn={this.logIn}/>
    }

    return(
        <div className="row">
          <MenuList menuitems={this.state.menuitems} addOrder={this.addOrder}/>
          <OrderForm order={this.state.order} deleteOrder={this.deleteOrder} submitOrder={this.submitOrder}/>
        </div>

    );
  }
}

export default Menu;
