import {StyleSheet} from 'react-native';

import {COLORS} from '@/src/theme/colors';

export default StyleSheet.create({
  navIcon: {
    fontSize: 24,
    padding: 12,
    color: COLORS.BLACK,
  },
  headerIconContainer: {
    alignItems: 'center',
  },
  sideBarItemContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: COLORS.TW_GRAY_HEAVY,
    borderBottomWidth: 0.3,
  },
});
