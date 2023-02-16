import {
  Dimensions,
  ImageStyle,
  PixelRatio,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const IS_SMALL = WIDTH < 576;
const IS_MEDIUM = WIDTH >= 576 && WIDTH < 768;
const IS_LARGE = WIDTH >= 992;
const IS_PORTRAIT = WIDTH < HEIGHT;
const IS_LANDSCAPE = WIDTH >= HEIGHT;

const BREAKPOINTS = {
  IS_SMALL,
  IS_MEDIUM,
  IS_LARGE,
};

const widthPercentageToDP = (widthPercent: any) => {
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((WIDTH * elemWidth) / 100);
};
const heightPercentageToDP = (heightPercent: any) => {
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((HEIGHT * elemHeight) / 100);
};

type AllStyleProp = ViewStyle | TextStyle | ImageStyle;

/**
 * Given a mapping, returns object appropriate for device screen size
 * @param values Contains the style values for each device screen size
 * @returns a style that matches the screen size
 */
function selectStyle(values: {
  small?: AllStyleProp;
  medium?: AllStyleProp;
  large?: AllStyleProp;
  default: AllStyleProp;
}) {
  if (IS_SMALL && values.small) {
    return values.small;
  }

  if (IS_MEDIUM && values.medium) {
    return values.medium;
  }

  if (IS_LARGE && values.large) {
    return values.large;
  }

  return values.default || {};
}

export {
  BREAKPOINTS,
  heightPercentageToDP as HP,
  IS_LANDSCAPE,
  IS_PORTRAIT,
  RFValue as RF,
  selectStyle,
  widthPercentageToDP as WP,
};
