import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapAddMarker from './MapAddMarker';
import Cookies from 'js-cookie';
import Map from './Map';


class LocationForm extends Component {

  constructor(props) {
    super(props);

    this.state ={
      day: '',
      location: '',
      is_active: false,
      map_location:'',
    }
    this.handleChange = this.handleChange.bind(this);
    this.addDate = this.addDate.bind(this);
    // this.handleImage = this.handleImage.bind(this);

  }

  handleChange (event){
    this.setState({[event.target.name]:event.target.value})
  }

  handleImage = (e) => {
    let file = e.target.files[0];

    this.setState({
      image: file
    });
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        preview: reader.result
      });
    }
    reader.readAsDataURL(file);
  }

    addDate(e){
    e.preventDefault();

    const csrftoken = Cookies.get('csrftoken');

    // you have to use form data with images
    let formData = new FormData();
    // let keys = Object.keys(this.state);
    formData.append('day', this.state.day);
    formData.append('location', this.state.location);
    formData.append('is_active', this.state.is_active);

    console.log(formData);
    const options = {
       method: 'POST',
       headers: {
         'X-CSRFToken': csrftoken,
       },
       body: formData
    };
    fetch('/api/v1/events/form/', options)
    .then(response => response.json())
    .then(data => console.log(data))

  };

  changeLocation(e){
    e.preventDefault();

    const csrftoken = Cookies.get('csrftoken');

    let formData = new FormData();
    formData.append('map_location', this.state.map_location);

    console.log(formData);
    const options = {
       method: 'POST',
       headers: {
         'X-CSRFToken': csrftoken,
       },
       body: formData
    };
    fetch('/api/v1/events/locations/', options)
    .then(response => response.json())
    .then(data => console.log(data))
  }


  render() {
    return (
      <React.Fragment>
        <form className="col-12 col-md-6 form" onSubmit={(e) => this.addDate(e, this.state)}>
          <div className="form group" >
            <label htmlFor="day">Day</label>
            <input type="text" className="form-control"  id="day" name="day" value={this.state.day} onChange={this.handleChange}/>
            <label htmlFor="location">Location</label>
            <input type="text" className="form-control" id="location" name="location" value={this.state.location} onChange={this.handleChange}/>
            <label htmlFor="is_active">Is Active</label>
            <input type="checkbox" checked={this.state.is_active} onChange={()=>this.setState(prevState =>({is_active: !prevState.is_active}))} />
          </div>
        <button type="submit" className="btn btn-primary">Add Day</button>
          <div>
          </div>

      <div className="row mb-2" onSubmit={(e)=> this.changeLocation(e, this.state)}>
        <div class="col">
          <label htmlFor="maploction">Map Location</label>
          <input className="form-control" id="search" type="text" placeholder="Search..." value={this.state.map_location} onChange={this.handleChange}/>
        </div>
      <button type="submit" className= "btn btn-primary">Change Location</button>
      </div>
      </form>

    </React.Fragment>
      );

    }
  }

  export default LocationForm;
