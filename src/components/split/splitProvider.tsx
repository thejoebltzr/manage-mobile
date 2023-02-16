import React, {ReactNode, useMemo} from 'react';

import SplitContext from './splitContext';
import {ISplitContextValues, IUpdateProps} from './types';

type SplitProviderProps = IUpdateProps & {
  factory: SplitIO.ISDK | null;
  client: SplitIO.IClient | null;
  attributes?: SplitIO.Attributes;
  children: JSX.Element | ReactNode | null;
} & ISplitContextValues;

const SplitProvider = ({children, ...args}: SplitProviderProps) => {
  const state = useMemo(
    () => ({
      ...args,
    }),
    [args],
  );
  return (
    <SplitContext.Provider value={state}>{children}</SplitContext.Provider>
  );
};

export default SplitProvider;
