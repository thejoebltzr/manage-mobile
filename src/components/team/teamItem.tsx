import {ListItem} from '@rneui/themed';
import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {Team} from '@/src/types/team';

interface TeamItemProps {
  team: Team;
  isSelected?: boolean;
  onPress?: (team: Team) => void;
}

export const TeamItem = memo(({team, onPress, isSelected}: TeamItemProps) => (
  <ListItem
    Component={TouchableOpacity}
    bottomDivider
    onPress={() => onPress?.(team)}>
    <ListItem.Content style={styles.listContent}>
      <ListItem.Title style={styles.listTitle}>
        {team.sport_gender_level}
      </ListItem.Title>
      <ListItem.Subtitle style={styles.listSubtitle}>
        {team.year}
      </ListItem.Subtitle>
    </ListItem.Content>
    <ListItem.CheckBox checked={!!isSelected} />
  </ListItem>
));

const styles = StyleSheet.create({
  listContent: {
    padding: 10,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  listSubtitle: {
    fontWeight: '600',
    color: '#7f7f7f',
  },
});
