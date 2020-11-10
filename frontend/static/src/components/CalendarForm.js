import React, { Component } from 'react';
import Cookies from 'js-cookie';


class CalendarForm extends Component {

  constructor(props) {
    super(props);

    this.state ={
      day: '',
      location: '',
    }
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange (event){
    this.setState({[event.target.name]:event.target.value})
  }

  addDate(event){
    event.preventDefault();

  const csrftoken = Cookies.get('csrftoken');

  fetch('/api/v1/events/event/add', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      'X-CSRFToken': csrftoken,
    },
       body: JSON.stringify(this.state)
    });
  }

  render() {
    return (
      <React.Fragment>
        <form className="col-12 col-md-6 form" onSubmit={(event) => {this.addDate(event, this.state); this.setState({day:'', location:''})}}>
          <div className="form group" >
            <label htmlFor="day">Day</label>
            <input type="text" className="form-control" id="day" name="day" value={this.state.day} onChange={this.handleChange}/>
            <label htmlFor="location">Location</label>
            <input type="text" className="form-control" id="location" name="location" value={this.state.location} onChange={this.handleChange}/>
          </div>
        <button type="submit" className="btn btn-primary">Add Day</button>
      </form>
    </React.Fragment>
      );
    }
  }

  export default CalendarForm;
