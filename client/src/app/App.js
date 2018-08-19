import React, { Component } from 'react';
import styled from 'styled-components';

import { Centered, Spinner } from './components/';
import {
  ConfigContext,
  SpecialsProvider,
  EditProvider,
  AuthProvider,
} from './providers/';
import { Dashboard, Login } from './screens/';

const StyledApp = styled.div`
  display: flex;
  flex: 1;
  padding: 50px;
  background:
    linear-gradient(
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.8)
    ),
    url('https://www.saffronofphilly.com/img/food/samosas2.jpg');
  background-attachment: fixed;
  background-size: cover;

  @media (max-width: 767px) {
    padding: 15px;
  }

  .form-control, button {
    border-radius: 0;
  }
  .form-control::placeholder {
    opacity: 0.25;
  }
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.renderWithAuth = this.renderWithAuth.bind(this);
    this.renderWithSpecials = this.renderWithSpecials.bind(this);
    this.renderWithEdit = this.renderWithEdit.bind(this);

    this.config = {
      loginEndpoint: 'https://nh8pjfvupa.execute-api.us-east-1.amazonaws.com/dev',
      dataEndpoint: 'https://nh8pjfvupa.execute-api.us-east-1.amazonaws.com/dev',
    };
  }

  render() {
    return (
      <StyledApp>
        <ConfigContext.Provider value={this.config}>
          <AuthProvider
            render={this.renderWithAuth}
          />
        </ConfigContext.Provider>
      </StyledApp>
    )
  }

  renderWithAuth({
    loggedIn,
    logout,
    ...restProps,
  }) {
    if (!loggedIn) {
      return (
        <Login
          {...restProps}
        />
      )
    }
    // Need to pass this a few layers down, too,
    // so attach to instance
    this.logout = logout;

    return (
      <SpecialsProvider
        render={this.renderWithSpecials}
        logout={logout}
        {...restProps}
      />
    )
  }

  renderWithSpecials({
    current,
    specials,
    loading,
    error,
    ...restProps
  }) {
    if (loading) {
      return (
        <Centered>
          <Spinner />
          <br />
          <p>Fetching data...</p>
        </Centered>
      )
    }

    if (error !== '') {
      return (
        <Centered>
          <i className="fa fa-exclamation" />
          <br />
          <p>{error}</p>
          <br />
          <button
            type="button"
            className="btn btn-lg btn-danger"
            onClick={this.logout}
          >
            Logout
          </button>
        </Centered>
      )
    }

    return (
      <EditProvider
        initialData={{ current, specials }}
        render={this.renderWithEdit}
        {...restProps}
      />
    );
  }

  renderWithEdit({ newData, ...restProps }) {
    const { specials, current } = newData;

    return (
      <Dashboard
        {...restProps}
        specials={specials}
        current={current}
        logout={this.logout}
      />
    );
  }
}

export default App;