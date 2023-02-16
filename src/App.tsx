import {SplitFactory} from '@splitsoftware/splitio-react-native';
import SplitIO from '@splitsoftware/splitio-react-native/types/splitio';
import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {LogBox} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import StorybookUIRoot from '@/.ondevice/Storybook';

import SplitProvider from './components/split/splitProvider';
import {getStatus, IClientStatus} from './components/split/utils';
import NavigationRouter from './navigation/router';
import Connection from './screens/connection';
import store, {persistor} from './store';
import {checkConnected} from './utils/checkConnection';
import {SPLIT_CONFIG} from './utils/config';
import {ENABLE_STORYBOOK} from './utils/storybook';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message

if (__DEV__) {
  import('./utils/reactotron').then(() => console.log('Reactotron Configured'));
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [factory, setFactory] = useState<SplitIO.ISDK | null>(null);
  const [client, setClient] = useState<SplitIO.IClient | null>(null);
  const [status, setStatus] = useState<IClientStatus>(getStatus(null));

  const [connectStatus, setConnectStatus] = useState(false);

  checkConnected().then(res => {
    setConnectStatus(res ?? false);
  });

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const providerValues = useMemo(
    () => ({
      factory,
      client,
      ...status,
      lastUpdate: 0,
    }),
    [client, factory, status],
  );

  useEffect(() => {
    const newFactory = SplitFactory(SPLIT_CONFIG);
    const newClient = newFactory.client();
    setFactory(newFactory);
    setClient(newClient);
    setStatus(getStatus(newClient));
  }, []);

  return (
    <Provider store={store}>
      <SplitProvider {...providerValues}>
        <SafeAreaProvider style={[backgroundStyle, styles.appContainer]}>
          <StatusBar barStyle="light-content" />
          <PersistGate
            loading={<ActivityIndicator size="large" />}
            persistor={persistor}>
            {connectStatus ? <NavigationRouter /> : <Connection />}
          </PersistGate>
        </SafeAreaProvider>
      </SplitProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

export default ENABLE_STORYBOOK ? StorybookUIRoot : App;
