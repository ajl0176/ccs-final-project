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
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    const menuitems = this.props.menuItems.map((item)=> <FoodItem  addOrder={this.props.addOrder} deleteOrder={this.props.deleteOrder} subtotal={this.props.subtotal} item={item}/>);

    let categories = this.props.addOns?.map((addon, index) => addon.category);
    console.log(categories);
    // The Set object lets you store unique values of any type
    // A value in the Set may only occur once
    categories = [...new Set(categories)];

    const addOns = categories.map(category => {
      // console.log('single', category)
      const items = this.props.addOns
        .filter(addOn => addOn.category === category)
        .map(addOn => (<p>{addOn.item} </p>));

      const prices = this.props.addOns
      .filter(addOn => addOn.category === category)
      .map(addOn => (<p>${addOn.price} </p>));



    // const addOns = this.props.addOns.map(item)=>
      // console.log('items', items);
      return(
        <React.Fragment>

          <div className="container">
            <div className="row">
              <div className= "col-12">
                <h2>{category}</h2>
                <div className="row">
                <p className="col-10 ">{items}</p>
                <p clasName="col-2">{prices}</p>

                </div>
                </div>
              </div>
            </div>

        </React.Fragment>
      )}

    );

    return(
      <React.Fragment>
        <div className="col">
          <h2 className="foodCategory">Menu</h2>
          {menuitems}
       </div>
       <h2 className="foodCategory">Make Your Own!</h2>
       <div className="addons">
        {addOns}
      </div>

    </React.Fragment>
    )
  }
}
export default MenuList;
