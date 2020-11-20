import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Calendar.css';
import moment from 'moment';


class EventItem extends Component  {

  constructor(props){
    super(props);
    this.state = {
      selected: false,
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      selected: !this.state.selected
    })
    this.props.selectLocation(this.props.item)
  }

  render(){
    return (

        <div className="container" onClick={this.handleClick}>
          <ul className="address-list">
            <div className={`list-group-item ${this.state.selected ? "location-selected" : null}`}>

              <div className="row">
                <h5 className="col-8 day">{moment.utc(this.props.item.date).format("MMMM D, YYYY")} </h5>

                  <h5 className="col-4 time location-detail"> From: 11:00 AM</h5>
                  <h5 className="col-4 time location-detail">Until: 2:00 PM</h5>
              </div>

              <div className= "row">
                <h5 className="col-12 location-detail">{this.props.item.location}</h5>
              </div>

              <div className= "row">
                <h5 className="col-12 location-detail">{this.props.item.address}</h5>
              </div>

            </div>
          </ul>
        </div>
    );
  }
}

class CalendarList extends Component {

  render() {
    const events = this.props.events.map((item)=> <EventItem key={item.id} addDate={this.props.addDate} deleteDate={this.props.deleteDate} item={item} selectLocation={this.props.selectLocation}/>);
    console.log(events)

    return(

      <div className="col">
      <br />
        <h2 className="locations">Location Schedule</h2>
      <br />
      {events}
      </div>

    )
  }
}
export default CalendarList;
