import React, { Component } from 'react';
import './Calendar.css';


class EventItem extends Component  {

  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    return (

        <div className="container">
          <ul className="address-list">
            <div className="list-group-item">
              <div className="row ">
                <h5 className="col-2 ">{this.props.item.day}</h5>
                <div className="d-flex justify-content-center flex-fill bd-hightlight align-items-center">
                <h5 className="col-10">{this.props.item.location}</h5>
                </div>
              </div>
            </div>
          </ul>
        </div>


    );
  }
}

class CalendarList extends Component {

  render() {
    const events = this.props.events.map((item)=> <EventItem key={item.id} addDate={this.props.addDate}  item={item}/>);
    console.log(events)

    return(

      <div className="col">
        <h2 className="locations">Weekly Location</h2>
      {events}
      </div>

    )
  }
}
export default CalendarList;
