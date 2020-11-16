import React, { Component } from 'react';
import CalendarList from './CalendarList';
import GoogleMapReact from 'google-map-react';
import MapAddMarker from './MapAddMarker';
import './Location.css';
import './map.css';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {

  constructor(props) {
    super(props)

    this.state = {
      locations: [],
      map: {},
      maps: {},
      days: [],
      markers: [],
    }
    this.renderMarkers = this.renderMarkers.bind(this);
    this.addMarkers = this.addMarkers.bind(this);
    this.addToState = this.addToState.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.filterMarkers = this.filterMarkers.bind(this);
  }

  async addToState(map, maps){
    const response = await fetch('api/v1/locations/');
    const data = await response.json();
    await this.setState({locations:data});
    await this.setState({map: map});
    await this.setState({maps: maps});
    this.addMarkers()
  }

handleChecked(event){
  let days = this.state.days;
   let check = event.target.checked;
   let checked_day = event.target.value;
   if(check){
     this.setState({
       days: [...this.state.days, checked_day]
     })
   }else{
     var index = days.indexOf(checked_day);
     if (index > -1) {
       days.splice(index, 1);
         this.setState({
           days: days
      })
    }
  }
}

async filterMarkers(event){
  event.preventDefault();
  const markers = [...this.state.markers];
  for(let i=0; i <markers.length; i++){
    markers[i].setMap(null);
  }
  await this.setState({markers: []})
  const days = this.state.days;

  if(days.length> 0){
    const locations = this.state.locations.filter(
      location => days.every(item=>locations.days.includes(item))
    )
    console.log(locations);
    for(var i=0; i < locations.length; i++){
      this.renderMarkers(locations[i]);
    }
  }else{
    console.log('We are here');
    this.addMarkers();
  }
}

addMarkers(){
  const locations = this.state.locations;
  for(var i=0; i < locations.length; i++){
    this.renderMarkers(locations[i]);
  }
}
renderMarkers(location){
  const map = this.state.map;
  const maps = this.state.maps;
  const intLat = parseFloat(location.lat);
  const intLng = parseFloat(location.lng);
  var infoWindow = new maps.InfoWindow({
    content:`<a href="https://www.google.com/maps/place/${location.address}">${location.address}</a>`
  });
  let marker = new maps.Marker({
    position: {lat: intLat, lng: intLng },
    map,
  });
  marker.addListener('click', function(){
    infoWindow.open(map, marker)
  })

  const markers = [...this.state.markers];
  markers.push(marker);
  this.setState({markers});
  return marker;
};


  // componentDidMount() {
  //
  //   fetch('/api/v1/events/')
  //     .then(response => response.json())
  //     .then(data => this.setState({events: data}))
  //     .then(error=> console.log('Error', error));
  // };
  //
  // static defaultProps = {
  //   center: {
  //     lat: 34.6738,
  //     lng: -82.8369
  //   },
  //   zoom: 11
  // };


  render() {
    // console.log(this.props.center)
    console.log('markers', this.state.markers);
    return (
      // Important! Always set the container height explicitly

      <div className='row'>
        <div className='col-md-6 '>
        <form className="col-12 mb-6 form location-form" onSubmit={(event)=> this.filterMarkers(event)}>
          <div className="form-group">
            <h4>Weekly Locations</h4>

            <div className="form-check location-filters">
              <input className="form-check-input" type="checkbox" id="Sunday" value="Sunday" onChange={this.handleChecked} />
              <label className="form-check-label" htmlFor="Sunday">Sunday</label>
            </div>
            <div className="form-check location-filters">
              <input className="form-check-input" type="checkbox" id="Monday" value="Monday" onChange={this.handleChecked} />
              <label className="form-check-label" htmlFor="Monday">Monday</label>
            </div>
            <div className="form-check location-filters">
              <input className="form-check-input" type="checkbox" id="Tuesday" value="Tuesday" onChange={this.handleChecked} />
              <label className="form-check-label" htmlFor="Tuesday">Tuesday</label>
            </div>
            <div className="form-check location-filters">
              <input className="form-check-input" type="checkbox" id="Wednesday" value="Wednesday" onChange={this.handleChecked} />
              <label className="form-check-label" htmlFor="Wednesday">Wednesday</label>
            </div>
            <div className="form-check location-filters">
              <input className="form-check-input" type="checkbox" id="Thursday" value="Thursday" onChange={this.handleChecked} />
              <label className="form-check-label" htmlFor="Thursday">Thursday</label>
            </div>
            <div className="form-check location-filters">
              <input className="form-check-input" type="checkbox" id="Friday" value="Friday" onChange={this.handleChecked} />
              <label className="form-check-label" htmlFor="Friday">Friday</label>
            </div>
            <div className="form-check location-filters">
              <input className="form-check-input" type="checkbox" id="Saturday" value="Saturday" onChange={this.handleChecked} />
              <label className="form-check-label" htmlFor="Saturday">Saturday</label>
            </div>


          </div>
          <button type="submit" className="btn btn-primary">Enter</button>
        </form>
        </div>
        <div className='col-12 col-md-6'>
          <div style={{ height: '50vh', width: '600px' }}>
           <GoogleMapReact
           bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
           defaultCenter={{ lat: 34.6834, lng: -82.8374 }}
           defaultZoom={12}
           yesIWantToUseGoogleMapApiInternals
           onGoogleApiLoaded={({ map, maps }) => this.addToState(map, maps)}
           >
           </GoogleMapReact>
          </div>
        </div>
      </div>
    );
   }
 };

 export default Map;
