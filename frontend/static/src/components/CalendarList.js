import React, { Component } from 'react';



class EventItem extends Component  {

  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    return (
      <main className="event-wrapper">
        <div className="container">
          <ul className="menu-list">
            <div className="list-group-item list-group-item-action">
              <div className="row ">
                <h5 className="col-10 ">{this.props.item.day}</h5>
                <h5 className="col-2">${this.props.item.location}</h5>
              </div>
            </div>
          </ul>
        </div>
    </main>

    );
  }
}

class CalendarList extends Component {

  render() {
    const events = this.props.events.map((item)=> <EventItem  item={item}/>);

    return(

      <div className="col">
        <div className="col-12">
        <h2 className="locations">Weekly Location</h2>
      {events}
      </div>
      </div>
    )
  }
}
export default CalendarList;
