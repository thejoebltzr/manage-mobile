import React from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';

import {Image} from '@/src/types/Image';

import BasicCard from '../card/basicCard';
import {PhotoGalleryItem} from './photoGalleryItem';

export type PhotoGalleryListProps = {
  data: Array<Image>;
  fetching?: boolean;
  onRefresh?: () => void;
};

const renderItem = ({item}: {item: Image}) => <PhotoGalleryItem photo={item} />;

export const PhotoGalleryList = ({
  data,
  fetching = false,
  onRefresh,
}: PhotoGalleryListProps) => {
  return (
    <FlatList
      data={data}
      numColumns={3}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl refreshing={fetching} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        <View style={styles.container}>
          <BasicCard errorText={'No Photos Found'} />
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
  },
});
