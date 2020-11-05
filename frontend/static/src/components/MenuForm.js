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
  <React.Fragment>
    <button onClick={this.props.logOut} type='button'>Log out</button>
      <div className="form mt-5" onSubmit={(event) => this.props.handlePost(event, this.state)}>
        <form className="col-12 col-md-6">
          <div className="form-group">
            <label htmlFor="Entree">Entree</label>
            <input type="text" className="form-control" id="item" name="item" value={this.state.item} onChange={this.handleChange}/>
            <label htmlFor="price">Price</label>
            <input type="text" className="form-control" id="item" name="item" value={this.state.item} onChange={this.handleChange}/>
            <label htmlFor="description">Description</label>
            <textarea rows='3' type="text" className="form-control" id="body" name="body" value={this.state.body} onChange={this.handleChange}/>
            <label htmlFor="image">Image</label>

          </div>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
  </React.Fragment>
    );
  }
}

export default MenuForm;
