import React, { Component } from 'react';
import { Switch,Route, withRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Home from './Home';
import Menu from './Menu';
import MenuForm from './MenuForm';
import Location from './Location';
import Contact from './Contact';
import LocationForm from './LocationForm';
import Footer from './Footer';
import LoginForm from './LoginForm';
import Registration from './Registration';
import Nav from './Nav';
import Cookies from 'js-cookie';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: !!Cookies.get('Authorization')
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);

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

     deleteEvent(){
       fetch(`/api/v1/menuItems/${this.props.menuItemID}/`, {
         method: 'DELETE',
       })
       .catch((error)=> console.error('Error:', error));
     }



  render() {

    return (
      <React.Fragment>
      <Nav handleLogout={this.handleLogout} isAuth={this.state.isAuth} />
          <Switch>
            <Route path='/menuform' component={MenuForm}/>
            <Route path='/menu' component={Menu} />
            <Route path='/location' component={Location} />
            <Route path='/login' render={(props) => <LoginForm isAuth={this.state.isAuth} handleLogin={this.handleLogin} />}/>
            <Route path='/registration' render={(props) => <Registration isAuth={this.state.isAuth} handleRegistration={this.handleRegistration} />}/>
            <Route path='/' component={Home} exact />
            <Route path='/home' component={Home} />
            <Route path='/contact' component={Contact} />
            <Route path='/locationform' component={LocationForm} />
         </Switch>


         <div>
             <Footer></Footer>
             </div>
        </React.Fragment>

    );

  }
}

export default withRouter(App);
