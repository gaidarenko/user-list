import React, { Component } from 'react';

class DateControl extends Component {
  constructor(props) {
    super(props);

    const {day, month, year} = this.props;
    this.state = { day, month, year };

    const date = new Date();

    const today = {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear()
    }

    if (!day || day < 1 || day > 31 || !month || month < 1 || month > 12 || !year || year < 1970 || year > 2017) {
      this.state = today;
    }

    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
  }

  handleDayChange(e) {
    const day = e.target.value;
    this.setState({day});

    this.props.onChange(day, this.state.month, this.state.year);
  }

  handleMonthChange(e) {
    const month = e.target.value;
    this.setState({month});

    this.props.onChange(this.state.day, month, this.state.year);
  }

  handleYearChange(e) {
    const year = e.target.value;
    this.setState({year});

    this.props.onChange(this.state.day, this.state.month, year);
  }


  render() {   
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthOptions = months.map((val, index) => <option value={index + 1} key={index}>{val}</option>);

    const dayOptions = [];
    for (let i = 1; i < 32; i++) {
      dayOptions.push(<option value={i} key={i}>{i}</option>);
    }

    const yearOptions = [];
    for (let i = 1970; i < 2018; i++) {
      yearOptions.push(<option value={i} key={i}>{i}</option>);
    }

    return (
      <div>
        <select className="form-control one-line" id="day" value={this.state.day} onChange={this.handleDayChange}>
          {dayOptions}
        </select>

        <span style={{paddingLeft: "10px", paddingRight: "10px"}}>.</span>

        <select className="form-control one-line" id="month" value={this.state.month} onChange={this.handleMonthChange}>
          {monthOptions}
        </select>

        <span style={{paddingLeft: "10px", paddingRight: "10px"}}>.</span>

        <select className="form-control one-line" id="year" value={this.state.year} onChange={this.handleYearChange}>
          {yearOptions}
        </select>
      </div>
    );
  }
}

export default DateControl;