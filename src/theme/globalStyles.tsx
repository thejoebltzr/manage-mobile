import {StyleSheet} from 'react-native';

import {COLORS} from './colors';
import {RF} from './responsive';
import {SIZING} from './sizing';
import {SPACING} from './spacing';

const {BLACK, RED, TW_GRAY, TW_GRAY_LIGHT, WHITE, BRIGHT_BLUE} = COLORS;

export const GST = StyleSheet.create({
  ...SPACING,
  ...SIZING,
  FLEX: {
    flex: 1,
  },
  FLEX_ROW: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  SHADOW: {
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  SHADOW_LIGHT: {
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  HITSLOP: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
  ERROR: {
    marginTop: RF(2),
    fontSize: RF(10),
    color: RED,
  },
  HEADER_CONTAINER: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...SPACING.p3,
  },
  MAIN_CONTAINER: {
    flex: 1,
    backgroundColor: WHITE,
  },
  DIVIDER: {
    height: RF(10),
    backgroundColor: TW_GRAY_LIGHT,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: TW_GRAY,
  },
  ITEM_SEPARATOR: {
    height: 1,
    backgroundColor: TW_GRAY,
  },
  SHEET_HANDLE: {
    backgroundColor: BRIGHT_BLUE,
    height: RF(3),
    width: RF(60),
    ...SPACING.mt1,
  },
  HEADER_TITLE: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.WHITE,
  },
  BORDERED: {
    borderColor: '#D9D9D9',
    borderWidth: 1,
  },
});
