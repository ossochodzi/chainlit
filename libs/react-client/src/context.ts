import { createContext } from 'react';

import { ChainlitAPI, SubscribeAPI } from './api';

const defaultChainlitContext = undefined;

const ChainlitContext = createContext<ChainlitAPI>(
  new ChainlitAPI('http://localhost:8000', 'webapp')
);

const SubscriptionContext = createContext<SubscribeAPI>(
  new SubscribeAPI('http://localhost:8010', 'webapp')
);

export { ChainlitContext, defaultChainlitContext, SubscriptionContext };
