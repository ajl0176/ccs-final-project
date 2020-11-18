import React, { Component } from 'react';
import Cookies from 'js-cookie';


class MenuForm extends Component {

  constructor(props) {
    super(props);

    this.state ={
      entree: '',
      price: '',
      menuItems: [],
      description: '',
      image: null,
      is_active: false,

    }
    this.handleChange = this.handleChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.editItem = this.editItem.bind(this);
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
    // The selected files' are returned by the element's HTMLInputElement.files property — this returns a FileList object, which contains a list of File objects
    let file = e.target.files[0];
    // we'll use this value when we save the image (see _saveImage)
    this.setState({
      image: file
    });
    // The FileReader object lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or Blob objects to specify the file or data to read.
    let reader = new FileReader();
    // A handler for the loadend event. This event is triggered each time the reading operation is completed (either in success or failure).
    reader.onloadend = () => {
      this.setState({
        preview: reader.result
      });
    }
    // Starts reading the contents of the specified Blob, once finished, the result attribute contains a data: URL representing the file's data.
    reader.readAsDataURL(file);
}

    addItem(e){
    e.preventDefault();

    const csrftoken = Cookies.get('csrftoken');

    // you have to use form data with images
    let formData = new FormData();
    // let keys = Object.keys(this.state);
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
  let menuitems = this.state.menuItems?.map(item => <AdminItem key={item.id}  deleteItem={this.deleteItem} item={item}/>);
  console.log(this.state.menuItems);
  return(
  <React.Fragment>
    <form className="col-12 col-md-6 form" onSubmit={(e) => this.addItem(e, this.state)}>
      <div className="form group" >
        <label htmlFor="entree">Entree</label>
        <input type="text" className="form-control" id="entree" name="entree" value={this.state.entree} onChange={this.handleChange}/>
        <label htmlFor="price">Price</label>
        <input type="text" className="form-control" id="price" name="price" value={this.state.price} onChange={this.handleChange}/>
        <label htmlFor="description">Description</label>
        <textarea rows='3' type="text" className="form-control" id="description" name="description" value={this.state.description} onChange={this.handleChange}/>
        <label htmlFor="image">Image</label>
        <input type="file" id="image" name="image"  onChange={this.handleImage}/>
        <img src={this.state.preview} alt=''/>
        <label htmlFor="is_active">Is Active</label>
        <input type="checkbox" checked={this.state.is_active} onChange={()=>this.setState(prevState =>({is_active: !prevState.is_active}))} />
      </div>
      <button type="button" className="btn btn-primary">Save Changes</button>
      <button type="submit" className="btn btn-primary">Add Item</button>
    </form>
    {menuitems}
  </React.Fragment>
    );
  }
}

class AdminItem extends Component  {

  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    return (
      <ul className="menu-list">
        <div className="row ">
          <h5 className="col-10">{this.props.item.entree}</h5>
          <h5 className="col-2">{this.props.item.price} </h5>
        </div>
        <p className="col-md-auto mb-1">{this.props.item.description}</p>
        <button type="button" className="btn btn-sm btn-light" onClick={()=>this.props.deleteItem(this.props.item)}>Delete</button>
        <hr/>
      </ul>


    );
  }

}

export default MenuForm;
