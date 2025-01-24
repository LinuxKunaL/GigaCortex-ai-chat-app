import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import typographyStyles from '../../constants/typography';
import colors from '../../constants/colors';
import strings from '../../utils/strings';
import Icon from '../interface/Icon';
import spaces from '../../constants/spaces';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/redux';

const TitleBar: React.FC = () => {
  const me = useSelector((state: RootState) => state.me);
  return (
    <View style={styles.container}>
      <Text style={[typographyStyles.h2, {color: colors.white}]}>
        {strings.app_name}
      </Text>
      <View style={styles.creditView}>
        <Text style={[typographyStyles.subtitle, {color: colors.white}]}>
          {me.credits?.balance}
        </Text>
        <Icon color={colors.sulu} size={18} name="creation" />
      </View>
    </View>
  );
};

export default TitleBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    paddingLeft: spaces.padding,
    paddingRight: spaces.padding,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  creditView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: colors.gray,
    borderRadius: spaces.radius,
    borderWidth: 0.6,
    borderColor: colors.gray500,
  },
});
