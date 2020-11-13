import React, { Component } from 'react';

class AddonItem extends Component  {

  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    return (
      <main className="menu-wrapper">
        <div className="container">
          <ul className="menu-list-proteins">
            <div className="list-group-item list-group-item-action">
              <div className="row ">
                <h5 className="col">{this.props.item.category}</h5>
                <h5 className="col-10 ">{this.props.item.item}</h5>
                <h5 className="col-2">${this.props.item.price}</h5>
              </div>
                <button type="button" className="btn btn-success" onClick={()=>this.props.addOrder(this.props.item)}>Add to Order</button>
            </div>
          </ul>
        </div>
    </main>

  );
    }
}


class AddonList extends Component {

  render() {
    const proteins = this.props.proteins.map((protein)=> <AddonItem  addOrder={this.props.addOrder} deleteOrder={this.props.deleteORder} subtotal={this.props.subtotal} item={protein}/>);
    const veggies = this.props.veggies.map((veggie)=> <AddonItem addOrder={this.props.addOrder} deleteOrder={this.props.deleteORder} subtotal={this.props.subtotal} item={veggie}/>);
    const highcarbs = this.props.desserts.map((highcarb)=> <AddonItem addOrder={this.props.addOrder} deleteOrder={this.props.deleteORder} subtotal={this.props.subtotal} item={highcarb}/>);
    return(

      <div className="col">
        <div className="col-12">
        <h2 className="foodCategory">Proteins</h2>
      {proteins}
      <h2 className="foodCategory">Veggies</h2>
      {veggies}
      <h2 className="foodCategory">High Carbs</h2>
      {highcarbs}
      </div>
      </div>
    )
  }
}
export default AddonList;
