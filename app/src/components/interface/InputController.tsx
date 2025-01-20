import {KeyboardTypeOptions, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Control, Controller} from 'react-hook-form';
import Input from './Input';
import typographyStyles from '../../constants/typography';
import colors from '../../constants/colors';
import Icon from './Icon';

type Props = {
  control: Control;
  name: string;
  requiredMessage?: string;
  pattern: RegExp;
  invalidMassage: string;
  errors: any;

  isPassword?: boolean;
  placeholder?: string;
  onChangeText?: (parm: any) => void;
  onBlur?: (parm: any) => void;
  keyboardType?: KeyboardTypeOptions;
  value?: string;
  defaultValue?: string;
};

const InputController: React.FC<Props> = props => {
  const [isPassword, setIsPassword] = useState(props.isPassword);
  return (
    <Controller
      control={props.control}
      name={props.name}
      rules={{
        required: props.requiredMessage,
        pattern: {
          value: props?.pattern,
          message: props?.invalidMassage,
        },
      }}
      render={({field: {onChange, onBlur, value}}) => (
        <View>
          <View style={styles.inputStyle}>
            <Input
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={props.placeholder}
              defaultValue={props.defaultValue}
              isPassword={isPassword}
            />
            {props.isPassword && (
              <Icon
                style={styles.iconStyle}
                onPress={() => setIsPassword(!isPassword)}
                name="eye"
                color={colors.sulu}
                size={18}
              />
            )}
          </View>
          {props.errors?.[props.name] && (
            <Text style={[typographyStyles.subtitle, styles.errorMessage]}>
              {props.errors[props.name]?.message as string}
            </Text>
          )}
        </View>
      )}
    />
  );
};

export default InputController;

const styles = StyleSheet.create({
  errorMessage: {color: colors.red, textAlign: 'left', width: '100%'},
  inputStyle: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    position: 'absolute',
    right: 15,
    top: 14,
  },
});
