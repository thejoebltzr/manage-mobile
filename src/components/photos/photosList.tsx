import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {BREAKPOINTS} from '@/src/theme/responsive';
import {DrawerProps, ScreenNames} from '@/src/types/navigation';
import {Photo} from '@/src/types/photo';

import {PhotosItem} from './photosItem';

export type PhotosListProps = {
  data: Array<Photo>;
  onItemPress?: (id?: number) => void;
};

export const PhotosList = ({
  data,
  onItemPress: onItemPressParam,
}: PhotosListProps) => {
  const navigation = useNavigation<DrawerProps>();
  const onItemPress = useCallback(
    (id?: number) => {
      if (onItemPressParam && id) {
        onItemPressParam(id);
      } else {
        navigation.navigate(ScreenNames.PhotoGallery, {teamId: id});
      }
    },
    [navigation, onItemPressParam],
  );

  const renderItem = useCallback(
    ({item}: {item: Photo}) => (
      <PhotosItem
        photoResult={item}
        onPress={() => onItemPress(item.team_id)}
      />
    ),
    [onItemPress],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        numColumns={BREAKPOINTS.IS_LARGE ? 2 : 1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 18,
  },
});
