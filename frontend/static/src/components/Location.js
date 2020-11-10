import React, { Component } from 'react';
import CalendarList from './CalendarList';
import GoogleMapReact from 'google-map-react';
import Location from './Location';
import './Location.css';
import './map.css';

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
      lat: 34.6738,
      lng: -82.8369
    },
    zoom: 11
  };
  render() {
    console.log(this.props.center)
    return (
      // Important! Always set the container height explicitly

    <div className="container">
      <div className="row">
        <div className="col-location col-8">
            <CalendarList events={this.state.events} />
        </div>
        <div className="col-map col-4">
            <div style={{ height: '50vh', width: '600px' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
              >
              <AnyReactComponent
                lat={34.6738}
                lng={-82.8369}
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
