import React, { Component } from 'react';
import { Switch,Route, Link, withRouter } from "react-router-dom";
import MenuList from './MenuList';
import OrderForm from './OrderForm';
import Location from './Location';
import Menu from './Menu';
import Registration from './Registration';
import LoginForm from './LoginForm';
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
    this.setState({isAuth: true}, () => this.props.history.push('/menu'))

  }

  handleLogin() {

  }

  handleLogout() {

  }

  render() {
    return (
        <div>
          <Nav />
          <Switch>
            <Route path='/menu' component={Menu} />
            <Route path='/location' component={Location} />
            <Route path='/checkout' component={Menu} />
            <Route path='/login' render={(props) => <LoginForm isAuth={this.state.isAuth} handleLogin={this.handleLogin} />}/>
            <Route path='/registration' render={(props) => <Registration isAuth={this.state.isAuth} handleRegistration={this.handleRegistration} />}/>
         </Switch>
        </div>
    );
  }
}

export default withRouter(App);






// export default function App() {
//
//   this.state ={
//     entrees: [],
//     proteins: [],
//     veggies:[],
//     highcarbs:[],
//     order: [],
//     cart:[],
//     subtotal: 0,
//   }
//
//   this.addOrder = this.addOrder.bind(this);
//   this.deleteOrder = this.deleteOrder.bind(this);
//   this.submitOrder = this.submitOrder.bind(this);
//   this.fetchEntrees = this.fetchEntrees.bind(this);
//   this.fetchProteins = this.fetchProteins.bind(this);
//   this.fetchVeggies = this.fetchVeggies.bind(this);
//   this.fetchHighcarbs = this.fetchHighcarbs.bind(this);
//   this.logIn = this.logIn.bind(this);
//   this.logOut = this.logOut.bind(this);
//   this.handleClick = this.handlClick.bind(this);
// }
//
//   componentDidMount(){
//     fetch('/api/v1/')
//     .then(response => response.json())
//     .then(data => this.setState({entrees: data}));
//   }
//
//   addOrder(item) {
//     const order = [...this.state.order, item];
//     this.setState({order, order});
//   }
//
//   deleteOrder(item){
//     const order = [...this.state.order];
//     const index = order.indexOf(order);
//     order.splice(index, 1);
//     this.setState({order, order});
//   }
//
//
//
//  return (
//    <Router>
//      <div>
//        <nav>
//          <ul>
//            <li>
//              <Link to="/">Home</Link>
//            </li>
//            <li>
//              <Link to="/menu">Menu</Link>
//            </li>
//            <li>
//              <Link to="/users">Users</Link>
//            </li>
//          </ul>
//        </nav>
//        <Switch>
//           <Route path="/menu">
//             <Menu />
//           </Route>
//           <Route path="/users">
//             <Users />
//           </Route>
//           <Route path="/">
//             <Home />
//           </Route>
//         </Switch>
//     </div>
//   </Router>
//     );
//   }
//
//   function Home() {
//     return
//     <div className="row">
//       <h2>Home</h2>
//       <MenuList entrees={this.state.entrees}  addOrder={this.addOrder} />
//     </div>
//   };
//
//   function Menu() {
//     return <h2>Menu</h2>;
//   }
//
//   function Users() {
//     return <h2>Users</h2>;
//   }
