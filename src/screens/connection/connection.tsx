import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Image from '@/src/components/image';
import Text from '@/src/components/text';
import colors from '@/src/styles/colors';
import {GST} from '@/src/theme/globalStyles';

const Connection = () => {
  return (
    <SafeAreaView style={GST.FLEX}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/not_connected.png')}
          style={styles.connectImg}
        />
        <Text style={styles.txtConnect}>Not connected to internet</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectImg: {
    width: 200,
    height: 180,
    tintColor: colors.primary,
  },
  txtConnect: {
    fontWeight: '700',
    fontSize: 18,
    marginTop: 40,
    color: colors.primary,
  },
});

export default Connection;
