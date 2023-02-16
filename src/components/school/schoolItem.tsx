import {Icon, ListItem, Text} from '@rneui/themed';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {School} from '../../types/school';
import Avatar from '../avatar';

export type SchoolItemProps = {
  school: School;
  onPress?: () => void;
};

export const SchoolItem = memo(({school, onPress}: SchoolItemProps) => (
  <ListItem
    Component={TouchableOpacity}
    onPress={onPress}
    style={styles.itemContainer}>
    <Avatar
      name={school.name}
      textColor={'#fff'}
      backgroundColor={school.color_icon}
      size="medium"
      rounded
    />
    <ListItem.Content style={styles.itemContent}>
      <ListItem.Title style={styles.title}>{school.name}</ListItem.Title>
      <View style={styles.subtitleContainer}>
        <Icon name="map-pin" type="feather" />
        <View style={styles.textContainer}>
          {school.address && <Text>{school.address}</Text>}
          <Text>
            {school.city}, {school.state} {school.zip}
          </Text>
        </View>
      </View>
    </ListItem.Content>
  </ListItem>
));

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 10,
    flex: 1,
  },
  itemContent: {
    flex: 1,
    padding: 10,
  },
  title: {
    marginBottom: 10,
  },
  subtitleContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
});
