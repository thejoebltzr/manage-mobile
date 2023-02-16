import React, {memo} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import {Colors, Typography} from '@/src/styles';
import {RosterMember} from '@/src/types/Roster';

import Text from '../text';

interface RosterItemProps {
  member: RosterMember;
  style?: ViewStyle;
}

const RosterItem = memo(({member, style}: RosterItemProps) => (
  <View style={[styles.header, style]}>
    <View style={styles.idWrapper}>
      <Text style={styles.title}>{member.jersey || 'n/a'}</Text>
    </View>
    <View style={styles.nameWrapper}>
      <Text style={styles.title}>
        {member.name || `${member.first_name} ${member.last_name}`}
      </Text>
    </View>
    <View>
      <Text style={styles.title}>{member.position || 'n/a'} </Text>
    </View>
  </View>
));

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    backgroundColor: Colors.background,
  },
  title: {
    ...Typography.title,
    fontWeight: '400',
    color: Colors.foreground,
  },
  idWrapper: {
    width: 30,
  },
  nameWrapper: {
    flexGrow: 1,
  },
});

export default RosterItem;
