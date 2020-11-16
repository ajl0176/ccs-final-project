import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import MenuForm from './MenuForm';
import MapAutoComplete from './MapAutoComplete';
import MapAddMarker from './MapAddMarker';

//import Cropping from './Cropping'


class CalendarForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      page: 'Locations'
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(display) {
    this.setState({page: display});
}

  render(){
    let page = this.state.page;
    let display;
    if(page === 'Menu'){
      display = <React.Fragment><MenuForm/></React.Fragment>;
    }else if(page === 'Locations'){
      display = <React.Fragment>><MapAutoComplete/></React.Fragment>;

    }
    return(
      <div className=''>
        <div id="pages" className="row pages-row">
          <section className='col-4 col-lg-2'>
            <div><button className=" btn" onClick={() => this.handleClick('MapAutoComplete')}>Auto Complete</button></div>
          </section>
          <section className='col-7 col-lg-10'>
            {display}
          </section>
        </div>
      </div>
    )
  }
}

export default CalendarForm;















// import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';
// import Cookies from 'js-cookie';
// import Map from './Map';
//
//
// class CalendarForm extends Component {
//
//   constructor(props) {
//     super(props);
//
//     }
//
//
//   handleChange (event){
//     this.setState({[event.target.name]:event.target.value})
//   }
//
//   handleImage = (e) => {
//     let file = e.target.files[0];
//
//     this.setState({
//       image: file
//     });
//     let reader = new FileReader();
//     reader.onloadend = () => {
//       this.setState({
//         preview: reader.result
//       });
//     }
//     reader.readAsDataURL(file);
//   }
//
//     addDate(e){
//     e.preventDefault();
//
//     const csrftoken = Cookies.get('csrftoken');
//
//     // you have to use form data with images
//     let formData = new FormData();
//     // let keys = Object.keys(this.state);
//     formData.append('day', this.state.day);
//     formData.append('location', this.state.location);
//     formData.append('is_active', this.state.is_active);
//     console.log(formData);
//     const options = {
//        method: 'POST',
//        headers: {
//          'X-CSRFToken': csrftoken,
//        },
//        body: formData
//     };
//     fetch('/api/v1/events/form/', options)
//     .then(response => response.json())
//     .then(data => console.log(data))
//
//   };
//
//   render() {
//     return (
//       <React.Fragment>
//         <form className="col-12 col-md-6 form" onSubmit={(e) => this.addDate(e, this.state)}>
//           <div className="form group" >
//             <label htmlFor="day">Day</label>
//             <input type="text" className="form-control"  id="day" name="day" value={this.state.day} onChange={this.handleChange}/>
//             <label htmlFor="location">Location</label>
//             <input type="text" className="form-control" id="location" name="location" value={this.state.location} onChange={this.handleChange}/>
//             <label htmlFor="is_active">Is Active</label>
//             <input type="checkbox" checked={this.state.is_active} onChange={()=>this.setState(prevState =>({is_active: !prevState.is_active}))} />
//           </div>
//         <button type="submit" className="btn btn-primary">Add Day</button>
//       </form>
//
//       <div className="row locations-list-row">
//         <div id="locations-list" className="col-12 col-md-3 card">
//         <form className="col-12 mb-5 form location-form" onSubmit={(event)=> this.filterMarkers(event)}>
//           <div className="form-group">
//             <div className="form-check locations locations-filter">
//               <label className="form-check-label" htmlFor="sunday">Sunday</label>
//               <input className="form-check-input" type="checkbox" id="sunday" value="sunday" onChange={this.handleChecked}/>
//             </div>
//             <div className="form-check locations locations-filter">
//               <label className="form-check-label" htmlFor="monday">Monday</label>
//               <input className="form-check-input" type="checkbox" id="monday" value="monday" onChange={this.handleChecked}/>
//             </div>
//           </div>
//         <button type="submit" className="btn btn-primary">Save</button>
//       </form>
//     </div>
//   </div>
//       <div className="col-map col-4">
//           <div style={{ height: '50vh', width: '600px' }}>
//             <GoogleMapReact
//               bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
//               defaultCenter={this.props.center}
//               defaultZoom={this.props.zoom}
//               yesIWantToUseGoogleMapApiIntervals
//               onGoogleApiLoaded={({map, maps})=> this.addToState(map, maps)}
//             >
//           </GoogleMapReact>
//         </div>
//     </div>
//
//     </React.Fragment>
//       );
//
//     }
//   }
//
//   export default CalendarForm;
