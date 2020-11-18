import React, { Component } from 'react';
import './LoginForm.css';
import { Link } from "react-router-dom";

class LoginForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      username:'',
      password:'',
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

  render(){
    return(
      <React.Fragment>
      <form className="col-12 col-md-6 log-in" onSubmit={(event) => this.props.handleLogin(event, this.state)}>
        <h5 className="Register">Log in</h5>
        <div className="form-group mt-5">
          <label htmlFor="username">Username</label>
          <input type='text' className="form-control" id="username" name="username" value={this.state.username} onChange={this.handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type='password' className="form-control" id="password" name="password" value={this.state.password} onChange={this.handleChange}/>
        </div>
        <div className="create-Account-Btn">
          <button type="submit" className="btn btn-dark">Log In</button>
        <div>
          <Link to="/Registration">Don't have an account?</Link>
        </div>
        </div>
      </form>
      </React.Fragment>
    )
  }
}
export default LoginForm;
