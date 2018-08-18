import React, { Component } from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  display: inline-block;
  margin-left: 1.5rem;
  margin-right: 0.75rem;

  & > button:nth-child(2) {
    margin-left: 0.375rem;
  }
`;

class EditButtons extends Component {
  render() {
    const { editing, saving, onEdit, onCancel, onSave } = this.props;

    if (editing) {
      return (
        <ButtonContainer>
          <button
            type="button"
            className="btn btn-success btn-lg"
            onClick={onSave}
            title="Validates and saves new specials"
          >
            <i className="fa fa-save" />
            {'  '}Save New Specials
          </button>
          <button
            type="button"
            className="btn btn-danger btn-lg"
            onClick={onCancel}
            title="Cancel edits, discarding all changes"
          >
            <i className="fa fa-times-circle" />
            {'  '}Cancel Edits
          </button>
        </ButtonContainer>
      )
    }

    if (saving) {
      return (
        <ButtonContainer>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={onEdit}
            disabled
          >
            <i className="fa fa-save" />
            {'  '}Saving Specials...
          </button>
        </ButtonContainer>
      )
    }

    return (
      <ButtonContainer>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={onEdit}
          title="Edit specials"
        >
          <i className="fa fa-edit" />
          {'  '}Edit Specials
        </button>
      </ButtonContainer>
    )
  }
}

export default EditButtons;