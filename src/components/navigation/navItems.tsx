import {useNavigation} from '@react-navigation/native';
import {Icon, ListItem} from '@rneui/themed';
import React, {cloneElement, useCallback} from 'react';
import {TouchableOpacity, View} from 'react-native';

import {DrawerProps} from '@/src/types/navigation';

import styles from './styles';

export type BackButtonProps = {
  color: string;
  onPress?: () => void;
};

export const BackButton = ({color, onPress: onPressParam}: BackButtonProps) => {
  const navigation = useNavigation<DrawerProps>();
  const onPress = useCallback(() => {
    if (onPressParam) {
      onPressParam();
    } else {
      navigation.goBack();
    }
  }, [navigation, onPressParam]);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.headerIconContainer}>
        <Icon
          name="arrow-left"
          type="feather"
          style={styles.navIcon}
          color={color}
        />
      </View>
    </TouchableOpacity>
  );
};

export const DrawerButton = ({color}: BackButtonProps) => {
  const navigation = useNavigation<DrawerProps>();
  return (
    <TouchableOpacity onPress={navigation.toggleDrawer}>
      <View style={styles.headerIconContainer}>
        <Icon name="menu" type="feather" style={styles.navIcon} color={color} />
      </View>
    </TouchableOpacity>
  );
};

export type DrawerItemProps = {
  title: string;
  icon?: JSX.Element;
  iconName?: string;
  onPress?: () => void;
};

export const DrawerItem = ({
  title,
  icon,
  iconName,
  onPress,
}: DrawerItemProps) => {
  let clonedIcon = icon;

  // clone the icon to apply the styling
  if (clonedIcon) {
    clonedIcon = cloneElement(clonedIcon, {
      style: styles.navIcon,
    });
  }

  return (
    <ListItem
      Component={TouchableOpacity}
      onPress={onPress}
      containerStyle={styles.sideBarItemContainer}>
      {!!iconName && <Icon name={iconName} style={styles.navIcon} />}
      {clonedIcon}
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};
