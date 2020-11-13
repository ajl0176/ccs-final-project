import React, { Component } from 'react';
import Cookies from 'js-cookie';
import MenuList from './MenuList';


class EditMenu extends Component {

  constructor(props) {
    super(props);

    this.state ={
      menuItems: [],
      addOns: [],

    }

    // this.fetchMenuItems = this.fetchMenuItems.bind(this);
    // this.fetchAddOns = this.fetchAddOns.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event){
    this.setState({[event.target.name]:event.target.value})
}

fetchMenuItems() {
  fetch('/api/v1/menuitems/')
    .then(response => response.json())
    .then(data => this.setState({menuItems: data}))
    .then(error=> console.log('Error', error));

}

fetchAddOns() {
  fetch('/api/v1/menuitems/addons/')
    .then(response => response.json())
    .then(data => this.setState({addOns: data}))
    .then(error=> console.log('Error', error));
}

async deleteItem(e) {
  // e.preventDefault();

  const options = {
    method: 'DELETE',
    headers: {
      'X-CSRFToken': Cookies.get('csrftoken'),
      },
    };
    const handleError = (err) => console.warn(err);
    const response =  await fetch (`/api/v1/menuitems/${this.state.menuitems}`, options)
    const data = await response.json().catch(handleError)
    console.log(data);
  }

  componentDidMount() {
    this.fetchMenuItems();
    this.fetchAddOns();
    this.deleteItem();
  }

  render(){
    return (
      <React.Fragment>

        <div className="row">
          <div className="col-7">
            <MenuList menuItems={this.state.menuItems} addOns={this.state.addOns}/>
            <button type="button" className="btn btn-primary mt-2" onClick={(e) => this.deleteItem(e)}>Delete</button>
          </div>
        </div>

      </React.Fragment>
    );
  }
  }

export default EditMenu;

























// import React, { Component} from 'react';
// import Cookies from 'js-cookie';
// import {Modal} from 'react-bootstrap';
// import MenuForm from './MenuForm'
//
//
// function EditItem(props) {
//   return(
//
//     <div className='list-group col-lg-3 col-12' onClick{()=> props.chooseItem(props.menuitem.id)}>
//      <div className= 'list-group-item menu-preview'>
//       <img src={props.menuitem.image} alt=""/>
//      </div>
//      <p className='menuitem-name'>{props.menuitem.entree}</p>
//     </div>
//   )
// }
//
// class EditMenu extends Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       entree: '',
//       price: '',
//       description: '',
//       menuitems:[],
//       pickedItem:{},
//       image: null,
//       is_active: false,
//
//     }
//     this.handleChange = this.handleChange.bind(this);
//     this.addItem = this.addItem.bind(this);
//     this.handleImage = this.handleImage.bind(this);
//     this.deleteItem = this.deleteItem.bind(this);
//   }
//
//   async componentDidMount(){
//     const response = await fetch('api/v1/menuitems/');
//     const data = await response.json();
//     this.setState({menuitems:data});
//     console.log(data);
//   }
//
//   chooseItem(display) {
//     const menuitemId = this.state.menuitems.findIndex(menuitem => menuitem.id === display)
//     this.setState({pickedItem: this.state.menuitems[menuitemId]})
//     this.setState({is_active: true});
//   }
//
//   handleChange(event){
//     const pickedItem = {...this.state.pickedItem};
//     pickedItem[event.target.name] = event.target.value;
//     this.setState({pickedItem});
//   }
//
//   handleImage = (e) => {
//     // The selected files' are returned by the element's HTMLInputElement.files property — this returns a FileList object, which contains a list of File objects
//     let file = e.target.files[0];
//     // we'll use this value when we save the image (see _saveImage)
//     this.setState({
//       image: file
//     });
//     // The FileReader object lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or Blob objects to specify the file or data to read.
//     let reader = new FileReader();
//     // A handler for the loadend event. This event is triggered each time the reading operation is completed (either in success or failure).
//     reader.onloadend = () => {
//       this.setState({
//         preview: reader.result
//       });
//     }
//     // Starts reading the contents of the specified Blob, once finished, the result attribute contains a data: URL representing the file's data.
//     reader.readAsDataURL(file);
// }
//
//     addItem(e){
//     e.preventDefault();
//
//     const csrftoken = Cookies.get('csrftoken');
//
//     // you have to use form data with images
//     let formData = new FormData();
//     let keys = Object.keys(this.state);
//     formData.append('entree', this.state.entree);
//     formData.append('price', this.state.price);
//     formData.append('description', this.state.description);
//     formData.append('image', this.state.image);
//     formData.append('is_active', this.state.is_active);
//     console.log(formData);
//     const options = {
//        method: 'POST',
//        headers: {
//          'X-CSRFToken': csrftoken,
//        },
//        body: formData
//     };
//     fetch('/api/v1/menuitems/form/', options)
//     .then(response => response.json())
//     .then(data => console.log(data))
//
// };
//
// async deleteItem(e){
//   e.preventDefault();
//   const options = {
//     method: 'DELETE',
//     headers: {
//       'X-CSRFToken': Cookies.get('csrftoken'),
//     },
//   };
//
//   const handleError = (err) => console.warn(err);
//   const responce = await fetch(`/api/v1/menuitems/${this.state.pickedItem.id}/`, options);
//   const data = await responce.json().catch(handleError);
//   console.log(data);
//
//     this.setState({is_active: false});
//   }
//
// render(){
//   const menuitems = this.state.menuitems.map(menuitem => <EditItem key={menuitem.id} menuitem={menuitem})
// }
//
//   }
// }
//
