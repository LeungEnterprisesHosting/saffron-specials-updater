import React, { Component } from 'react';
import axios from 'axios';

import { ConfigContext } from '../providers/';
import mockData from '../../../../services/saffron-specials-updater/fixtures/newData.json'

class SpecialsProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '',
      specials: {
        appetizers: [],
        entrees: [],
      },
      loading: true,
      error: '',
    };

    this.saveData = this.saveData.bind(this);
  }

  async componentDidMount() {
    /*
    if (process.env.NODE_ENV === 'development') {
      const { body } = mockData;
      const { current, specials } = JSON.parse(body);

      return setTimeout(() => {
        this.setState({
          current,
          specials,
          loading: false,
        })
      }, 1500);        
    }
    */

    try {
      const { endpoint, token } = this.props;

      this.setState({
        error: '',
      });

      const { data } =
        await axios
          .get(`${endpoint}/data`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

      const { current, specials } = data;
      
      this.setState({
        current,
        specials,
        loading: false,
      });
    } catch (err) {
      const { logout } = this.props;

      // If we're here and this occurs, probably an old JWT
      if (err.response && err.response.status === 403) {
        return logout();
      }

      this.setState({
        loading: false,
        error: 'There was an error connecting to the server. ' +
               'Please try again later. If the problem persists, ' +
               'contact Nathan at hello@leungenterprises.com',
      });
    }
  }

  async saveData(newData) {
    if (process.env.NODE_ENV === 'development') {
      return new Promise(resolve => {
        setTimeout(resolve, 1500);
      });
    } else {
      const { endpoint } = this.props;
      const { data } =
        await axios.post(`${endpoint}/data`, newData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
      return data;
    }
  }

  render() {
    return this.props.render({
      ...this.state,
      saveData: this.saveData,
    });
  }
}

const ConfiguredSpecialsProvider = (props) => (
  <ConfigContext.Consumer>
    {({ dataEndpoint }) => (
      <SpecialsProvider
        {...props}
        endpoint={dataEndpoint}
      />
    )}
  </ConfigContext.Consumer>
);
ConfiguredSpecialsProvider.displayName = 'ConfiguredSpecialsProvider';

export default ConfiguredSpecialsProvider;