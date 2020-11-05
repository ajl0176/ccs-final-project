import React, { Component } from 'react';
import { BrowserRouter as Router,Switch,Route, Link } from "react-router-dom";
// // import './index.css';
import LoginForm from './LoginForm';
// import MenuForm from './MenuForm';
import MenuList from './MenuList';
import OrderForm from './OrderForm';
import Location from './Location';
import Menu from './Menu';
// import './App.css';
// import React from "react";



class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> Home </Link></li>
            <li><Link to={'/MenuList'} className="nav-link"> Menu </Link></li>
            <li><Link to={'/location'} className="nav-link"> Location </Link></li>
            <li><Link to={'/OrderForm'} className="nav-link"> Check Out </Link></li>
            <li><Link to={'/LoginForm'} className="nav-link"> Log-In </Link></li>
          </ul>
          </nav>
          <hr />
          <Switch>
            <Route exact path='/' />
            <Route path='/menulist' component={MenuList} />
            <Route path='/location' component={Location} />
            <Route path='/orderform' component={OrderForm} />
            <Route path='/loginform' component={LoginForm} />
         </Switch>
        </div>


          <h1> Organic on the Go</h1>


      </Router>


    );

  }
}

export default App;






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
