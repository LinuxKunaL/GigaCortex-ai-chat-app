import {
  Alert,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import globalStyles from '../../styles/style';
import typographyStyles from '../../constants/typography';
import colors from '../../constants/colors';
import Gap from '../../components/interface/Gap';
import sizes from '../../constants/sizes';
import Icon from '../../components/interface/Icon';
import HorizontalLine from '../../components/interface/HorizontalLine';
import spaces from '../../constants/spaces';
import Button from '../../components/interface/Button';
import PurchaseToken from '../../components/bottomSheets/PurchaseToken';
import {RBSheetRef} from '../../types/rbSheetRef';
import PurchaseHistory from '../../components/bottomSheets/PurchaseHistory';
import ChangePassword from '../../components/bottomSheets/ChangePassword';
import TermsAndPolicy from '../../components/bottomSheets/TermsAndPrivacy';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useChat from '../../hooks/useChat';
import RNRestart from 'react-native-restart';

const Profile: React.FC = () => {
  const REFPurchaseToken = React.useRef<RBSheetRef>(null);
  const REFPurchaseTokenHistory = React.useRef<RBSheetRef>(null);
  const REFChangePassword = React.useRef<RBSheetRef>(null);
  const REFTermsAndPolicy = React.useRef<RBSheetRef>(null);
  const me = useSelector((state: RootState) => state.me);
  const [chatModel, setChatModel] = useState<string>();
  const {clearAllChat} = useChat();

  useEffect(() => {
    AsyncStorage.getItem('chatModel').then(res => {
      if (res === 'ollama') {
        setChatModel('ollama - llama3.1');
      }
      if (res === 'gemini') {
        setChatModel('gemini - 1.5 pro');
      }
    });
  }, []);

  const handleChangeModel = async () => {
    const model = await AsyncStorage.getItem('chatModel');
    if (model === 'ollama') {
      setChatModel('gemini - 1.5 pro');
      await AsyncStorage.setItem('chatModel', 'gemini');
    }
    if (model === 'gemini') {
      setChatModel('ollama - llama3.1');
      await AsyncStorage.setItem('chatModel', 'ollama');
    }
    ToastAndroid.show('Model Changed', ToastAndroid.SHORT);
  };

  const handleClearAllChat = async () => {
    try {
      const result = await clearAllChat();
      if (result.success) {
        ToastAndroid.show(
          (result.massage as string) || 'All Chat Cleared',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Failed to clear all chat', ToastAndroid.SHORT);
      return error;
    }
  };

  const handleShowAlertDialog = () => {
    Alert.alert(
      '',
      'Are you sure you want to clear all chat?',
      [
        {text: 'Yes', onPress: () => handleClearAllChat()},
        {text: 'No', onPress: () => {}, style: 'cancel'},
      ],
      {cancelable: false},
    );
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      ToastAndroid.show('Logout Successfully', ToastAndroid.SHORT);
      RNRestart.restart();
    } catch (error) {
      ToastAndroid.show('Failed to logout', ToastAndroid.SHORT);
    }
  };
  const options = [
    {
      id: 2,
      title: 'Privacy policy',
      icon: 'security',
      color: colors.gray500,
      onPress: () => REFTermsAndPolicy.current?.open(),
    },
    {
      id: 3,
      title: 'Term of service',
      icon: 'text-box-outline',
      color: colors.gray500,
      onPress: () => REFTermsAndPolicy.current?.open(),
    },
    {
      id: 4,
      title: 'Clear all chat',
      icon: 'notification-clear-all',
      color: colors.red,
      onPress: () => handleShowAlertDialog(),
    },
    {
      id: 5,
      title: 'logout',
      icon: 'logout',
      color: colors.red,
      onPress: () => handleLogout(),
    },
  ];

  return (
    <View style={{...globalStyles.container}}>
      <View style={styles.layout}>
        <Gap height={sizes.xs} />
        <View style={styles.profileLayout}>
          <Image style={styles.imageAvatar} srcSet={me.avatar} />
          <View style={styles.profileTextView}>
            <Text style={styles.profileName}>{me.name}</Text>
            <Text style={styles.profileEmail}>{me.email}</Text>
            <TouchableOpacity
              onPress={() => REFChangePassword.current?.open()}
              activeOpacity={0.7}>
              <Text style={styles.profileChangePassword}>
                Change Password <Icon name="pencil" color={colors.sulu} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Gap height={sizes.xs} />
        <HorizontalLine height={0.3} width={200} />
        <Gap height={sizes.xs} />
        <View style={styles.tokensView}>
          <View style={styles.tokensInnerView}>
            <Icon name="star-circle" color={colors.sulu} size={30} />
            <Text style={{...typographyStyles.h1, color: colors.white}}>
              {me.credits?.balance}{' '}
              <Text style={{...typographyStyles.title, color: colors.gray300}}>
                Credits
              </Text>
            </Text>
          </View>
          <Gap height={sizes.xs} />
          <View style={styles.tokensInnerView}>
            <Button
              variant="primary"
              size="md"
              fontSize="sm"
              onPress={() => REFPurchaseToken.current?.open()}
              style={styles.tokensButtonWidth}>
              Buy
            </Button>
            <Button
              variant="secondary"
              size="md"
              fontSize="sm"
              onPress={() => REFPurchaseTokenHistory.current?.open()}
              style={styles.tokensButtonHistory}>
              <Text style={{color: colors.sulu}}>History</Text>
            </Button>
          </View>
        </View>
        <Gap height={sizes.xs} />
        <HorizontalLine height={0.3} width={200} />
        <Gap height={sizes.xs} />
        <View style={styles.optionView}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.optionBox}
            onPress={handleChangeModel}>
            <View style={styles.optionLeft}>
              <View style={styles.optionIcon}>
                <Icon name="chat-processing" color={colors.gray500} size={28} />
              </View>
              <Text style={styles.optionTitle}>Change Chat Model</Text>
            </View>
            <Text
              style={{
                ...typographyStyles.label,
                color: colors.gray300,
              }}>
              {chatModel}
            </Text>
          </TouchableOpacity>
          {options.map(item => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              style={styles.optionBox}
              onPress={item.onPress}>
              <View style={styles.optionLeft}>
                <View style={styles.optionIcon}>
                  <Icon name={item.icon} color={item.color} size={28} />
                </View>
                <Text style={styles.optionTitle}>{item.title}</Text>
              </View>
              {item.id > 1 && item.id < 4 && (
                <Icon name="chevron-right" color={colors.sulu} size={25} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <PurchaseToken ref={REFPurchaseToken} />
      <PurchaseHistory
        transactionHistory={me.credits?.transactionHistory ?? []}
        ref={REFPurchaseTokenHistory}
      />
      <ChangePassword ref={REFChangePassword} />
      <TermsAndPolicy ref={REFTermsAndPolicy} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  layout: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
  profileLayout: {flexDirection: 'row', alignItems: 'center', gap: 15},
  imageAvatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  profileTextView: {
    gap: 7,
  },
  profileName: {
    ...typographyStyles.h2,
    color: colors.white,
  },
  profileEmail: {
    ...typographyStyles.label,
    color: colors.gray300,
  },
  profileChangePassword: {
    ...typographyStyles.label,
    color: colors.white,
    textDecorationLine: 'underline',
  },
  tokensView: {
    width: '100%',
    borderRadius: spaces.radius,
    padding: 10,
    backgroundColor: colors.gray,
    borderColor: colors.gray500,
    borderWidth: 0.6,
  },
  tokensInnerView: {flexDirection: 'row', alignItems: 'center', gap: 5},
  tokensButtonWidth: {
    width: 80,
  },
  tokensButtonHistory: {
    width: 80,
    backgroundColor: colors.gray500,
    borderColor: colors.gray500,
  },
  optionView: {width: '100%', gap: 5},
  optionBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: 'auto',
  },
  optionIcon: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionTitle: {
    ...typographyStyles.label,
    color: colors.white,
  },
});
