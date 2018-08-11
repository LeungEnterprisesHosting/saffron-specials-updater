import React, { Component } from 'react';
import styled from 'styled-components';

import { TextArea } from '../../components';

const StyledNewSpecial = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  background-color: rgba(0, 0, 0, 0.05);
  color: #111;
  padding: 15px;
`;

const NameInput = styled.input`
  display: inline-block;
  flex: .8;
  font-weight: bold;
`;

const PriceInput = styled.input`
  display: inline-block;
  flex: .2;
  margin-right: .75rem;
`;

const DescriptionTextArea = TextArea.extend`
  margin-top: 0.375rem;
`;

class NewSpecial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      price: '',
    };

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onAddSpecial = this.onAddSpecial.bind(this);
    this.updateIsAdding = this.updateIsAdding.bind(this);
  }

  onChangeName(e) {
    const newName = e.target.value;
    this.setState({ name: newName }, () => {
      this.updateIsAdding();
    });
  }

  onChangeDescription(e) {
    const newDescription = e.target.value;
    this.setState({ description: newDescription }, () => {
      this.updateIsAdding();
    });
  }

  onChangePrice(e) {
    const newPrice = e.target.value;
    this.setState({ price: newPrice }, () => {
      this.updateIsAdding();
    });
  }

  updateIsAdding() {
    const { onChangeAdding } = this.props;
    const { name, description, price } = this.state;

    if (name !== '' || description !== '' || price !== '') {
      return onChangeAdding(true);
    }

    return onChangeAdding(false);
  }

  onAddSpecial() {
    const { onAddSpecial } = this.props;
    const { name, description, price } = this.state;

    onAddSpecial({ name, description, price });

    this.setState({
      name: '',
      description: '',
      price: '',
    }, () => {
      this.updateIsAdding();
    });
  }

  render() {
    const { editing } = this.props;
    const {
      name,
      description,
      price,
    } = this.state;

    if (!editing) {
      return null;
    }

    return (
      <StyledNewSpecial>
        <div>
          <div>
            <div className="input-group">
              <NameInput
                type="text"
                className="form-control"
                value={name}
                onChange={this.onChangeName}
                placeholder="Name"
              />
              <div className="input-group-prepend ml-3">
                <span className="input-group-text">$</span>
              </div>
              <PriceInput
                type="number"
                className="form-control"
                min="0"
                value={price}
                onChange={this.onChangePrice}
                placeholder="Price"
              />
              <button
                type="button"
                className="btn btn-success"
                onClick={this.onAddSpecial}
                title="Add Special"
              >
                <i className="fa fa-plus" />
              </button>
            </div>
          </div>
        </div>
        <DescriptionTextArea
          className="form-control"
          rows="5"
          value={description}
          onChange={this.onChangeDescription}
          placeholder="Description"
        />
      </StyledNewSpecial>
    );
  }
}

export default NewSpecial;