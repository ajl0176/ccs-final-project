import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Calendar.css';
import moment from 'moment';


class EventItem extends Component  {

  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    return (

        <div className="container" onClick={() => this.props.selectLocation(this.props.item.address)}>
          <ul className="address-list">
            <div className="list-group-item">

              <div className="row">
                <h5 className="col-8 day">{moment.utc(this.props.item.date).format("MMMM D, YYYY")} </h5>

                  <h5 className="col-4 time ">{moment.utc(this.props.item.start_time).format("h:mm a")}</h5>
                  <h5 className="col-4 time ">{moment.utc(this.props.item.end_time).format("h:mm a")}</h5>
              </div>

              <div className= "row">
                <h5 className="col-12">{this.props.item.location}</h5>
              </div>

              <div>
                <h5 className="col-11">{this.props.item.address}</h5>
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
        <h2 className="locations">Weekly Location</h2>
      <br />
      {events}
      </div>

    )
  }
}
export default CalendarList;
