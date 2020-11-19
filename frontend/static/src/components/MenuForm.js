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

 async updateItem(item){

   const id = this.props.match.params.id;
   await fetch (`/api/v1/menuitems/form/${item.id}`, {
     method: 'PUT',
     headers: {
       'X-CSRFToken': Cookies.get('csrftoken'),
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({entree: this.state.entree, price: this.state.price, description: this.state.description}),
   });
   this.props.history.push('/menuitems');

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

handleClose() {
  this.setState({ show: false})
}


render(){
  let menuitems = this.state.menuItems?.map(item => <AdminItem key={item.id}  deleteItem={this.deleteItem} item={item}/>);
  console.log(this.state.menuItems);
  return(
  <React.Fragment>
    <form className="col-12 form" onSubmit={(e) => this.addItem(e, this.state)}>
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
            <label htmlFor="image">Image</label>
            <input type="file" id="image" name="image"  onChange={this.handleImage}/>
            <img src={this.state.preview} alt=''/>
            <label htmlFor="is_active">Is Active</label>
            <input type="checkbox" checked={this.state.is_active} onChange={()=>this.setState(prevState =>({is_active: !prevState.is_active}))} />
            <button type="button" className="btn btn-primary" onClick={()=>this.props.updateItem(this.props.item)}>Save Changes</button>
            <button type="submit" className="btn btn-primary">Add Item</button>
            <br />
            <br />
            <div className="form-check">
              <input class="form-check-input" type="radio" name="categories" id="proteins" value="option1" checked/>
              <label class="form-check-label" htmlfor="proteins">
                Proteins
              </label>
            </div>
            <div className="form-check">
              <input class="form-check-input" type="radio" name="categories" id="veggies" value="option2"/>
              <label htmlfor="veggies" class="form-check-label">
                Veggies
              </label>
            </div>
            <div className="form-check">
              <input class="form-check-input" type="radio" name="categories" id="highcarbs" value="option3"/>
              <label htmlfor="highcarbs" class="form-check-label">
                High Carbs
              </label>
            </div>
            <div>
              <label htmlfor="addon">Addon</label>
              <input type="text" className="form-control" id="addon" name="addon" value={this.state.addon} onChange={this.handleChange}/>
              <label htmlFor="price">Price</label>
              <input type="text" className="form-control" id="price" name="price" value={this.state.price} onChange={this.handleChange}/>
              <label htmlFor="is_active">Is Active</label>
              <input type="checkbox" checked={this.state.is_active} onChange={()=>this.setState(prevState =>({is_active: !prevState.is_active}))} />
              <div>
                <button type="submit" className="btn btn-primary">Add Item</button>
              </div>
          </div>
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
    }
  }

  render(){
    return (
    <form className="col-12">
      <ul className="menu-list">
          <h5 className="col">{this.props.item.entree}</h5>
          <h5 className="col">${this.props.item.price} </h5>
        <p className="col">{this.props.item.description}</p>
        <button type="button" className="btn btn-sm btn-light" onClick={()=>this.props.deleteItem(this.props.item)}>Delete</button>
        <hr/>
      </ul>
    </form>


    );
  }

}

export default MenuForm;
