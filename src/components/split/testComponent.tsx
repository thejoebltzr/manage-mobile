import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';

import Text from '../text';
import SplitContext from './splitContext';

/**
 * This component serves only as a demo on how SplitContext can be
 * used to enable feature toggles
 */
const TestComponent = () => {
  const split = useContext(SplitContext);
  const {client, isReady} = split;
  const [testTreatment, setTestTreatment] = useState<SplitIO.Treatment>();

  useEffect(() => {
    client?.on(client.Event.SDK_READY, function () {
      setTestTreatment(client.getTreatment('test_split'));
    });

    return () => {
      client?.destroy();
    };
  }, [client, isReady]);

  if (testTreatment === 'on') {
    // treatment is on
    return <Text>Split is on!</Text>;
  } else if (testTreatment === 'off') {
    // treatment is off
    return <Text>Split is off!</Text>;
  } else {
    // control treatment
    // this occurs when treatment is not available
    // or client is not yet ready
    return <ActivityIndicator />;
  }
};

export default TestComponent;
