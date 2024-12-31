import {StyleSheet, Vibration, ViewStyle, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../constants/colors';
import spaces from '../../constants/spaces';

type Props = {
  style?: ViewStyle;
  onPress?: (prams?: any) => void;
  onLongPress?: (prams?: any) => void;
  variant: 'primary' | 'secondary' | 'tertiary' | 'transparent';
  size: 'xs' | 'sm' | 'md' | 'lg';
  name: string;
  color?: string;
  fill?: boolean;
  iconSize?: number;
};

const IconButton: React.FC<Props> = ({
  style,
  name,
  fill = false,
  color,
  onPress,
  variant,
  iconSize,
  size = 'sm',
  onLongPress,
}) => {
  const handlePress = (): void => {
    Vibration.vibrate(100);
    if (onPress) {
      onPress();
    }
  };

  const handleLongPress = (): void => {
    Vibration.vibrate(100);
    if (onLongPress) {
      onLongPress();
    }
  };

  const variantStyle = {
    primary: {
      backgroundColor: colors.sulu,
    },
    secondary: {
      backgroundColor: colors.gray,
    },
    tertiary: {
      backgroundColor: colors.suluDark,
      borderColor: colors.sulu,
      borderWidth: 1,
    },
    transparent: {
      backgroundColor: 'transparent',
    },
  };

  const sizeStyle = {
    xs: {
      padding: 2,
      width: 26,
      height: 26,
    },

    sm: {
      padding: 4,
      width: 33,
      height: 33,
    },
    md: {
      padding: 6,
      width: 40,
      height: 40,
    },
    lg: {
      padding: 9,
      width: 47,
      height: 47,
    },
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      onLongPress={handleLongPress}
      style={[styles.button, variantStyle[variant], sizeStyle[size], style]}>
      <MaterialCommunityIcons
        name={`${name}${fill ? '-outline' : ''}`}
        size={iconSize}
        color={color}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.sulu,
    borderRadius: spaces.radius,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.gray500,
    borderWidth: 0.5,
  },
});

export default IconButton;
