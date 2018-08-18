import React, { Component, Fragment } from 'react';
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
      <Fragment>
        <p>
          Everything looks good. If you're sure you want to save, click
          the "Save Changes and Publish" button below.
        </p>
        <p>
          If you want to double-check everything one last time, click "Cancel Saving
          and Continue Editing" &mdash; once you're sure everything's correct,
          click the "Save New Specials" button again.
        </p>
      </Fragment>
    );
  
    if (issues.length > 0) {
      body = (
        <div>
          <p>We've checked your changes and found that:</p>
          <ul>
            {issues.map((issue, i) => <li key={i}>{issue}</li>)}
          </ul>
          <p>
            If you'd like to make further changes, click the
            "Cancel Saving and Continue Editing" button below.
            If you're sure everything is correct and you want
            to save, click "Save Changes and Publish".
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
              If you click "Save Changes and Publish", the changes you made will be live
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
              disabled={confirmedSaving}
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