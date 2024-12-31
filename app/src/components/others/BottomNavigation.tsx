import {Pressable, StyleSheet, Vibration, View, Text} from 'react-native';
import React from 'react';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

const BottomNavigation: React.FC<BottomTabBarProps> = props => {
  const routesName = props.state.routeNames;
  console.log(props);

  const activeTabIndex = props.state.index;

  const icons: any = {
    home: 'chat-processing-outline',
    history: 'history',
    profile: 'account-circle',
  };

  return (
    <View style={styles.container}>
      <View style={styles.barView}>
        {routesName.map((route, index) => (
          <Pressable
            key={index}
            style={[
              styles.tabView,
              {
                backgroundColor:
                  activeTabIndex === index ? colors.sulu : colors.transparent,
              },
            ]}
            onPress={() => {
              props.navigation.navigate(route);
              Vibration.vibrate(100);
            }}>
            <Icon
              name={icons[route.split('-')[0]]}
              size={26}
              color={activeTabIndex === index ? colors.dark : colors.white}
            />
            {activeTabIndex === index && (
              <Text style={styles.tabText}>{route.split('-')[0]}</Text>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  container: {
    elevation: 0,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderColor: colors.gray500,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barView: {
    flex: 1,
    borderColor: colors.gray500,
    backgroundColor: colors.gray,
    borderWidth: 0.7,
    borderRadius: 101,
    margin: 10,
    height: 65,
    padding: 10,
    gap: 10,
    flexDirection: 'row',
    position: 'relative',
  },
  tabView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    zIndex: 2,
    borderRadius: 100,
  },
  tabText: {
    fontFamily: fonts.RubikMedium,
    color: colors.dark,
    textTransform: 'capitalize',
  },
});
