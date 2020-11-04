// import React, { Component } from 'react';
// // import './index.css';
// import LoginForm from './LoginForm';
// import MenuForm from './MenuForm';
// import MenuList from './MenuList';
// import './App.css';
import React from "react";
import {
 BrowserRouter as Router,
 Switch,
 Route,
 Link
} from "react-router-dom";

export default function App() {
 return (
   <Router>
     <div>
       <nav>
         <ul>
           <li>
             <Link to="/">Home</Link>
           </li>
           <li>
             <Link to="/menu">Menu</Link>
           </li>
           <li>
             <Link to="/users">Users</Link>
           </li>
         </ul>
       </nav>
       <Switch>
          <Route path="/menu">
            <Menu />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </div>
  </Router>
    );
  }

  function Home() {
    return <h2>Home</h2>;
  }

  function Menu() {
    return <h2>Menu</h2>;
  }

  function Users() {
    return <h2>Users</h2>;
  }
