import React, { Component } from 'react';
import CalendarList from './CalendarList';
import GoogleMapReact from 'google-map-react';
import Location from './Location';
import './Location.css';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
class SimpleMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
      events: [],
    };
  }

  componentDidMount() {

    fetch('/api/v1/events/')
      .then(response => response.json())
      .then(data => this.setState({events: data}))
      .then(error=> console.log('Error', error));
  };

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  render() {
    return (
      // Important! Always set the container height explicitly

    <div className="container">
      <div className="row">
        <div className="col-location">
          <h1 className ="category-header-weekly">Where's OOTG</h1>
            <div classname="list-group-weekly">
            <CalendarList events={this.state.events} />
            </div>
        </div>
        <div className="col-map">
            <div style={{ height: '50vh', width: '600px' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
              >
              <AnyReactComponent
                lat={59.955413}
                lng={30.337844}
                text="My Marker"
              />
            </GoogleMapReact>
          </div>
      </div>
    </div>
  </div>

    );
  }
}

export default SimpleMap;

// class Calendar extends Component {
//
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       events: [],
//     };
//   }
//
//   componentDidMount() {
//
//     fetch('/api/v1/events/')
//       .then(response => response.json())
//       .then(data => this.setState({events: data}))
//       .then(error=> console.log('Error', error));
//   }
//
//   render(){
//     return (
//       <React.Fragment>
//         <div className="row">
//         <CalendarList events={this.state.events} />
//         </div>
//       </React.Fragment>
//     );
//   }
// }
//
// export default Calendar;
