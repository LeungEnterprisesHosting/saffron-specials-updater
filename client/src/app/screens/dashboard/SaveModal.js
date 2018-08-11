import React, { Component } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: ${({ shown }) => shown ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
`;

const StyledSaveModal = styled.div`
  position: absolute;
  width: 70%;
  left: 15%;

  @media (max-width: 767px) {
    width: 90%;
    left: 5%;
  }
`;

class SaveModal extends Component {
  render() {
    const {
      issues,
      shown,
      onConfirmSave,
      onCancelSave,
      confirmedSaving,
    } = this.props;

    let body = (
      <p>
        Are you sure you want to save?
      </p>
    );
  
    if (issues.length > 0) {
      body = (
        <div>
          <p>We've checked your changes and found that:</p>
          <ul>
            {issues.map((issue, i) => <li key={i}>{issue}</li>)}
          </ul>
          <p>
            If you'd like to make further changes, click the "Cancel Saving" button below.
            If you're sure you want to save, click "Save Changes".
          </p>
        </div>
      );
    }

    return (
      <Overlay shown={shown}>
        <StyledSaveModal className="modal-content">
          <div className="modal-header">
            <h2>Save</h2>
          </div>
          <div className="modal-body">
            {body}
            <p>
              If you click "Save Changes", the changes you made will be live
              on the{' '}
              <a href="https://www.saffronofphilly.com/specials" target="_blank">
                Saffron specials page
              </a> in about 5 minutes.
            </p>
          </div>
          <div className="modal-footer" style={{ flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancelSave}
            >
              Cancel Saving and Continue Editing
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onConfirmSave}
              disabled={confirmedSaving}
            >
              {confirmedSaving ?
                'Saving Changes...' :
                'Save Changes and Publish'}
              
            </button>
          </div>
        </StyledSaveModal>
      </Overlay>
    )
  }
}

export default SaveModal;