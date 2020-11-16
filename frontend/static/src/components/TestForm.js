import React, { Component} from 'react';
import { Col, Row, Form, FormGroup, Input, Label, Button, CustomInput } from 'reactstrap';
import MenuList from './MenuList';
import Menu from './Menu';


class TestForm extends Component {
  render() {

    //
    // const subtotal = this.props.order.reduce((acc, item)=> {
    // let total = acc + Number(item.price)
    //     return total
    // }, 0);
    //
    // let checklist = this.props.order.map((item, index)=> (
    //   <div className="d-flex" key={index}>
    //     <h5 className="col-8">{item.entree}</h5>
    //     <h5 className="col-2">${item.price}</h5>
    //     <button type="button" className="btn col-2" onClick={()=>this.props.deleteOrder(item)}>Delete</button>
    //   </div>
    // ));

    return(
      <Form>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" name="name" onChange={this.handleChange}/>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="phone">Phone</Label>
              <Input type="text" name="phone" onChange={this.handleChange}/>
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="text" name="email" onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="date">Date</Label>
          <Input
            type="date"
            name="date"
            onchange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="checkbox">Entrees (All Entrees are $8.00)</Label>
          <div>
            <CustomInput type="checkbox" id="checkbox1" label="Asian Salmon" />
            <CustomInput type="checkbox" id="checkbox2" label="Jerk Chicken - Chicken marinated 48 hours served with red and green cabbage" />
            <CustomInput type="checkbox" id="checkbox3" label="Garlic Lemon Pepper Shrimp - Shrimp seasoned with garlic and lemon pepper, served with asparagus" />
            <CustomInput type="checkbox" id="checkbox4" label="Grilled Chicken -Grilled chicken served with mashed sweet potatoes. Cinnamon and honey served on the side." />
            <CustomInput type="checkbox" id="checkbox5" label="Vegan Bowl - Mexican style tofu with black beans, rice, and white corn" />
          </div>
        </FormGroup>
        <h3>Make Your Own!</h3>
        <Row form>
          <Col md={3}>
            <FormGroup>
            <Label for="checkbox">Proteins (All Proteins $5.00)</Label>
            <div>
              <CustomInput type="checkbox" id="checkbox6" label="Shrimp" />
              <CustomInput type="checkbox" id="checkbox7" label="Salmon" />
              <CustomInput type="checkbox" id="checkbox8" label="Chicken" />
            </div>
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
            <Label for="checkbox">Veggies(All Veggies $3.00)</Label>
            <div>
              <CustomInput type="checkbox" id="checkbox9" label="Broccoli" />
              <CustomInput type="checkbox" id="checkbox10" label="Kale" />
              <CustomInput type="checkbox" id="checkbox11" label="Asparagus" />
              <CustomInput type="checkbox" id="checkbox12" label="Spinach" />
            </div>
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
            <Label for="checkbox">High Carbs (All Carbs $3.00)</Label>
            <div>
              <CustomInput type="checkbox" id="checkbox13" label="Pasta" />
              <CustomInput type="checkbox" id="checkbox14" label="Rice" />
              <CustomInput type="checkbox" id="checkbox15" label="Sweet Potatoes" />
            </div>

            </FormGroup>
          </Col>
        </Row>
        <div className="col">
          <div className="justify-content-md-center row">
            <h2 className="main-title">Order Form</h2>
          </div>
        </div>
          <hr/>
        <Button>Submit</Button>
      </Form>

    );
  }
}

export default TestForm;
