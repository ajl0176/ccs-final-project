import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Cookies from 'js-cookie';


class MenuForm extends Component {

  constructor(props) {
    super(props);

    this.state ={
      entree: '',
      price: '',
      menuItems: [],
      menuItem: {},
      description: '',
      image: null,
      is_active: false,
      isEditing: false,

    }
    this.handleChange = this.handleChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.fetchMenuItems = this.fetchMenuItems.bind(this);

  }
  async componentDidMount(){
    await this.fetchMenuItems()
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

    addItem(e){
    e.preventDefault();

    const csrftoken = Cookies.get('csrftoken');

    let formData = new FormData();
    formData.append('entree', this.state.entree);
    formData.append('price', this.state.price);
    formData.append('description', this.state.description);
    formData.append('image', this.state.image);
    formData.append('is_active', this.state.is_active);
    console.log(formData);
    const options = {
       method: 'POST',
       headers: {
         'X-CSRFToken': csrftoken,
       },
       body: formData
    };
    fetch('/api/v1/menuitems/form/', options)
    .then(response => response.json())
    .then(data => console.log(data))

}

async addAddOn(event){
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
await fetch('/api/v1/menuitems/form/', options).catch(handleError);

}

 async updateItem(item, newItem){

   console.log('id', item.id);
   const id = this.props.match.params.id;
   // const csrftoken = Cookies.get('csrftoken');

   const menuItems = [...this.state.menuItems];
   const index = menuItems.indexOf(item);
   console.log('index', index);
   menuItems[index] = newItem;
   this.setState({menuItems});
   const formData = new FormData();
   formData.append('entree', newItem.entree);
   formData.append('price', newItem.price);
   formData.append('description', newItem.description);
   if(this.state.image){
     formData.append('image', this.state.image);
   }
  await fetch(`/api/v1/menuitems/form/${item.id}/`, {
    method: 'PATCH',
    headers: {
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
    body:formData
  });
   // this.props.history.push('/menuitems');

}

async deleteItem(item) {
console.log(item)
  const options = {
    method: 'DELETE',
    headers: {
      'X-CSRFToken': Cookies.get('csrftoken'),
      },
    };
    const handleError = (err) => console.warn(err);
    const response =  await fetch (`/api/v1/menuitems/form/${item.id}`, options)
    const data = await response.json().catch(handleError)
    console.log(data);
  }


  fetchMenuItems() {
    fetch('/api/v1/menuitems/form/')
      .then(response => response.json())
      .then(data => this.setState({menuItems: data}))
      .then(error=> console.log('Error', error));

  }


render(){
  let menuitems = this.state.menuItems?.map(item => <AdminItem key={item.id}  updateItem={this.updateItem} deleteItem={this.deleteItem} item={item}/>);
  console.log(this.state.menuItems);
  return(
  <React.Fragment>
    <form className="col-12 form mb=6" onSubmit={(e) => this.addItem(e, this.state)}>
      <div className="form group" >
        <div className="row">
          <div className= "col-5">
          <br />
            <label htmlFor="entree">Entree</label>
            <input type="text" className="form-control" id="entree" name="entree" value={this.state.entree} onChange={this.handleChange}/>
            <label htmlFor="price">Price</label>
            <input type="text" className="form-control" id="price" name="price" value={this.state.price} onChange={this.handleChange}/>
            <label htmlFor="description">Description</label>
            <textarea rows='3' type="text" className="form-control" id="description" name="description" value={this.state.description} onChange={this.handleChange}/>
            <br/>
            <label htmlFor="image">Image</label>
            <input type="file" id="image" name="image"  onChange={this.handleImage}/>
            <img src={this.state.preview} alt=''/>
            <br/>
            <br/>
            <label htmlFor="is_active">Is Active</label>
            <input type="checkbox" checked={this.state.is_active} onChange={()=>this.setState(prevState =>({is_active: !prevState.is_active}))} />
            <br/>
            <br />
            <button type="submit" className="btn btn-primary">Add Item</button>
            <br />
            <br />
          </div>
        <div className="col-5">
        <br />
          {menuitems}
        </div>
      </div>
    </div>
  </form>

  </React.Fragment>
    );
  }
}

class AdminItem extends Component  {

  constructor(props){
    super(props);
    this.state = {
      isEditing: false,
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }


  componentDidMount() {
    this.setState({...this.props.item})
  }

  handleInput(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleUpdate() {
    this.setState({isEditing: false})
    this.props.updateItem(this.props.item, this.state);
  }

  render(){
    return (
    <form className="col-12">
      <ul className="menu-list">

          {this.state.isEditing
          ?
          <React.Fragment>
            <input type="text" name="entree" value={this.state.entree} onChange={this.handleInput}/>
            <br />
            <br />
            <input type="text" name="price" value={this.state.price} onChange={this.handleInput}/>
            <br />
            <br />
            <input type="textarea" name="description" value={this.state.description} onChange={this.handleInput}/>
          </React.Fragment>
          :
          <React.Fragment>
            <h5 className="col">{this.props.item.entree}</h5>
            <h5 className="col">${this.props.item.price} </h5>
            <p className="col">{this.props.item.description}</p>
          </React.Fragment>
          }
          <br />
        {this.state.isEditing
        ?
        <button type="button" className="btn btn-sm btn-light" onClick={this.handleUpdate}>Save</button>
        :
        <button type="button" className="btn btn-sm btn-light" onClick={()=>this.setState({isEditing: true})}>Edit</button>
        }

        <button type="button" className="btn btn-sm btn-light" onClick={()=>this.props.deleteItem(this.props.item)}>Delete</button>
        <hr/>
      </ul>
    </form>


    );
  }

}

export default MenuForm;
