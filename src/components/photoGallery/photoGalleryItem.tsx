import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import ImageModal from 'react-native-image-modal';

import {HP, WP} from '@/src/theme/responsive';
import {Image} from '@/src/types/Image';

import Card from '../card';

export type PhotoGalleryItemProps = {
  photo: Image;
  onPress?: () => void;
};

export const PhotoGalleryItem = ({photo}: PhotoGalleryItemProps) => (
  <>
    <TouchableOpacity>
      <Card containerStyle={styles.item}>
        <ImageModal
          source={{uri: photo.url}}
          resizeMode="cover"
          style={styles.itemContainer}
        />
      </Card>
    </TouchableOpacity>
  </>
);

const styles = StyleSheet.create({
  item: {
    padding: 0,
    margin: 0,
    borderWidth: 0,
  },
  itemContainer: {
    width: WP(100) / 3,
    height: HP(100) / 6,
  },
});
