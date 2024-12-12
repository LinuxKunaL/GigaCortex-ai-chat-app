import {KeyboardTypeOptions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Control, Controller} from 'react-hook-form';
import Input from './Input';
import typographyStyles from '../../constants/typography';
import colors from '../../constants/colors';
import Gap from './Gap';

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
          <Input
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            isPassword={props.isPassword}
          />
          <Gap height={5} />
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
});
