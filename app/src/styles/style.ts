import {StyleSheet} from 'react-native';
import colors from '../constants/colors';
import spaces from '../constants/spaces';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: spaces.padding,
    paddingRight: spaces.padding,
    height: '100%',
    width: '100%',
  },
  layoutPadding: {
    paddingLeft: spaces.padding,
    paddingRight: spaces.padding,
  },
  debugBorder: {
    borderColor: colors.red,
    borderWidth: 1,
  },
  bottomSheetContainer: {
    borderWidth: 0.5,
    borderBottomWidth:0,
    borderTopColor: colors.gray500,
    borderLeftColor: colors.gray500,
    borderRightColor: colors.gray500,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.dark,
    padding: spaces.padding,
  },
  border: {
    borderRadius: spaces.radius,
    borderWidth: 0.5,
    borderColor: colors.gray500,
  },
});

export default globalStyles;
