// import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
// import Cookies from 'js-cookie';
//
//
// class AddonForm extends Component {
//
//   constructor(props) {
//     super(props);
//
//     this.state ={
//       item: '',
//       price: '',
//       category: [],
//       addOns: [],
//       addOn: {},
//       is_active: false,
//     }
//
//     this.handleChange = this.handleChange.bind(this);
//     this.addAddOn = this.addAddOn.bind(this);
//     this.deleteAddOn = this.deleteAddOn.bind(this);
//     this.fetchAddOns = this.fetchAddOns.bind(this)
//   }
//
//   async componentDidMount(){
//     await this.fetchAddOns()
//   }
//
//   handleChange (event){
//     this.setState({[event.target.name]:event.target.value})
//   }
//
//   async addAddOn(event){
//   event.preventDefault();
//   const form = {...this.state};
//   const options = {
//     method: 'POST',
//     headers: {
//     'X-CSRFToken': Cookies.get('csrftoken'),
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(form),
//   };
//   const handleError = (err) => console.warn(err);
//   await fetch('/api/v1/menuitems/addons/', options).catch(handleError);
//
//   }
//
//   async deleteAddOn(item) {
//   console.log(item)
//     const options = {
//       method: 'DELETE',
//       headers: {
//         'X-CSRFToken': Cookies.get('csrftoken'),
//         },
//       };
//       const handleError = (err) => console.warn(err);
//       const response =  await fetch (`/api/v1/menuitems/addons/${item.id}`, options)
//       const data = await response.json().catch(handleError)
//       console.log(data);
//     }
//
//
//   fetchAddOns() {
//     fetch('/api/v1/menuitems/addons/')
//       .then(response => response.json())
//       .then(data => this.setState({menuItems: data}))
//       .then(error=> console.log('Error', error));
//
// }
//   render(){
//     let addOns = this.state.addOns?.map(item => <AdminAddOn key={item.id}  deleteItem={this.deleteItem} item={item}/>);
//      console.log(this.state.addOns);
//        return(
//           <React.Fragment>
//             <form className="col-12 form" onSubmit={(e) => this.addItem(e, this.state)}>
//               <div className="form group" >
//                 <div className="row">
//                   <div className= "col-5">
//                   <br />
//                   <label htmlFor="item">Item</label>
//                   <input type="text" className="form-control" id="item" name="item" value={this.state.item} onChange={this.handleChange}/>
//                   <label htmlFor="price">Price</label>
//                   <input type="text" className="form-control" id="price" name="price" value={this.state.price} onChange={this.handleChange}/>
//                   <label htmlFor="category">Category</label>
//                   <input type="text" className="form-control" id="category" name="category" value={this.state.category} onChange={this.handleChange}/>
//                   <label htmlFor="is_active">Is Active</label>
//                   <input type="checkbox" checked={this.state.is_active} onChange={()=>this.setState(prevState =>({is_active: !prevState.is_active}))} />
//                   <button type="submit" className="btn btn-primary">Add Item</button>
//                 </div>
//                 <div className="col-5">
//                   <br />
//                   {addOns}
//                 </div>
//               </div>
//             </div>
//           </form>
//       </React.Fragment>
//       );
//     }
//   }
//
//   class AdminAddOn extends Component  {
//
//   constructor(props){
//     super(props);
//     this.state = {
//
//     }
// }
//   render(){
//     return (
//     <form className="col-12">
//       <ul className="menu-list">
//           <h5 className="col">{this.props.item.item}</h5>
//           <h5 className="col">${this.props.item.price} </h5>
//         <button type="button" className="btn btn-sm btn-light" onClick={()=>this.props.deleteItem(this.props.item)}>Delete</button>
//         <hr/>
//       </ul>
//     </form>
//
//
//     );
//     }
//
//   }
//
//   export default AddonForm;
