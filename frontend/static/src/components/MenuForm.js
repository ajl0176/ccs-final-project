import React, { Component } from 'react';
// import Cookies from 'js-cookie';
//
class MenuForm extends Component {

  constructor(props) {
    super(props);

    this.state ={
      item: '',
      price: '',
      description: '',
      image: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event){
    this.setState({[event.target.name]:event.target.value})
  }

render(){
  return(
  <form className="col-12" onSubmit={(event) => this.props.handleSubmit(event, this.state)}>
    <div className="form-group">
      <label htmlFor="item">Item</label>
      <input type="text" className="form-control" id="item" name="item" value={this.state.item} onChange={this.handleChange}/>
      <label htmlFor="description">Description</label>
      <textarea rows='3' type="text" className="form-control" id="body" name="body" value={this.state.body} onChange={this.handleChange}/>
      <label htmlFor="image">Image</label>
      <input type="image" scr="img_submit.gif" alt="Submit" width="48" height="48"/>
      <label htmlFor="foodCategory">Category</label>
      <select id="foodCategory" className="form-control"  name="foodCategory" value={this.state.foodcategory} onChange={this.handleChange}>
        <option>Menu</option>
        <option>Make Your Own</option>
      </select>
    <button type="submit" className="btn btn-primary">Save</button>
    </div>
  </form>
    );
  }
}

export default MenuForm;
