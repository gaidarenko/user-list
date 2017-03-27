import React, { Component } from 'react';
import DateControl from './DateControl';

class UserForm extends Component {
  constructor(props) {
    super(props);

    const empty = {
      name: "",
      address: "",
      city: "",
      phone: "",
      day: 0,
      month: 0,
      year: 0,
    };

    this.state = props.user || empty;;

    this.onCancel = this.onCancel.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onUpdate = this.onUpdate.bind(this);

    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(day, month, year) {
    this.setState({day, month, year});
  }

  isFormInvalid() {
    const errors = [];

    if (!this.state.name.trim()) {
      errors.push("Name is not specified.");
    }

    if (this.state.name.length > 100) {
      errors.push("Name is too long.");
    }

    if (!this.state.day || !this.state.month || !this.state.year) {
      errors.push("Birthday is not specified");
    }

    if (this.state.phone && !/^\+7\d{10}/.test(this.state.phone)) {
      errors.push("Invalid phone number. Must be like: +71234567890");
    }

    this.setState({errors});

    return errors.length;
  }

  onCancel(e) {
    if (e) 
      e.preventDefault();

    this.props.onCancel();
  }

  onUpdate(e) {
    if (e)
      e.preventDefault();

    if (this.isFormInvalid())
      return;

    const state = {...this.state};
    delete state.errors;

    this.props.onUpdate(state);
  }

  onAdd(e) {
    if (e)
      e.preventDefault();

    if (this.isFormInvalid())
      return;

    const state = {...this.state};
    delete state.errors;

    this.props.onAdd(state);
  }

  render() {     
    let okButton = (<button className="btn btn-primary" onClick={this.onAdd}>Add</button>);

    if (this.props.user) {
      okButton = (<button className="btn btn-primary" onClick={this.onUpdate}>Update</button>);
    } 

    let errors = null;

    if (this.state.errors && this.state.errors.length > 0) {
      errors = this.state.errors.map((error, index) => 
        <div className="alert alert-danger" key={index}>{error}</div>
      );
    }
          
    return (
      <div className="row">
        <div className="col-sm-offset-4 col-sm-4 ">
          
          {errors}

          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" 
                className="form-control" 
                id="name" 
                value={this.state.name} 
                onChange={(event) => {this.setState({name: event.target.value})}} 
                placeholder="Name"/>
            </div>

            <div className="form-group">
              <label htmlFor="day">Birthday</label>
              <DateControl day={this.state.day} 
                month={this.state.month} 
                year={this.state.year} 
                onChange={this.handleDateChange}/>
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" 
                className="form-control" 
                id="address"
                value={this.state.address}
                onChange={(event) => {this.setState({address: event.target.value})}} 
                placeholder="Address"/>
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input type="text" 
                className="form-control" 
                id="city"
                value={this.state.city}
                onChange={(event) => {this.setState({city: event.target.value})}} 
                placeholder="City"/>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="text" 
                className="form-control" 
                id="phone"
                value={this.state.phone}
                onChange={(event) => {this.setState({phone: event.target.value})}} 
                placeholder="Phone"/>
            </div>

            {okButton}
            <button className="btn btn-default" onClick={this.onCancel} style={{marginLeft: "15px"}}>Cancel</button>
          </form>
        </div>
      </div>
    );
  }
}

export default UserForm;