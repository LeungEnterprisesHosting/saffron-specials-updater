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
  min-height: 100%;
  padding: 50px;
  background:
    linear-gradient(
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.8)
    ),
    url('https://www.saffronofphilly.com/img/food/samosas2.jpg');
  background-attachment: fixed;
  background-size: cover;

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Source Sans Pro';
  }

  &, p {
    font-family: 'Source Sans Pro';
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
    ...restProps,
  }) {
    if (!loggedIn) {
      return (
        <Login
          {...restProps}
        />
      )
    }

    return (
      <SpecialsProvider
        render={this.renderWithSpecials}
      />
    )
  }

  renderWithSpecials({
    current,
    specials,
    loading,
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
      />
    );
  }
}

export default App;