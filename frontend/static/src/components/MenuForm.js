import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Menu from ',/Menu';


class MenuForm extends Component {

  constructor(props) {
    super(props);

    this.state ={
      entree: '',
      price: '',
      description: '',
      image: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.addItem = this.addItem.bind(this);
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

  async addItem(e){
    e.preventDefault();

    const csrftoken = Cookies.get('csrftoken');

    // you have to use form data with images
    const formData = new FormData();
    const keys = Object.keys(this.state);
    keys.forEach(key => formData.append(key, this.state[key]));

    const options = {
       method: 'POST',
       headers: {
         'X-CSRFToken': csrftoken,
       },
       body: formData
    };
    const handleError = (err) => console.warn(err);
    const response = await fetch('/api/v1/menuItems/', options);
    const data = await response.json().catch(handleError);
    console.log(data);
    if (data.key){
      Cookies.set('Authorization', `Token ${data.key}`)
    }
};


render(){
  return(
  <React.Fragment>
    <form className="col-12 col-md-6 form" onSubmit={(e) => this.addItem(e)}>
      <div className="form group" >
        <label htmlFor="Entree">Entree</label>
        <input type="text" className="form-control" id="item" name="item" value={this.state.item} onChange={this.handleChange}/>
        <label htmlFor="price">Price</label>
        <input type="text" className="form-control" id="item" name="item" value={this.state.item} onChange={this.handleChange}/>
        <label htmlFor="description">Description</label>
        <textarea rows='3' type="text" className="form-control" id="body" name="body" value={this.state.body} onChange={this.handleChange}/>
        <label htmlFor="image">Add Image</label>
        <input type="file" id="image" name="image" onChange={this.handleImage}/>
        <img className="image-preview" src={this.state.preview} alt=''/>
      </div>
      <button type="submit" className="btn btn-primary">Add Item</button>
    </form>
  </React.Fragment>
    );
  }
}

export default MenuForm;
