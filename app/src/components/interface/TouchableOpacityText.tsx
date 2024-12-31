import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import typographyStyles from '../../constants/typography';
import colors from '../../constants/colors';
import {StyleProp} from 'react-native';

type Props = {
  style?: StyleProp<any>;
  children?: React.ReactNode;
  onPress?: () => void;
};

const TouchableOpacityText: React.FC<Props> = props => {
  return (
    <TouchableOpacity {...props}>
      <Text style={styles.text}>{props.children}</Text>
    </TouchableOpacity>
  );
};

export default TouchableOpacityText;

const styles = StyleSheet.create({
  text: {
    ...typographyStyles.text,
    color: colors.white,
  },
});
