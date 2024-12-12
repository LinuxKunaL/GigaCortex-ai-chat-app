import {TextInput, StyleSheet, KeyboardTypeOptions} from 'react-native';
import React from 'react';
import colors from '../../constants/colors';
import spaces from '../../constants/spaces';
import fonts from '../../constants/fonts';
import sizes from '../../constants/sizes';

type Props = {
  placeholder?: string;
  onChangeText?: (parm: any) => void;
  onBlur?: (parm: any) => void;
  keyboardType?: KeyboardTypeOptions;
  value?: string;
  defaultValue?: string;
  isPassword?: boolean;
};

const Input: React.FC<Props> = props => {
  return (
    <TextInput
      {...props}
      style={styles.inputStyle}
      placeholderTextColor={colors.gray500}
      cursorColor={colors.sulu}
      secureTextEntry={props.isPassword}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  inputStyle: {
    borderColor: colors.gray500,
    borderWidth: 1.4,
    width: '100%',
    height: 'auto',
    borderRadius: spaces.radius,
    fontSize:sizes.sm,
    color: colors.white,
    paddingLeft: 10,
    fontFamily: fonts.RubikRegular,
  },
});
