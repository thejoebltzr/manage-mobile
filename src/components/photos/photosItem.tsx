import {ListItem} from '@rneui/themed';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {COLORS} from '@/src/theme/colors';
import {GST} from '@/src/theme/globalStyles';
import {selectStyle} from '@/src/theme/responsive';
import {Photo} from '@/src/types/photo';

import Avatar from '../avatar';

export type PhotosItemProps = {
  photoResult: Photo;
  onPress?: () => void;
};

export const PhotosItem = ({photoResult, onPress}: PhotosItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={selectStyle({
      large: lgStyle.itemContainer,
      default: styles.itemContainer,
    })}>
    <ListItem bottomDivider>
      <Avatar
        name={photoResult.initial}
        backgroundColor={COLORS.BLACK}
        textColor={COLORS.WHITE}
        size="medium"
        rounded
      />
      <ListItem.Content>
        <View style={styles.centerAlign}>
          <ListItem.Title style={styles.title}>
            {photoResult.title}
          </ListItem.Title>
        </View>
      </ListItem.Content>
    </ListItem>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
  },
  title: {
    ...GST.HEADER_TITLE,
    ...GST.ml4,
    color: COLORS.BLACK,
  },
  centerAlign: {
    justifyContent: 'center',
  },
});

const lgStyle = StyleSheet.create({
  itemContainer: {
    flex: 1 / 2,
    ...GST.m1,
    ...GST.BORDERED,
  },
});
