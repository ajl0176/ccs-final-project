import React, { Component } from 'react';
import { Switch,Route, Link, withRouter } from "react-router-dom";
import Home from './Home';
import Menu from './Menu';
import MenuForm from './MenuForm';
import Location from './Location';
import Calendar from './Calendar';
import CalendarList from './CalendarList';
import MenuList from './MenuList';
import OrderForm from './OrderForm';
import LoginForm from './LoginForm';
import Registration from './Registration';
import Nav from './Nav';
import Cookies from 'js-cookie'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: !!Cookies.get('Authorization')
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

  }

  async handleRegistration(event, user) {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': Cookies.get("csrftoken"),
      },
      body: JSON.stringify(user)
    };

    const handleError = (err) => console.warn(err);
    const response = await fetch('/rest-auth/registration/', options).catch(handleError);
    const data = await response.json().catch(handleError);

    Cookies.set('Authorization', `Token ${data.key}`);
    this.setState({isAuth: true}, () => this.props.history.push('/home'));

  }

  async handleLogin(event, user) {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': Cookies.get("csrftoken"),
      },
      body: JSON.stringify(user)
    };

    const handleError = (err) => console.warn(err);
    const response = await fetch('rest-auth/login/', options).catch(handleError);
    const data = await response.json().catch(handleError);

    Cookies.set('Authorization', `Token ${data.key}`);
    this.setState({isAuth: true});
    this.props.history.push('/menuform');
  }


  async handleLogout(event) {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookies.get("csrftoken"),
      }
    };
    const handleError = (err) => console.warn(err);
    const response = await fetch('rest-auth/logout/', options);
    const data = await response.json().catch(handleError);

    if(data.detail === 'Successfully logged out.'){
        Cookies.remove('Authorization');
        this.setState({isAuth:false});
        this.props.history.push('/home');
      }
     }



  render() {
    const isAuth = this.state.isAuth;
    return (
      <React.Fragment>
      <Nav handleLogout={this.handleLogout} isAuth={this.state.isAuth} />
          <Switch>
            <Route path='/menuform' component={MenuForm} />
            <Route path='/menu' component={Menu} />
            <Route path='/location' component={Location} />
            <Route path='/login' render={(props) => <LoginForm isAuth={this.state.isAuth} handleLogin={this.handleLogin} />}/>
            <Route path='/registration' render={(props) => <Registration isAuth={this.state.isAuth} handleRegistration={this.handleRegistration} />}/>
            <Route path='/' component={Home} exact />
         </Switch>
        </React.Fragment>
    );
  }
}

export default withRouter(App);
