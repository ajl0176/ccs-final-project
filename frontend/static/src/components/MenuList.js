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
                <h5 className="col-9 ">{this.props.item.entree}</h5>
                <h5 className="col-3">${this.props.item.price}</h5>
              </div>
                <p className="descript"> {this.props.item.description}</p>
                <img src={this.props.item.image} alt=""/>
                <button type="button" className="btn btn-sm btn-light" onClick={()=>this.props.addOrder(this.props.item)}>Add to Order</button>
          <hr className="col-10"/>
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
      createYourOwn: [],
    }

    this.addToCreateYourOwn = this.addToCreateYourOwn.bind(this);
    this.addAddOnToOrder = this.addAddOnToOrder.bind(this);
  }

  addToCreateYourOwn(item) {
    // console.log(item);
    const createYourOwn = [...this.state.createYourOwn];
    createYourOwn.push(item);
    this.setState({createYourOwn});
  }

  addAddOnToOrder() {
    // entree is 'Add on'
    // price

    const price = this.state.createYourOwn.reduce((acc, i) => acc + Number(i.price), 0);
    const entree = this.state.createYourOwn.reduce((acc, i) => acc + `${i.item}    `, "Add on:   ");
    this.props.addOrder({entree, price})
    this.setState({createYourOwn:[]})
    console.log(entree, price);
  }

  render() {
    const menuitems = this.props.menuItems.map((item)=> <FoodItem key={item.id} addOrder={this.props.addOrder} deleteOrder={this.props.deleteOrder} deleteItem={this.props.deleteItem} subtotal={this.props.subtotal} item={item}/>);

    let categories = this.props.addOns?.map((addon, index) => addon.category);
    // console.log(categories);
    // The Set object lets you store unique values of any type
    // A value in the Set may only occur once
    categories = [...new Set(categories)];

    const addOns = categories.map(category => {
      // console.log('single', category)
      const items = this.props.addOns
        .filter(addOn => addOn.category === category)
        .map(addOn => (<p key={addOn.id} onClick={() => this.addToCreateYourOwn(addOn)}>{addOn.item} </p>));

      const prices = this.props.addOns
      .filter(addOn => addOn.category === category)
      .map(addOn => (<p key={addOn.id}>${addOn.price} </p>));

      // addOrder={this.props.addOrder}

    // const addOns = this.props.addOns.map(item)=>
      // console.log('items', items);
      return(
        <React.Fragment>

          <div className="container">
            <div className="row">
              <div className= "col-category">
                <h2 className="category">{category}</h2>
                <div className="col">
                <div className="row">
                <h5 className="btn"  aria-pressed="True">{items}</h5>
                <h5 className="btn">{prices}</h5>
                </div>
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
          <h2 className="foodCategory-menu">Menu</h2>
          {menuitems}
       </div>
       <h2 className="foodCategory-own">Make Your Own!</h2>
       <div className="addOns">
        {addOns}
      </div>
      <button className="button-addons" onClick={this.addAddOnToOrder}>Add to Order</button>
      <div>
      <br />
      <br />
        </div>

    </React.Fragment>
    )
  }
}
export default MenuList;
