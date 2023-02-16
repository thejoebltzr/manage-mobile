import React from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';

import {Colors, Typography} from '@/src/styles';
import {RosterMember} from '@/src/types/roster';

import BasicCard from '../card/basicCard';
import Text from '../text';
import RosterItem from './rosterItem';

export interface RosterListProps {
  data: Array<RosterMember>;
  hasHeader?: boolean;
  headerStyle?: ViewStyle;
  headerTitleStyle?: TextStyle;
}

export const RosterList = ({
  data,
  hasHeader,
  headerStyle,
  headerTitleStyle,
}: RosterListProps) => {
  const titleStyle = [styles.title, headerTitleStyle];

  return (
    <View style={styles.container}>
      {hasHeader && (
        <View style={[styles.header, headerStyle]}>
          <View style={styles.idWrapper}>
            <Text style={titleStyle}>#</Text>
          </View>
          <View style={styles.nameWrapper}>
            <Text style={titleStyle}>Name</Text>
          </View>
          <View>
            <Text style={titleStyle}>Position</Text>
          </View>
        </View>
      )}
      {!data.length ? (
        <BasicCard errorText={'No Rosters Found'} />
      ) : (
        data.map((member: RosterMember, index: number) => (
          <RosterItem member={member} key={index} />
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    backgroundColor: Colors.secondary,
  },
  title: {
    ...Typography.title,
  },
  idWrapper: {
    width: 30,
  },
  nameWrapper: {
    flexGrow: 1,
  },
});
