import React, { Component } from 'react';

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
      <form className="col-12 col-md-6 log-in" onSubmit={(event) => this.props.logIn(event, this.state)}>
        <h5 className="Register">Log in</h5>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type='text' className="form-control" id="username" name="username" value={this.state.username} onChange={this.handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type='password' className="form-control" id="password" name="password" value={this.state.password} onChange={this.handleChange}/>
        </div>
        <div className="create-Account-Btn">
          <button className="btn btn-primary">Log In</button>
        </div>
      </form>
      </React.Fragment>
    )
  }
}
export default LoginForm;
