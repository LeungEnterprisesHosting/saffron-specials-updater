import React, { Component } from 'react';
import styled from 'styled-components';
import { Row, Centered } from '../../components';

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Main = styled.div`
  width: 50%;
`;

const Label = styled.label`
  font-weight: bold;
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

    const emptyFields = (username === '') || (password === '');

    return (
      <StyledLogin>
        <Centered>
          <Main>
            <h1>Saffron Specials Updater</h1>
            <p>
              Use this dashboard to update{' '}
              <a
                href="https://www.saffronofphilly.com/specials"
                target="_blank"
              >
                Saffron's monthly specials page
              </a>.
            </p>
            <form onSubmit={login}>
              <p className="text-danger">{error}</p>
              <div className="form-group">
                <Label>Username</Label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={onChangeUsername}
                  placeholder="Username"
                />
              </div>
              <div className="form-group">
                <Label>Password</Label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={onChangePassword}
                  placeholder="Password"
                />
              </div>
              <button
                type="submit"
                className="btn btn-success btn-lg"
                onClick={login}
                disabled={loggingIn || emptyFields}
              >
                <i className="fa fa-sign-in-alt" />{' '}
                {loggingIn ? 'Logging In...' : 'Login'}
              </button>
            </form>
          </Main>
        </Centered>
        <Footer>
          <p>
            &copy; 2018{' '}
            <a
              href='https://www.leungenterprises.com/'
              target='_blank'
            >
              Leung Enterprises Web Design
            </a>
          </p>
        </Footer>
      </StyledLogin>
    );
  }
}

export default Login;