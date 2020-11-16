import React, { Component } from 'react';
import Cookies from 'js-cookie';


class MenuForm extends Component {

  constructor(props) {
    super(props);

    this.state ={
      entree: '',
      price: '',
      description: '',
      image: null,
      is_active: false,

    }
    this.handleChange = this.handleChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.handleImage = this.handleImage.bind(this);
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

render(){
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
      <button type="submit" className="btn btn-primary">Add Item</button>
    </form>
  </React.Fragment>
    );
  }
}

export default MenuForm;
