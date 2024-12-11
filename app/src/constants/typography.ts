import {Dimensions, StyleSheet} from 'react-native';
import fonts from './fonts.ts';

const {width} = Dimensions.get('window');
const scaleFactor = width / 375;

const typographyStyles = StyleSheet.create({
  h1: {
    fontSize: 24 * scaleFactor,
    fontFamily: fonts.RubikMedium,
    includeFontPadding: false,
  },
  h2: {
    fontSize: 20 * scaleFactor,
    fontFamily: fonts.RubikMedium,
    includeFontPadding: false,
  },
  title: {
    fontSize: 18 * scaleFactor,
    fontFamily: fonts.RubikMedium,
    includeFontPadding: false,
  },
  label: {
    fontSize: 15 * scaleFactor,
    fontFamily: fonts.RubikRegular,
    includeFontPadding: false,
  },
  subtitle: {
    fontSize: 14 * scaleFactor,
    fontFamily: fonts.RubikRegular,
    includeFontPadding: false,
  },
  text: {
    fontSize: 12 * scaleFactor,
    fontFamily: fonts.RubikRegular,
    includeFontPadding: false,
  },
});

export default typographyStyles;
