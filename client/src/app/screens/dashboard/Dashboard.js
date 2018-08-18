import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import { Col, Row } from '../../components';
import { APPETIZER, ENTREE, CREATE } from '../../constants';
import Current from './Current';
import EditButtons from './EditButtons';
import Special from './Special';
import NewSpecial from './NewSpecial';
import SaveModal from './SaveModal';

const StyledDashboard = styled.div`
  flex: 1;
`;

const LogoutButton = styled.button`
  float: right;
`;

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.renderAppetizer = this.renderAppetizer.bind(this);
    this.renderEntree = this.renderEntree.bind(this);
    this.renderSpecial = this.renderSpecial.bind(this);
  }

  renderAppetizer(special, i) {
    return this.renderSpecial(special, i, APPETIZER);
  }

  renderEntree(special, i) {
    return this.renderSpecial(special, i, ENTREE);
  }

  renderSpecial(special, i, group) {
    const { name, description, price } = special;
    const {
      editing,
      onChangeSpecials
    } = this.props;

    const onChangeSpecial = (action, newSpecial) => {
      onChangeSpecials(group, i, action, newSpecial)
    }

    return (
      <Special
        key={i}
        index={i}
        onChangeSpecial={onChangeSpecial}
        name={name}
        description={description}
        price={price}
        editing={editing}
      />
    );
  }

  render() {
    const {
      editing,
      onEdit,
      saving,
      confirmedSaving,
      onSave,
      onConfirmSave,
      onCancelSave,
      saveIssues,
      onCancel,
      current,
      onChangeCurrent,
      specials,
      onChangeSpecials,
      onChangeAdding,
      logout,
    } = this.props;
    const { appetizers, entrees } = specials;

    return (
      <StyledDashboard>
        <h1>
          Saffron Specials Dashboard
          <EditButtons 
            editing={editing}
            saving={saving}
            onEdit={onEdit}
            onSave={onSave}
            onCancel={onCancel}
          />
          <LogoutButton
            type="button"
            onClick={logout}
            className="btn btn-danger btn-lg"
          >
            <i className="fa fa-sign-out-alt" />{' '}
            Logout
          </LogoutButton>
        </h1>
        <p
          className="lead"
          style={{ fontWeight: 'normal', marginTop: '1rem' }}
        >
          Update this month's specials using this dashboard.
          Click the "Edit Specials" button to begin.
          Any questions? Email Nathan at{' '}
          <a href="mailto:hello@leungenterprises.com">
            hello@leungenterprises.com
          </a>.
        </p>
        <hr />
        <h2>Current Specials Month</h2>
        <p>
          The month you type here is exactly as how it will be shown on{' '}
          <a
            href="https://www.saffronofphilly.com/specials"
            target="_blank"
          >
            the Saffron specials page
          </a>.
        </p>
        <Current
          editing={editing}
          current={current}
          onChangeCurrent={onChangeCurrent}
        />
        <hr />
        <h2>Current Specials</h2>
        <p>Listed below are this month's specials.</p>
        <Row>
          <Col>
            <h3>Appetizers</h3>
            {appetizers.map(this.renderAppetizer)}
            {editing ? (
              <Fragment>
                <h4>Add New Appetizer</h4>
                <p>
                  Once you're done adding the new appetizer,
                  make sure you click the green '+' button
                  to add it to the list.
                </p>
                <NewSpecial
                  editing={editing}
                  onChangeAdding={onChangeAdding}
                  onAddSpecial={(newSpecial) =>
                    onChangeSpecials(
                      APPETIZER,
                      appetizers.length,
                      CREATE,
                      newSpecial
                    )
                  }
                />
              </Fragment>
            ) : null}
          </Col>
          <Col>
            <h3>Entrees</h3>
            {entrees.map(this.renderEntree)}
            {editing ? (
              <Fragment>
                <h4>Add New Entree</h4>
                <p>
                  Once you're done adding the new entree,
                  make sure you click the green '+' button
                  to add it to the list.
                </p>
                <NewSpecial
                  editing={editing}
                  onChangeAdding={onChangeAdding}
                  onAddSpecial={(newSpecial) =>
                    onChangeSpecials(
                      ENTREE,
                      entrees.length,
                      CREATE,
                      newSpecial
                    )
                  }
                />
              </Fragment>
            ) : null}
          </Col>
        </Row>
        <SaveModal
          shown={saving}
          onConfirmSave={onConfirmSave}
          confirmedSaving={confirmedSaving}
          onCancelSave={onCancelSave}
          issues={saveIssues}
        />
      </StyledDashboard>
    );
  }
}

export default Dashboard;