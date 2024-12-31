import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Fragment} from 'react';
import {ScrollView} from 'react-native';
import globalStyles from '../../styles/style';
import Input from '../../components/interface/Input';
import Gap from '../../components/interface/Gap';
import sizes from '../../constants/sizes';
import typographyStyles from '../../constants/typography';
import colors from '../../constants/colors';
import spaces from '../../constants/spaces';
import fonts from '../../constants/fonts';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import Icon from '../../components/interface/Icon';
import Button from '../../components/interface/Button';
type Props = {};
type TData = {
  id: number;
  title: string;
  subtitle: string;
  time: string;
};
const History: React.FC<Props> = props => {
  const data: TData[] = [
    {
      id: 1,
      title: 'Mastering JavaScript Logic',
      subtitle: 'Understanding the fundamentals of coding.',
      time: '3:45 PM',
    },
    {
      id: 2,
      title: 'Mastering JavaScript Logic',
      subtitle: 'Understanding the fundamentals of coding.',
      time: '3:45 PM',
    },
    {
      id: 3,
      title: 'Mastering JavaScript Logic',
      subtitle: 'Understanding the fundamentals of coding.',
      time: '3:45 PM',
    },
  ];

  const renderRightActions = () => {
    return (
      <Fragment>
        <Button
          variant="secondary"
          fontSize="xs"
          size="lg"
          style={[
            styles.listDeleteButton,
            {
              backgroundColor: colors.red,
            },
          ]}>
          <Icon color={colors.white} name="delete" size={19} />
        </Button>
        <Button
          variant="secondary"
          fontSize="xs"
          size="lg"
          style={[
            styles.listDeleteButton,
            {
              backgroundColor: colors.blue,
            },
          ]}>
          <Icon color={colors.white} name="pin" size={19} />
        </Button>
      </Fragment>
    );
  };

  const renderItem = (i: any) => {
    const {item} = i;
    return (
      <Swipeable renderRightActions={() => renderRightActions()}>
        <TouchableOpacity activeOpacity={0.8} style={styles.listItem}>
          <View style={styles.listItemInnerView}>
            <Text
              style={[
                typographyStyles.label,
                {color: colors.white, fontFamily: fonts.RubikMedium},
              ]}>
              {item.title}
            </Text>
            <Text style={[typographyStyles.label, styles.listItemTimeText]}>
              {item.time}
            </Text>
          </View>
          <Gap height={5} />
          <Text style={[typographyStyles.subtitle, {color: colors.gray300}]}>
            {item.subtitle}
          </Text>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.layout}>
        <Gap height={sizes.xs} />
        <Input placeholder="Search By Title" />
        <Gap height={sizes.xs} />
        <View>
          <Text style={[typographyStyles.title, {color: colors.sulu}]}>
            Today
          </Text>
          <Gap height={sizes.xs} />
          <GestureHandlerRootView style={{...globalStyles.debugBorder}}>
            <FlatList
              data={data}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
              ItemSeparatorComponent={ItemSeparator}
            />
          </GestureHandlerRootView>
        </View>
      </View>
    </View>
  );
};

const ItemSeparator = () => <Gap height={sizes.xs} />;
const styles = StyleSheet.create({
  layout: {width: '100%', height: '100%'},
  listItem: {
    width: '100%',
    backgroundColor: colors.gray,
    borderRadius: spaces.radius,
    borderWidth: 0.6,
    borderColor: colors.gray500,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  listItemInnerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  listItemTimeText: {
    color: colors.gray300,
    fontFamily: fonts.RubikMedium,
    fontSize: sizes.xs,
  },
  listDeleteButton: {
    borderWidth: 0,
    marginLeft: 12,
    width: 'auto',
    borderRadius: spaces.radius,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default History;
