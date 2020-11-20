import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Cookies from 'js-cookie';
import './Location.css';


// import GoogleMap from './GoogleMap';

class LocationForm extends Component {

  constructor(props) {
    super(props);

    this.state ={
      date: '',
      start_time: '',
      end_time: '',
      location: '',
      address: '',
      is_active: false,
      map_location:'',
    }
    this.handleChange = this.handleChange.bind(this);
    this.addDate = this.addDate.bind(this);
    this.deleteDate = this.deleteDate.bind(this);
    // this.handleImage = this.handleImage.bind(this);

  }

  async componentDidMount(){
    await this.fetchEvents()
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


  async addDate(event) {
      event.preventDefault();
      const form = {...this.state};
      const options = {
        method: 'POST',
        headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      };
      const handleError = (err) => console.warn(err);
      await fetch('/api/v1/events/form/', options).catch(handleError);

    }









  //   addDate(e){
  //   e.preventDefault();
  //
  //   const csrftoken = Cookies.get('csrftoken');
  //   let formData = new FormData();
  //   formData.append('date', this.state.day);
  //   formData.append('start_time', this.state.start_time);
  //   formData.append('end_time', this.state.end_time);
  //   formData.append('location', this.state.location);
  //   formData.append('address', this.state.address);
  //   formData.append('is_active', this.state.is_active);
  //
  //   console.log(formData);
  //   const options = {
  //      method: 'POST',
  //      headers: {
  //        'X-CSRFToken': csrftoken,
  //      },
  //      body: formData
  //   };
  //   fetch('/api/v1/events/form/', options)
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  //
  // };

  async deleteDate(item) {
    let events = [...this.state.events];
    const index = events.indexOf(item);
    events.splice(index, 1);
    this.setState({events});

    const options = {
      method: 'DELETE',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
        },
      };
      const handleError = (err) => console.warn(err);
      const response =  await fetch (`/api/v1/events/${item.id}/`, options)
      const data = await response.json().catch(handleError)
      console.log(data);
    }


    fetchEvents() {
      fetch('/api/v1/events/form/')
        .then(response => response.json())
        .then(data => this.setState({events: data}))
        .then(error=> console.log('Error', error));

    }

  render() {
    let events = this.state.events?.map(item => <AdminDate key={item.id}  deleteDate={this.deleteDate} item={item}/>);
    console.log(this.state.events);
    return (
      <React.Fragment>
        <form className="col-12" onSubmit={(e) => this.addDate(e, this.state)}>
          <div className="form group">
            <div className="row">
              <div className= "col-5">
              <br />
                <div>
                <label htmlFor="date">Date</label>
                <input type="date" className="form-control" id="date" name="date" onChange={this.handleChange}/>

                </div>
                <br />
                <div>
                <label htmlFor="start_time">Start Time</label>
                <input type="time" className="form-control" id="start_time" name="start_time"  onChange={this.handleChange}/>
                </div>
                <br />
                <div>
                <label htmlFor="end_time">End Time</label>
                <input type="time" className="form-control" id="end_time" name="end_time" onChange={this.handleChange}/>
                </div>
                <label htmlFor="location">Location</label>
                <input type="text" className="form-control" id="location" name="location" value={this.state.location} onChange={this.handleChange}/>
                <label htmlFor="address">Address</label>
                <input type="text" className="form-control" id="address" name="address" value={this.state.address} onChange={this.handleChange}/>
                <label htmlFor="is_active">Is Active</label>
                <input type="checkbox" checked={this.state.is_active} onChange={()=>this.setState(prevState =>({is_active: !prevState.is_active}))} />
                <button type="submit" className="btn btn-primary">Add Date and Locale</button>
              </div>

              <div className= "col-5">
              <br />
              {events}
              </div>
            </div>
          </div>
        </form>

    </React.Fragment>
      );

    }
  }




  class AdminDate extends Component  {

    constructor(props){
      super(props);
      this.state = {
      }
    }
    render(){
      return (
        <div className="col-12">
        <ul className="address-list">
          <div className="row ">
            <h5 className="col-5">{this.props.item.day}</h5>
            <h5 className="col-7">{this.props.item.location} </h5>
          </div>
          <button type="button" className="btn btn-sm btn-light" onClick={()=>this.props.deleteDate(this.props.item)}>Delete</button>
          <hr/>
        </ul>
      </div>


      );
    }

  }

  export default LocationForm;
