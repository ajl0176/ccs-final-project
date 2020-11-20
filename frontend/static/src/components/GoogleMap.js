import React, { Component } from 'react';

import GoogleMapReact from 'google-map-react';
import './map.css';
import styled from 'styled-components';
import CalendarList from './CalendarList';
import AutoComplete from './Autocomplete';



const Wrapper = styled.main`
  width: 100%;
  height: 50vh;
`;

class GoogleMap extends Component {


  state = {
    events: [],
    mapApiLoaded: false,
    mapInstance: null,
    mapApi: null,
    geoCoder: null,
    places: [],
    center: [],
    zoom: 9,
    address: '',
    draggable: true,
    lat: null,
    lng: null,
    selectedLocation: null,
    selectedLocations: [],
    markers: [],
    };

    componentWillMount() {
      this.setCurrentLocation();
    }

    selectLocation = (selectedLocation) => {
      console.log('select location', selectedLocation);


      const markers = [...this.state.markers];
      for(let i = 0; i <markers.length; i ++){
        markers[i].setMap(null);
      }




      const selectedLocations = [...this.state.selectedLocations];
      const selected = selectedLocations.includes(selectedLocation);

      if(selected) {
        const index = selectedLocations.indexOf(selectedLocation);
        selectedLocations.splice(index, 1);
      } else {
        selectedLocations.push(selectedLocation)
      }

      this.setState({selectedLocation, selectedLocations, markers: []}, this.addMarkers)

    }


    onMarkerInteraction = (childKey, childProps, mouse) => {
      this.setState({
        draggable: false,
        lat: mouse.lat,
        lng: mouse.lng
      });
    }
    onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
      this.setState({ draggable: true });
      this._generateAddress();
    }

    _onChange = ({ center, zoom }) => {
      this.setState({
        center: center,
        zoom: zoom,
      });
    }

    _onClick = (value) => {
      this.setState({
        lat: value.lat,
        lng: value.lng
      });
    }

    apiHasLoaded = (map, maps) => {
      this.setState({
        mapApiLoaded: true,
        mapInstance: map,
        mapApi: maps,
      });

      this._generateAddress();
    };

    addPlace = (place) => {
      // console.log('place', place)
      this.setState({
        places: [place],
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
      this._generateAddress()
    };

    _generateAddress() {
      const {
        mapApi
        } = this.state;

      const geocoder = new mapApi.Geocoder;

      geocoder.geocode({ 'location': { lat: this.state.lat, lng: this.state.lng } }, (results, status) => {
        console.log(results);
        console.log(status);
          if (status === 'OK') {
          if (results[0]) {
            this.zoom = 12;
            this.setState({ address: results[0].formatted_address });
          } else {
            window.alert('No results found');
          }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }

        });
    }

    // Get Current Location Coordinates
    setCurrentLocation() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.setState({
            center: [position.coords.latitude, position.coords.longitude],
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        });
      }
    }

    // fetchEvents = async(map, maps) => {
    //   fetch('/api/v1/events/')
    //   .then(response => response.json())
    //   .then(data => this.setState({events:data}))
    //   .then(error => console.log('Error', error));
    // }

    addToState = async (map, maps) => {
      const response = await fetch('/api/v1/events/');
      const data = await response.json();
      await this.setState({events:data});
      await this.setState({map: map});
      await this.setState({maps: maps});
      this.addMarkers()
    }

  addMarkers = () => {
    console.log('firing add markers');
    if(this.state.selectedLocations.length) {
      this.state.selectedLocations.forEach(event => this.renderMarkers(event))
    } else {
        this.state.events.forEach(event => this.renderMarkers(event))
    }

  }


   renderMarkers = async (location) => {
     const address = location.location.replace(/\s/g, '+')
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${'AIzaSyDDemUDBcejm-EJL2t4Edrfghghjh5zhq4'}`);
      const data = await response.json()
      const results = data.results[0].geometry;
      console.log('geocode', results);



     console.log(location)
        const map = this.state.map;
        const maps = this.state.maps;
        // const intLat = parseFloat('34.840191');
        // const intLng = parseFloat('-82.398323');
        console.log(data.results[0].geometry.location.lat)
        const intLat = data.results[0].geometry.location.lat;
        const intLng = data.results[0].geometry.location.lng;
        var infoWindow = new maps.InfoWindow({
           content: `<h5>${location.location}</h5><p>hours: ${location.start_time} ${location.end_time}</p><a href="https://www.google.com/maps/place/${location.address}">${location.address}</a>`
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

    }

    render() {
      const {
         mapApiLoaded, mapInstance, mapApi,
      } = this.state;

      return (
        <Wrapper>

        <div className="row">
          <div className="col-6">
            <CalendarList events={this.state.events} selectLocation={this.selectLocation} />
          </div>
          <div className="col-5 map">
          {mapApiLoaded && (
            <div>
              <AutoComplete map={mapInstance} mapApi={mapApi} addplace={this.addPlace} selectedLocation={this.state.selectedLocation}/>
            </div>
          )}
          <div style={{ height: '500px', width: '620px' }}>
            <GoogleMapReact
              center={{lat:34.6834, lng:-82.8374}}
              zoom={this.state.zoom}
              draggable={this.state.draggable}
              onChange={this._onChange}
              onChildMouseDown={this.onMarkerInteraction}
              onChildMouseUp={this.onMarkerInteractionMouseUp}
              onChildMouseMove={this.onMarkerInteraction}
              onChildClick={() => console.log('child click')}
              onClick={this._onClick}
              bootstrapURLKeys={{
                key: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
                libraries: ['places', 'geometry'],
              }}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => this.addToState(map, maps)}
              >
            </GoogleMapReact>
            </div>
            </div>
          </div>




            </Wrapper>
        );
    }
}

export default GoogleMap;
