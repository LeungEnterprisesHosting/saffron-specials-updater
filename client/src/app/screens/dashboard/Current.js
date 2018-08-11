import React, { Component } from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: inline-block;
  margin-right: .75rem;
  font-weight: bold;
`;

const Value = styled.span`
  display: inline-block;
  background-color: rgba(0, 0, 0, 0.05);
  padding: .375rem .75rem;
  margin-right: 1.5rem;
`;

const MonthInput = styled.input`
  display: inline-block;
  margin-right: 1.5rem;
`;

const FormGroup = styled.div`
  display: inline-block;
  padding: 0.75rem;
  padding-left: 0;
  padding-top: 0;
`;

class Current extends Component {
  constructor(props) {
    super(props);

    this.onChangeMonth = this.onChangeMonth.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
  }

  onChangeMonth(e) {
    const { onChangeCurrent } = this.props;
    const { current } = this.props;
    const { year } = current;

    const newMonth = e.target.value;

    onChangeCurrent({
      month: newMonth,
      year,
    });
  }

  onChangeYear(e) {
    const { onChangeCurrent } = this.props;
    const { current } = this.props;
    const { month } = current;

    const newYear = e.target.value;
    
    onChangeCurrent({
      month,
      year: newYear,
    });
  }

  render() {
    const { current, editing } = this.props;
    const { year, month } = current;

    return (
      <div>
        <FormGroup>
          <div className="form-inline">
            <Label htmlFor="month">Month:</Label>
            {editing ?
              <MonthInput
                id="month"
                type="text"
                className="form-control"
                value={month}
                onChange={this.onChangeMonth}
                placeholder="Month"
              /> :
              <Value>{month}</Value>
            }
          </div>
        </FormGroup>
        <FormGroup>
          <div className="form-inline">
            <Label htmlFor="year">Year:</Label>
            {editing ?
              <input
                id="year"
                type="number"
                className="form-control"
                min="2017"
                max="2500"
                value={year}
                onChange={this.onChangeYear}
                placeholder="Year"
              /> :
              <Value>{year}</Value>
            }
          </div>
        </FormGroup>
      </div>
    );
  }
}

export default Current;