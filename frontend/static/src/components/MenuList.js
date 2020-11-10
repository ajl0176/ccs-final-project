import React, { Component } from 'react';
import './Menu.css';

class FoodItem extends Component  {

  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    return (
      <main className="menu-wrapper">
        <div className="container">
          <ul className="menu-list">

              <div className="row ">
                <h5 className="col-10 ">{this.props.item.entree}</h5>
                <h5 className="col-2">${this.props.item.price}</h5>
              </div>
                <p className="col-md-auto mb-1"> {this.props.item.description}</p>
                <img src={this.props.item.image}/>
                <button type="button" className="btn btn-sm btn-light" onClick={()=>this.props.addOrder(this.props.item)}>Add to Order</button>
          <hr/>
          </ul>
        </div>
    </main>

    );
  }
}

class MenuList extends Component {

  render() {
    const menuitems = this.props.menuItems.map((item)=> <FoodItem  addOrder={this.props.addOrder} deleteOrder={this.props.deleteOrder} subtotal={this.props.subtotal} item={item}/>);

    return(

      <div className="col">
        <h2 className="foodCategory">Menu</h2>
      {menuitems}
      </div>
    )
  }
}
export default MenuList;
