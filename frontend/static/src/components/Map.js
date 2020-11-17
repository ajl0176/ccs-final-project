import React, { Component } from 'react';
import CalendarList from './CalendarList';
import GoogleMapReact from 'google-map-react';
import './Location.css';
import './map.css';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
      events: [],
      locations: [],
      map: {},
      maps: {},
      markers: [],
    };
    this.addMarkers = this.addMarkers.bind(this);
    this.addToState = this.addToState.bind(this);
    this.renderMarkers = this.renderMarkers.bind(this);
  }
  async addToState(map, maps){
    const response = await fetch('api/v1/locations/');
    const data = await response.json();
    await this.setState({locations:data});
    await this.setState({map: map});
    await this.setState({maps: maps});
    this.addMarkers()
  }

  addMarkers(){
   const locations = this.state.locations;
   for(var i = 0; i < locations.length; i++){
     this.renderMarkers(locations[i]);
   }
 }


 renderMarkers(location){
    const map = this.state.map;
    const maps = this.state.maps;
    const intLat = parseFloat(location.lat);
    const intLng = parseFloat(location.lng);
     var infoWindow = new maps.InfoWindow({
       content: `<h5>${location.map_location}</h5>`
     });
     let marker = new maps.Marker({
     position: { lat: intLat, lng: intLng },
     map,
     title: location.name,
     });
     marker.addListener('click', function(){
       infoWindow.open(map, marker)
     })

      const markers = [...this.state.markers];
      markers.push(marker);
      this.setState({markers});
     return marker;
  };

  componentDidMount() {

    fetch('/api/v1/events/')
      .then(response => response.json())
      .then(data => this.setState({events: data}))
      .then(error=> console.log('Error', error));

    fetch('/api/v1/locations/')
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
    console.log(this.props.center);
    console.log('markers', this.state.markers);
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
