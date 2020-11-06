 import React, { Component } from 'react';

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
            <div className="list-group-item list-group-item-action">
              <div className="row ">
                <h5 className="col-10 ">{this.props.item.entree}</h5>
                <h5 className="col-2">${this.props.item.price}</h5>
              </div>
                <p className="col-md-auto mb-1"> {this.props.item.description}</p>
                <button type="button" className="btn btn-success" onClick={()=>this.props.addOrder(this.props.item)}>Add to Order</button>
            </div>
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
        <div className="col-12">
        <h2 className="foodCategory">Menu</h2>
      {menuitems}
      </div>
      </div>
    )
  }
}
export default MenuList;
