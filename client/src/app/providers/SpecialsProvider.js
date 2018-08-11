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
    };

    this.saveData = this.saveData.bind(this);
  }

  async componentDidMount() {
    if (process.env.NODE_ENV === 'development') {
      const { body } = mockData;
      const { current, specials } = JSON.parse(body);

      setTimeout(() => {
        this.setState({
          current,
          specials,
          loading: false,
        })
      }, /* 1500 */ 0);        
    } else {
      const { endpoint } = this.props;
      const { data } =
        await axios.get(`${endpoint}/data`);
  
      const { current, specials } = data;
      
      this.setState({
        current,
        specials,
        loading: false,
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
        await axios.post(`${endpoint}/data`, newData);
  
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