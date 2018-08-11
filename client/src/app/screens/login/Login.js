import React, { Component } from 'react';
import styled from 'styled-components';
import { Row, Centered } from '../../components';

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Main = styled.div`
  width: 50%;
`;

const Footer = styled.div`
  margin-top: auto;
  text-align: center;
`;

class Login extends Component {
  render() {
    const {
      username,
      onChangeUsername,
      password,
      onChangePassword,
      login,
      loggingIn,
      error,
    } = this.props;

    return (
      <StyledLogin>
        <Centered>
          <Main>
            <h1>Saffron Specials Updater</h1>
            <p>
              Use this dashboard to update Saffron's specials.
            </p>
            <form onSubmit={login}>
              <p className="text-danger">{error}</p>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={onChangeUsername}
                />
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={onChangePassword}
                />
              </div>
              <button
                type="submit"
                className="btn btn-success"
                onClick={login}
                disabled={loggingIn}
              >
                {loggingIn ? 'Logging In...' : 'Login'}
              </button>
            </form>
          </Main>
        </Centered>
        <Footer>
          <p>&copy; 2018 Leung Enterprises Web Design</p>
        </Footer>
      </StyledLogin>
    );
  }
}

export default Login;