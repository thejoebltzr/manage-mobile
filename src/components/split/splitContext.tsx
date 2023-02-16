import React, {createContext} from 'react';

import {EXCEPTION_NO_REACT_OR_CREATECONTEXT} from './constants';
import {ISplitContextValues} from './types';

if (!React || !createContext) {
  throw new Error(EXCEPTION_NO_REACT_OR_CREATECONTEXT);
}

const SplitContext = createContext<ISplitContextValues>({
  client: null,
  factory: null,
  isReady: false,
  isReadyFromCache: false,
  isTimedout: false,
  hasTimedout: false,
  lastUpdate: 0,
  isDestroyed: false,
});

export default SplitContext;
export type {ISplitContextValues};
