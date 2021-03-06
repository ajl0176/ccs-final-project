import React, {Component} from 'react';



class Register extends Component {
  constructor (props){
    super (props);
    this.state ={
      username:'',
      email: '',
      password1:'',
      password2:'',
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

 render(){
   return(
     <div>
     <h1>Registration Form</h1>
     <form className="col-12 col-md-6" onSubmit={(event) => this.props.handleRegistration(event, this.state)}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type='text' className="form-control" id="username" name="username" value={this.state.username} onChange={this.handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type='text' className="form-control" id="email" name="email" value={this.state.email} onChange={this.handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="password1">Password</label>
          <input type='text' className="form-control" id="password1" name="password1" value={this.state.password1} onChange={this.handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input type='text' className="form-control" id="password2" name="password2" value={this.state.password2} onChange={this.handleChange}/>
        </div>
          <button className="btn btn-primary">Register</button>
      </form>
      </div>
   )
 }
}

export default Register;
