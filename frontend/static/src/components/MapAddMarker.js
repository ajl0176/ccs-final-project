import React from 'react';
import Cookies from 'js-cookie';
import {Modal} from 'react-bootstrap';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';


class MapAddMarker extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      address: '',
      days: [],
      lat: '',
      lng: '',
      show: false,

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.addLocation = this.addLocation.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

    }

    handleClose(){
      this.setState({show: false})
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value})
    }

    handleAddress (address) {
      this.setState({ address });
    };

    async handleSelect (address) {
      await geocodeByAddress(address)
      const results = await geocodeByAddress(address)
      const  latLng = await getLatLng(results[0])
      this.setState({lat: latLng.lat, lng: latLng.lng, address})
    };

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


    async addLocation(event){
      event.preventDefault();
      let lat = this.state.lat.toString();
      let lng = this.state.lng.toString();

      const options = {
        method:'POST',
        headers:{
          'X-CSRFToken': Cookies.get('csrftoken'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          address: this.state.address,
          lat: lat,
          lng: lng,

          }),
        };
      const handleError = (err) => console.warn(err);
      const response = await fetch(`api/v1/locations/`, options)
      const data = await response.json().catch(handleError)
      await console.log(data);
      }


    render(){
      return(
        <React.Fragment>
          <button onClick={() => this.setState({ show: true})}>add location</button>
            <Modal dialogClassName='location-form-modal' show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>Add a Location</Modal.Header>
            <Modal.Body>

            <form className="col-12 mb-5 form location-form" onSubmit={(event)=> this.addLocation(event)}>
              <div className="form-group">
                // <label htmlFor="address">Address</label>
                // <input type="text" className="form-control" id="address" name="address" value={this.state.address} onChange={this.handleChange}/>
                <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleAddress}
                onSelect={this.handleSelect}
                >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                  <div>
                    <label htmlFor="address">Address</label>
                    <input
                    {...getInputProps({
                      placeholder: 'Search Places ...',
                      className: 'form-control',
                      id: 'address'
                    })}
                  />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                          <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                          >
                          <span>{suggestion.description}</span>
                        </div>
                        );
                      })}
                  </div>
                </div>
                )}
              </PlacesAutocomplete>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="Sunday" value="Sunday" onChange={this.handleChecked}/>
            <label className="form-check-label" htmlFor="Sunday">Sunday</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="Monday" value="Monday" onChange={this.handleChecked}/>
            <label className="form-check-label" htmlFor="Monday">Monday</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="Tuesday" value="Tuesday" onChange={this.handleChecked}/>
            <label className="form-check-label" htmlFor="Tuesday">Tuesday</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="Wednesday" value="Wednesday" onChange={this.handleChecked}/>
            <label className="form-check-label" htmlFor="Wednesday">Wednesday</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="Thursday" value="Thursday" onChange={this.handleChecked}/>
            <label className="form-check-label" htmlFor="Thursday">Thursday</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="Friday" value="Friday" onChange={this.handleChecked}/>
            <label className="form-check-label" htmlFor="Friday">Friday</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="Saturday" value="Saturday" onChange={this.handleChecked}/>
            <label className="form-check-label" htmlFor="Saturday">Saturday</label>
          </div>
        </div>
      <button type="submit" className="btn btn-primary" onClick={() => this.setState({show: false})}>Save</button>
      </form>
    </Modal.Body>
    </Modal>
  </React.Fragment>
    )
  }
}

export default MapAddMarker;
