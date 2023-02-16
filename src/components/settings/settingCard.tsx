import React, {cloneElement, ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Button from '@/src/components/button';
import Card from '@/src/components/card';
import {COLORS} from '@/src/theme/colors';
import {GST} from '@/src/theme/globalStyles';
import {selectStyle} from '@/src/theme/responsive';

import Text from '../text';

interface SettingCardProps {
  title: string;
  buttonText?: string;
  iconName?: string;
  icon?: JSX.Element;
  children?: ReactNode;
  onButtonPress?: () => void;
}

export const SettingCard = ({
  title,
  icon,
  iconName,
  buttonText,
  children,
  onButtonPress,
}: SettingCardProps) => {
  let clonedIcon = icon;

  // clone the icon to apply the styling
  if (clonedIcon) {
    clonedIcon = cloneElement(clonedIcon, {
      style: styles.titleIcon,
      size: 20,
    });
  }
  return (
    <Card
      containerStyle={selectStyle({
        large: lgStyles.cardContainer,
        default: styles.cardContainer,
      })}>
      <View style={styles.titleWrapper}>
        {!!iconName && (
          <Icon name={iconName} size={20} style={styles.titleIcon} />
        )}
        {clonedIcon}
        <Text style={styles.title}>{title}</Text>
      </View>
      <Card.Divider />
      <View style={styles.contentWrapper}>
        {children}
        {!!buttonText && (
          <Button onPress={onButtonPress} style={GST.mt2} type="outline">
            {buttonText}
          </Button>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    ...GST.p0,
  },
  titleWrapper: {
    ...GST.p3,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
  },
  titleIcon: {
    ...GST.mr2,
    color: COLORS.WHITE,
  },
  title: {
    ...GST.HEADER_TITLE,
    color: COLORS.WHITE,
    textAlign: 'left',
  },
  contentWrapper: {
    ...GST.p2,
    marginVertical: 10,
  },
});

const lgStyles = StyleSheet.create({
  cardContainer: {
    ...GST.p0,
    width: '47%',
  },
});
