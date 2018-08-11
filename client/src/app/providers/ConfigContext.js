import { createContext } from 'react';

const ConfigContext = createContext({
  loginEndpoint: '',
  dataEndpoint: '',
})

export default ConfigContext;