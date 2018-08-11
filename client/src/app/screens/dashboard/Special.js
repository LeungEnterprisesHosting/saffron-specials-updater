import React, { Component } from 'react';
import styled from 'styled-components';

import { TextArea } from '../../components';
import { UPDATE, DESTROY } from '../../constants';

const StyledSpecial = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  background-color: rgba(0, 0, 0, 0.05);
  color: #111;
  padding: 15px;
`;

const Name = styled.span`
  display: inline-block;
  font-weight: bold;
  flex: 1;
  padding: .375rem .75rem;
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

const Description = styled.div`
  min-height: 6rem;
  padding: .375rem .75rem;
`;

const DescriptionTextArea = TextArea.extend`
  margin-top: 0.375rem;
`;

class Special extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
  }

  onChangeName(e) {
    const { description, price, onChangeSpecial } = this.props;

    const newName = e.target.value;
    onChangeSpecial(UPDATE, {
      name: newName,
      description,
      price,
    });
  }

  onChangeDescription(e) {
    const { name, price, onChangeSpecial } = this.props;
    
    const newDescription = e.target.value;
    onChangeSpecial(UPDATE, {
      name,
      description: newDescription,
      price,
    });
  }

  onChangePrice(e) {
    const { name, description, onChangeSpecial } = this.props;
    
    const newPrice = e.target.value;
    onChangeSpecial(UPDATE, {
      name,
      description,
      price: newPrice,
    });
  }

  render() {
    const {
      name,
      description,
      price,
      editing,
      onChangeSpecial,
    } = this.props;

    return (
      <StyledSpecial>
        <div>
          { editing ? (
            <div>
              <div className="input-group">
                <NameInput
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={this.onChangeName}
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
                />
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => onChangeSpecial(DESTROY)}
                >
                  <i className="fa fa-trash" />
                </button>
              </div>
            </div>
          ) : <p><Name>{name}</Name> ${price}</p> }
        </div>
        <div>
          { editing ?
            <DescriptionTextArea
              className="form-control"
              rows="5"
              value={description}
              onChange={this.onChangeDescription}
            /> :
            <Description>
              {description}
            </Description> }
        </div>
      </StyledSpecial>
    );
  }
}

export default Special;