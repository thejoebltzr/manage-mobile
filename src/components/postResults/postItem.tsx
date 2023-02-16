import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {PostResult} from '@/src/types/PostResult';

import Card from '../card';
import Icon from '../icon';
import Text from '../text';

export type PostItemProps = {
  postResult: PostResult;
  onPress?: () => void;
};

export const PostItem = ({postResult, onPress}: PostItemProps) => (
  <TouchableOpacity onPress={onPress}>
    <Card containerStyle={styles.cardWrapper}>
      <View style={[styles.rowWrapper, styles.cardHeader]}>
        <View style={styles.rowWrapper}>
          <View>
            <Icon
              name="calendar"
              type="font-awesome"
              size={16}
              color={'#59C3AE'}
            />
          </View>

          <View style={styles.statusContainer}>
            <Text style={styles.statusTxt}>{postResult.date}</Text>
          </View>
        </View>
        <View style={styles.rowWrapper}>
          <View>
            <Icon
              name="calendar"
              type="font-awesome"
              size={16}
              color={'#59C3AE'}
            />
          </View>

          <View style={styles.statusContainer}>
            <Text style={styles.statusTxt}>{postResult.time}</Text>
          </View>
        </View>

        <View style={styles.rowWrapper}>
          <View>
            <Icon
              name="calendar"
              type="font-awesome"
              size={16}
              color={'#59C3AE'}
            />
          </View>

          <View style={styles.statusContainer}>
            <Text style={styles.statusTxt}>{postResult.status}</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.resultTitle}>{postResult.title}</Text>
      </View>

      <View style={[styles.rowWrapper, styles.cardFooter]}>
        <View style={styles.rowWrapper}>
          <View>
            <Icon
              name="map-pin"
              type="font-awesome"
              color={'#59C3AE'}
              size={24}
            />
          </View>

          <View style={styles.statusContainer}>
            <Text style={styles.schoolName}>{postResult.school}</Text>
          </View>
        </View>

        <View style={styles.rowWrapper}>
          <Icon name="trophy" type="font-awesome" size={24} color="#8C8D8E" />
        </View>
      </View>
    </Card>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    margin: 8,
  },
  cardWrapper: {
    padding: 0,
  },
  cardHeader: {
    padding: 16,
  },
  cardFooter: {
    backgroundColor: '#D2D2D2',
    padding: 16,
  },
  statusTxt: {
    fontWeight: '700',
  },
  statusContainer: {
    marginHorizontal: 8,
    justifyContent: 'center',
  },
  schoolName: {
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultTitle: {
    fontWeight: '700',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});
