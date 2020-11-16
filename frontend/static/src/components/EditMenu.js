// import React, { Component } from 'react';
// import {Modal} from 'react-bootstrap';
// import MenuList from './MenuList';
// import Menu from './Menu';
// import Cookies from 'js-cookie';
//
// function MyMenu(props){
//
//   return(
//     <div className='list-group'>
//       <div className='list-group-items'>
//         <div className="row ">
//           <h5 className="col-10 ">{this.props.item.entree}</h5>
//           <h5 className="col-2">${this.props.item.price}</h5>
//         </div>
//           <p className="col-md-auto mb-1"> {this.props.item.description}</p>
//         <img src={this.props.item.image} alt=""/>
//       <button type="button" className="btn btn-sm btn-light" onClick={()=>props.handleModal(props.menuItems.id)}>Edit Menu</button>
//     </div>
//   </div>
//   )
// }
//
// class EditMenu extends Component {
//
//   constructor(props){
//     super(props);
//
//     this.state ={
//       displayStatus: 'all',
//       show: false,
//       menuItemDisplay: {},
//       menuItems:[],
//       entree: '',
//       price: '',
//       description: '',
//       image: null,
//       is_active: false,
//     };
//
//     this.handleClick = this.handleClick.bind(this);
//     this.handleModal = this.handleModal.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.deleteArticle = this.deleteArticle.bind(this);
//   }
//
//   fetchMenuItems() {
//     fetch('/api/v1/menuitems/')
//       .then(response => response.json())
//       .then(data => this.setState({menuItems: data}))
//       .then(error=> console.log('Error', error));
//
//   }
//
//   fetchAddOns() {
//     fetch('/api/v1/menuitems/addons/')
//       .then(response => response.json())
//       .then(data => this.setState({addOns: data}))
//       .then(error=> console.log('Error', error));
//   }
//
//   handleClick(display){
//     this.setState({displayStatus: display});
//   }
//
//   handleModal(display){
//     const menuItemId = this.state.menuItems.findIndex(x => x.id === display)
//     this.setState ({menuItemDisplay: this.state.menuItems[menuItemId]})
//     this.setState({show: !this.state.show});
//   }
//
//   handleChange(event){
//     const menuItemDisplay = {...this.state.menuItemDisplay};
//     menuItemDisplay[event.target.name] = event.target.value;
//     this.setState({menuItemDisplay});
//   }
//
//   deleteItem(id) {
//     const csrftoken = Cookies.get('csrftoken')
//
//     const options = {
//       method: 'DELETE',
//       headers: {
//         'X-CSRFToken': csrftoken,
//         },
//       };
//
//       .then(response => response)
//       .then (data => {
//         const menuItems = [...this.state.menuItems];
//         const index = menuItems.findIndex(menuItem => menuItem.id === id)
//         menuItems.splice(index, 1);
//         this.setState({menuItems})
//       })
//       .catch(error => console.log('Error:', error))
//     }
//
//   componentDidMount() {
//     this.fetchMenuItems();
//     this.fetchAddOns();
//   }
// render(){
//   return (
//     <React.Fragment>
//       <Modal.Header>{this.state.menuItemDisplay.entree}</Modal.Header>
//         <Modal.Body>
//           <form className="form-group">
//             <label html="title">Entree</label>
//             <input type="text" className="form-control" id="title" name="title" value={this.state.menuItemDisplay.title} onChange={this.handleChange}/>
//             <label htmlFor="price">Price</label>
//             <input type="text" className="form-control" id="price" name="price" value={this.state.menuItemDisplay.price} onChange={this.handleChange}/>
//             <label htmlFor="description">Description</label>
//             <input type="text" className="form-control" id="description" name="description" value={this.state.menuItemDisplay.description} onChange={this.handleChange}/>
//           </form>
//         </Modal.Body>
//     </React.Fragment>
//
//     );
//   }
// }
// export default Menu;



































