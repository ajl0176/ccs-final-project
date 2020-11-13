import React, {Component} from 'react';
import Cookies from 'js-cookie';



class Home extends Component {
constructor(props) {
  super(props);
  this.state={
    image: null,
    }

    this.addItem = this.addItem.bind(this);
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
    formData.append('image', this.state.image);
    console.log(formData);
    const options = {
       method: 'POST',
       headers: {
         'X-CSRFToken': csrftoken,
       },
       body: formData

     }
   }
  render() {
    return(
      <section>
        <div className="col">
        <h1>Welcome to OOTG</h1>
        </div>
      </section>

    );
  }
}

export default Home;
