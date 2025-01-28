import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import sizes from '../../constants/sizes';
import fonts from '../../constants/fonts';
import useChat from '../../hooks/useChat';
import spaces from '../../constants/spaces';
import colors from '../../constants/colors';
import globalStyles from '../../styles/style';
import Gap from '../../components/interface/Gap';
import Icon from '../../components/interface/Icon';
import Button from '../../components/interface/Button';
import typographyStyles from '../../constants/typography';
import React, {Fragment, useEffect, useState} from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import defaultProps from '../../types/props';

type Props = defaultProps & {};

type TConversationList = {
  _id: string;
  title: string;
  description: string;
  createAt: Date;
};

const History: React.FC<Props> = props => {
  const {getConversationsList, deleteConversation} = useChat();
  const [refreshList, setRefreshList] = useState<number>(0);
  const [conversationsList, setConversationsList] = useState<
    TConversationList[]
  >([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await getConversationsList();
        setConversationsList(res.data);
      } catch (error) {
        console.error('Error fetching conversations:', error);
        ToastAndroid.show('Failed to fetch conversations.', ToastAndroid.SHORT);
      } finally {
      }
    };
    fetchConversations();
  }, [refreshList, getConversationsList]);

  const handleOpenConversation = (id: string) => {
    props.navigation.navigate('chat', {id});
  };

  const handleDeleteConversation = async (id: string) => {
    const result = await deleteConversation(id);
    if (result.success) {
      ToastAndroid.show(result.massage, ToastAndroid.SHORT);
      setRefreshList(prev => prev + 1);
    }
  };
  const renderRightActions = (id: string) => {
    return (
      <Button
        variant="secondary"
        fontSize="xs"
        size="lg"
        onPress={() => handleDeleteConversation(id)}
        style={styles.listDeleteButton}>
        <Icon color={colors.white} name="delete" size={19} />
      </Button>
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
        <Swipeable
          key={index}
          renderRightActions={() => renderRightActions(item._id)}>
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
    );
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.layout}>
        {conversationsList.length > 0 && (
          <GestureHandlerRootView style={{...globalStyles.debugBorder}}>
            <FlatList
              data={conversationsList}
              keyExtractor={item => item._id.toString()}
              renderItem={renderItem}
              ItemSeparatorComponent={ItemSeparator}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={<Gap height={sizes.xs} />}
              ListFooterComponent={<Gap height={65 + 25} />}
            />
          </GestureHandlerRootView>
        )}
        {conversationsList.length === 0 && (
          <View style={styles.noConversation}>
            <Icon name="history" size={40} color={colors.sulu} />
            <Gap height={sizes.xs} />
            <Text style={[typographyStyles.label, {color: colors.gray100}]}>
              No conversations yet
            </Text>
          </View>
        )}
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
    backgroundColor: colors.red,
  },
  noConversation: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
export default History;
