import {Animated, Easing, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import typography from '../constants/typography';
import defaultProps from '../types/props';
import globalStyles from '../styles/style';
import Logo from '../assets/svg/Logo';
import colors from '../constants/colors';
import WebPattern from '../assets/svg/WebPattern';
import useAuth from '../hooks/useAuth';

type Props = defaultProps & {};

const Splash: React.FC<Props> = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.6)).current;
  const {isAuthenticated} = useAuth();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.bezier(0.985, 0.0, 0.51, 0.69),
      useNativeDriver: true,
    }).start();
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.bezier(0.985, 0.0, 0.51, 0.69),
      useNativeDriver: true,
    }).start();
    const nativeTimeout = setTimeout(() => {
      isAuthenticated().then(result => {
        if (result) {
          props.navigation.navigate('home');
        }
        if (!result) {
          props.navigation.navigate('intro');
        }
      });
    }, 3000);
    return () => {
      clearTimeout(nativeTimeout);
    };
  }, [fadeAnim, scaleAnim, props.navigation, isAuthenticated]);

  return (
    <View style={globalStyles.container}>
      <View style={styles.layout}>
        <View style={styles.layoutLogo}>
          <Animated.View
            style={{opacity: fadeAnim, transform: [{scale: scaleAnim}]}}>
            <Logo height={120} width={120} />
          </Animated.View>
          <Animated.Text style={[{opacity: fadeAnim}, styles.animatedTextView]}>
            <Text style={[typography.h1, {color: colors.white}]}>Giga</Text>
            <Text style={[typography.h1, {color: colors.sulu}]}>Cortex</Text>
          </Animated.Text>
        </View>
        <Animated.View style={[{opacity: fadeAnim}, styles.animatedWebPatten]}>
          <WebPattern />
        </Animated.View>
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  layoutLogo: {
    position: 'relative',
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  animatedTextView: {flexDirection: 'row'},
  animatedWebPatten: {
    position: 'absolute',
    zIndex: 1,
  },
});
