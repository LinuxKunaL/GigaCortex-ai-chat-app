import {
  Text,
  StyleSheet,
  Vibration,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import colors from '../../constants/colors';
import sizes from '../../constants/sizes';
import spaces from '../../constants/spaces';
import fonts from '../../constants/fonts';

type Props = {
  children: string | React.ReactNode | React.ReactNode[];
  style?: ViewStyle | ViewStyle[];
  onPress?: (prams?: any) => void;
  onLongPress?: (prams?: any) => void;
  variant: 'primary' | 'secondary' | 'tertiary';
  size: 'xs' | 'sm' | 'md' | 'lg';
  fontSize: 'xs' | 'sm' | 'md' | 'lg';
  disabled?: boolean;
};

const Button: React.FC<Props> = ({
  children,
  style,
  onPress,
  variant,
  onLongPress,
  size,
  fontSize,
  disabled,
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
      borderColor: 'transparent',
      borderWidth: 0.8,
      opacity: disabled ? 0.7 : 1,
    },
    secondary: {
      backgroundColor: colors.dark,
      borderColor: colors.sulu,
      borderWidth: 1.5,
      opacity: disabled ? 0.7 : 1,
    },
    tertiary: {
      backgroundColor: colors.suluDark,
      borderColor: colors.sulu,
      borderWidth: 0.8,
      opacity: disabled ? 0.7 : 1,
    },
  };

  const sizeStyle = {
    xs: {
      padding: 3,
    },
    sm: {
      padding: 4,
    },
    md: {
      padding: 7,
    },
    lg: {
      padding: 12,
    },
  };

  const fontStyle = {
    xs: {
      fontSize: sizes.xs,
    },
    sm: {
      fontSize: sizes.sm,
    },
    md: {
      fontSize: sizes.md,
    },
    lg: {
      fontSize: sizes.lg,
    },
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      onLongPress={handleLongPress}
      style={[styles.button, variantStyle[variant], sizeStyle[size], style]}
      disabled={disabled}>
      <Text style={[styles.buttonText, fontStyle[fontSize]]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.sulu,
    borderRadius: spaces.radius,
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.white,
    width: '100%',
  },
  buttonText: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: fonts.RubikSemibold,
    fontSize: sizes.sm,
    color: colors.gray,
    includeFontPadding: false,
  },
});

export default Button;
