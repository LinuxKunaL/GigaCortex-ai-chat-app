import {StyleSheet, View} from 'react-native';
import React from 'react';
import colors from '../../constants/colors';

type Props = {
  color?: string;
  width?: number;
  height?: number;
};

const HorizontalLine: React.FC<Props> = props => {
  return (
    <View
      style={[
        styles.lineView,
        {
          width: props.width,
          height: props.height,
        },
      ]}
    />
  );
};

export default HorizontalLine;

const styles = StyleSheet.create({
  lineView: {backgroundColor: colors.gray300, opacity: 0.6, borderRadius: 10},
});
