import {ViewStyle} from 'react-native';
import IconView from 'react-native-vector-icons/MaterialCommunityIcons';

import React from 'react';

type Props = {
  name: string;
  size?: number;
  color?: string;
  style?: ViewStyle;
  onPress?: () => void;
};

const Icon: React.FC<Props> = props => {
  return <IconView style={props.style} onPress={props.onPress}  name={props.name} size={props.size} color={props.color} />;
};

export default Icon;
