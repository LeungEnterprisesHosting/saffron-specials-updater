import React, { Component } from 'react';
import axios from 'axios';
import { ConfigContext } from '../providers/';

class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      loggingIn: false,
      token: '',
      error: '',
      username: '',
      password: '',
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  async login(e) {
    e.preventDefault();

    this.setState({
      error: '',
      loggingIn: true,
    });

    try {
      const { endpoint } = this.props;
      const { username, password } = this.state;
      const { data } =
        await axios.post(`${endpoint}/login`, {
          username: username,
          password: password,
        })
      const { success, token } = data;

      if (success) {
        this.setState({
          loggingIn: false,
          loggedIn: true,
          token,
        })
      } else {
        this.setState({
          loggingIn: false,
          error: 'Incorrect username or password',
        });
      }
    } catch (err) {
      console.log(err);
      this.setState({
        loggingIn: false,
        error: 'We had trouble connecting to the server. ' +
               'Try again later, and if the problem persists, ' +
               'send an email to hello@leungenterprises.com',
      })
    }
  }

  logout() {
    this.setState({
      loggedIn: false,
      token: '',
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  render() {
    return this.props.render({
      ...this.state,
      login: this.login,
      logout: this.logout,
      onChangeUsername: this.onChangeUsername,
      onChangePassword: this.onChangePassword,
    });
  }
}

// Wrap in ConfigContext
const ConfiguredAuthProvider = (props) => (
  <ConfigContext.Consumer>
    {({ loginEndpoint }) => (
      <AuthProvider
        {...props}
        endpoint={loginEndpoint}
      />
    )}
  </ConfigContext.Consumer>
)
ConfiguredAuthProvider.displayName = 'ConfiguredAuthProvider';

export default ConfiguredAuthProvider;