// import React, { Component } from 'react';
// import Cookies from 'js-cookie';
// import MenuList from './MenuList';
// import MenuForm from './MenuForm';
//
//
// class EditMenu extends Component {
//
//   constructor(props) {
//     super(props);
//
//     this.state ={
//       entree: '',
//       price: '',
//       description: '',
//       chosenEntree: {},
//       image: null,
//       is_active: false,
//     }
//
//     this.handleImage = this.handleImage.bind(this);
//     this.addImage = this.addImage.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.chooseItem = this.chooseItem.bind(this);
//     this.handleClose = this.handleClose.bind(this);
//     this.deleteItem = this.deleteItem.bind(this);
//   }
//
//   async componentDidMount(){
//     const response = await fetch('api/v1/menuitems/');
//     const data = await response.json();
//     this.setState({events:data});
//     console.log(data);
//   }
//
//   handleClose(){
//     this.setState({is_active: false});
//   }
//
//   chooseItem(display){
//     const menuItemId = this.state.menuItems.findIndex(menuItem => menuItem.id === display)
//     this.setState({chosenEntree: this.state.menuItems[menuItemId]})
//     this.setState({is_active: true});
//   }
//
//   handleChange (menuItem){
//     const chosenEntree = {...this.state.chosenEntree};
//     chosenEntree[menuItem.target.name] = menuItem.target.value;
//     this.setState({chosenEntree});
// }
//
// handleImage(e){
//       let file = e.target.files[0];
//       const chosenEntree = {...this.state.chosenEntree};
//       chosenEntree.image = file;
//       this.setState({chosenEntree});
//
//       let reader = new FileReader();
//
//       reader.onloadend = () => {
//         this.setState({
//           preview: reader.result
//         });
//       }
//       reader.readAsDataURL(file);
//     }
//
//     async addImage(e){
//       e.preventDefault();
//       this.handleClose();
//       let formData = new FormData();
//       formData.append('entree', this.state.entree);
//       formData.append('price', this.state.price);
//       formData.append('description', this.state.description);
//       formData.append('image', this.state.image);
//       formData.append('is_active', this.state.is_active);
//       console.log(formData);
//       const options = {
//         method: 'PUT',
//         headers: {
//           'X-CSRFToken': Cookies.get('csrftoken'),
//         },
//         body: formData
//       };
//
//       const handleError = (err) => console.warn(err);
//       const response = await fetch(`/api/v1/events/${this.state.chosenEntree.id}/`, options);
//       const data = await response.json().catch(handleError);
//       console.log('data key: ', data.key);
//       this.setState({is_active: false});
//
//     }
//
//       async deleteItem(e){
//         e.preventDefault();
//         const options = {
//           method: 'DELETE',
//           headers: {
//             'X-CSRFToken': Cookies.get('csrftoken'),
//           },
//         };
//
//       const handleError = (err) => console.warn(err);
//       const response = await fetch(`/api/v1/menuItems/${this.state.chosenEntree.id}/`, options);
//       const data = await response.json().catch(handleError);
//       console.log(data);
//
//       this.setState({is_active: false});
//
//   }
//
//   render(){
//     return(
//       <React.Fragment>
//         <div className="row">
//           <MenuForm/>
//         </div>
//       <form className="col-12 col-md-6 form" onSubmit={(e) => this.addItem(e, this.state)}>
//         <div className="form group" >
//           <label htmlFor="entree">Entree</label>
//           <input type="text" className="form-control" id="entree" name="entree" value={this.state.entree} onChange={this.handleChange}/>
//           <label htmlFor="price">Price</label>
//           <input type="text" className="form-control" id="price" name="price" value={this.state.price} onChange={this.handleChange}/>
//           <label htmlFor="description">Description</label>
//           <textarea rows='3' type="text" className="form-control" id="description" name="description" value={this.state.description} onChange={this.handleChange}/>
//           <label htmlFor="image">Image</label>
//           <input type="file" id="image" name="image"  onChange={this.handleImage}/>
//           <img src={this.state.preview} alt=''/>
//           <label htmlFor="is_active">Is Active</label>
//           <input type="checkbox" checked={this.state.is_active} onChange={()=>this.setState(prevState =>({is_active: !prevState.is_active}))} />
//         </div>
//         <button type="button" className="btn btn-primary mt-2" onClick={(e) => this.deleteEvent(e)}>Delete</button>
//       </form>
//       </React.Fragment>
//     );
//   }
//   }
//
// export default EditMenu;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
