import NetInfo from '@react-native-community/netinfo';

export const checkConnected = async () => {
  return await NetInfo.fetch().then(state => {
    return state.isConnected;
  });
};
