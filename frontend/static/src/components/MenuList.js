import React, { Component } from 'react';


class MenuItem extends Component  {

  constructor(props){
    super(props);
    this.state ={
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
    const Menuitem = this.props.Menuitem.map((menuitem)=> <Menuitem  addOrder={this.props.addOrder} deleteOrder={this.props.deleteORder} subtotal={this.props.subtotal} item={menuitem}/>);
    // const proteins = this.props.proteins.map((protein)=> <MenuItem addOrder={this.props.addOrder} deleteOrder={this.props.deleteORder} subtotal={this.props.subtotal} item={protein}/>);
    // const veggies = this.props.vegggies.map((veggie)=> <MenuItem addOrder={this.props.addOrder} deleteOrder={this.props.deleteORder} subtotal={this.props.subtotal} item={veggie}/>);
    // const highcarbs = this.props.highcarbs.map((highcarb)=> <MenuItem addOrder={this.props.addOrder} deleteOrder={this.props.deleteORder} subtotal={this.props.subtotal} item={highcarb}/>);

    return(

      <div className="col">
        <div className="col-12">
        <h2 className="foodCategory">Menu</h2>
      {Menuitem}

      </div>
      </div>
    )
  }
}
export default MenuList;
