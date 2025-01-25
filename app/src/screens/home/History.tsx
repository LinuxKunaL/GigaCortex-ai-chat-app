import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
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
import useChat from '../../hooks/useChat';
type Props = {};
type TConversationList = {
  _id: string;
  title: string;
  description: string;
  createAt: Date;
};

const History: React.FC<Props> = props => {
  const {getConversationsList} = useChat();
  const [conversationsList, setConversationsList] = useState<
    TConversationList[]
  >([]);

  useEffect(() => {
    getConversationsList().then(res => {
      setConversationsList(res.data);
    });
    return () => {};
  }, []);

  const handleOpenConversation = (id: string) => {
    console.log(id);
  };

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

  const renderItem = ({
    item,
    index,
  }: {
    item: TConversationList;
    index: number;
  }) => {
    const currentDate = new Date(item.createAt).toLocaleDateString();
    const previousDate =
      index > 0 &&
      new Date(conversationsList[index - 1]?.createAt).toLocaleDateString();

    const isShowDate = currentDate !== previousDate;
    const nowDate = new Date().toLocaleDateString();

    return (
      <View>
        {isShowDate && (
          <Fragment>
            <Text style={[typographyStyles.label, {color: colors.sulu}]}>
              {currentDate === nowDate
                ? 'Today'
                : new Date(item.createAt).toDateString()}
            </Text>
            <Gap height={sizes.xs} />
          </Fragment>
        )}
        <Swipeable key={index} renderRightActions={() => renderRightActions()}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.listItem}
            onPress={() => handleOpenConversation(item._id)}>
            <View style={styles.listItemInnerView}>
              <Text
                style={[
                  typographyStyles.label,
                  {color: colors.white, fontFamily: fonts.RubikMedium},
                ]}>
                {item.title}
              </Text>
              <Text style={[typographyStyles.label, styles.listItemTimeText]}>
                {new Date(item.createAt).toLocaleTimeString()}
              </Text>
            </View>
            <Gap height={5} />
            <Text style={[typographyStyles.subtitle, {color: colors.gray300}]}>
              {item.description}
            </Text>
          </TouchableOpacity>
        </Swipeable>
      </View>
      // <Swipeable key={index} renderRightActions={() => renderRightActions()}>
      //   <TouchableOpacity
      //     activeOpacity={0.8}
      //     style={styles.listItem}
      //     onPress={() => handleOpenConversation(item._id)}>
      //     <View style={styles.listItemInnerView}>
      //       <Text
      //         style={[
      //           typographyStyles.label,
      //           {color: colors.white, fontFamily: fonts.RubikMedium},
      //         ]}>
      //         {item.title}
      //       </Text>
      //       <Text style={[typographyStyles.label, styles.listItemTimeText]}>
      //         {new Date(item.createAt).toLocaleTimeString()}
      //       </Text>
      //     </View>
      //     <Gap height={5} />
      //     <Text style={[typographyStyles.subtitle, {color: colors.gray300}]}>
      //       {item.description}
      //     </Text>
      //   </TouchableOpacity>
      // </Swipeable>
    );
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.layout}>
        <Gap height={sizes.xs} />
        <Input placeholder="Search By Title" />
        <Gap height={sizes.xs} />
        <ScrollView>
          <GestureHandlerRootView style={{...globalStyles.debugBorder}}>
            <FlatList
              data={conversationsList}
              keyExtractor={item => item._id.toString()}
              renderItem={renderItem}
              ItemSeparatorComponent={ItemSeparator}
            />
          </GestureHandlerRootView>
        </ScrollView>
        <Gap height={85} />
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
