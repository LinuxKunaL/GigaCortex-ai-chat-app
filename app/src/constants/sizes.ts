import {Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');

const scale = width / 290;

const sizes = {
  xs: 10 * scale,
  sm: 12 * scale,
  md: 14 * scale,
  lg: 16 * scale,
  xl: 18 * scale,
  xxl: 20 * scale,
  xxxl: 24 * scale,
};

export default sizes;
