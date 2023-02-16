import {Text} from '@rneui/themed';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

import {SectionHeader} from '@/src/types/school';

interface SchoolDividerProps {
  header: SectionHeader;
}

export const SchoolDivider = memo(({header}: SchoolDividerProps) => (
  <View style={styles.sectionWrapper}>
    <View style={styles.leftLine} />
    <View style={styles.charWrapper}>
      <Text style={styles.character}>{header.name}</Text>
    </View>
    <View style={styles.rightLine} />
  </View>
));

const styles = StyleSheet.create({
  sectionWrapper: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  charWrapper: {
    height: 40,
    width: 40,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
  },
  character: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  leftLine: {
    width: 20,
    height: 30,
    backgroundColor: '#f1f1f1',
  },
  rightLine: {
    flex: 1,
    height: 30,
    backgroundColor: '#f1f1f1',
  },
});
