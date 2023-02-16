import {Icon} from '@rneui/themed';
import React, {ReactNode, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useAppSelector} from '@/src/hooks/store';
import {RootState} from '@/src/store';
import {Typography} from '@/src/styles';
import {COLORS} from '@/src/theme/colors';

import Text from '../text';
import TextInput from '../textInput';
import {DrawerButton} from './navItems';
import styles from './styles';

export interface SearchNavHeaderProps {
  leftButton: JSX.Element;
  children: ReactNode;
  onSearch: (q: string) => void;
}

export const SearchNavHeader = ({
  leftButton,
  children,
  onSearch,
}: SearchNavHeaderProps) => {
  const [isSearchShown, setIsSearchShown] = useState(false);
  const insets = useSafeAreaInsets();
  const mainWrapper = {
    paddingTop: insets.top,
    marginBottom: 10,
  };

  return (
    <View style={[headerStyles.mainWrapper, mainWrapper]}>
      <View style={headerStyles.headerWrapper}>
        <View>{leftButton}</View>
        <View style={headerStyles.childrenWrapper}>{children}</View>
        <View>
          <TouchableOpacity
            onPress={() => setIsSearchShown(!isSearchShown)}
            testID="search-button">
            <View style={styles.headerIconContainer}>
              <Icon
                name="search"
                type="feather"
                style={styles.navIcon}
                color={COLORS.WHITE}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {isSearchShown && (
        <View style={headerStyles.inputWrapper}>
          <Icon name="search" type="feather" style={styles.navIcon} />
          <View style={headerStyles.textInputWrapper}>
            <TextInput onChangeText={onSearch} testID="search-input" />
          </View>
        </View>
      )}
    </View>
  );
};

export interface StackNavHeaderProps {
  title?: string;
  leftButton: JSX.Element;
  children?: ReactNode;
}

export const StackNavHeader = ({
  title,
  leftButton,
  children,
}: StackNavHeaderProps) => {
  const insets = useSafeAreaInsets();
  const mainWrapper = {
    paddingTop: insets.top,
  };
  return (
    <View style={[headerStyles.mainWrapper, mainWrapper]}>
      <View style={[headerStyles.headerWrapper]}>
        <View>{leftButton}</View>
        <View style={headerStyles.titleWrapper}>
          <Text style={headerStyles.headerTitle}>{title}</Text>
        </View>
        <View style={headerStyles.stackChildren}>{children}</View>
      </View>
    </View>
  );
};

export interface DrawerNavHeaderProps {
  title?: string;
  children?: ReactNode;
}

export const DrawerNavHeader = ({title, children}: DrawerNavHeaderProps) => {
  const {currentSchool} = useAppSelector((state: RootState) => {
    return state.schools;
  });
  const insets = useSafeAreaInsets();
  const mainWrapper = {
    paddingTop: insets.top,
  };
  return (
    <View style={[headerStyles.mainWrapper, mainWrapper]}>
      <View style={headerStyles.headerWrapper}>
        <View>
          <DrawerButton color={COLORS.WHITE} />
        </View>
        <View style={headerStyles.titleWrapper}>
          <Text style={headerStyles.headerTitle}>
            {`${currentSchool?.name || ''} | ${title}`}
          </Text>
        </View>
        <View style={headerStyles.stackChildren}>{children}</View>
      </View>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  mainWrapper: {
    padding: 0,
    margin: 0,
    shadowColor: COLORS.WHITE,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.1,
    elevation: 2,
    backgroundColor: COLORS.PRIMARY,
  },
  headerWrapper: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  childrenWrapper: {
    width: '50%',
  },
  stackChildren: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  inputWrapper: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: COLORS.WHITE,
  },
  textInputWrapper: {
    flex: 1,
    marginRight: 5,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    ...Typography.title,
    marginRight: 10,
  },
});
