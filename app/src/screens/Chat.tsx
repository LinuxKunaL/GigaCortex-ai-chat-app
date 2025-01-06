import {Image, StyleSheet, Text, View} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import React, {ReactNode} from 'react';
import globalStyles from '../styles/style';
import typographyStyles from '../constants/typography';
import sizes from '../constants/sizes';
import Gap from '../components/interface/Gap';
import colors from '../constants/colors';

import RobotSayHello from '../assets/svg/RobotSayHello';
import {TextInput} from 'react-native';
import IconButton from '../components/interface/IconButton';
import fonts from '../constants/fonts';

import Icon from '../components/interface/Icon';
import TouchableOpacityText from '../components/interface/TouchableOpacityText';
import CodeBlock from '../components/interface/CodeBlock';
import defaultProps from '../types/props';

type Props = defaultProps & {};
type TElement = {
  component: React.ComponentType<any>;
  styles: any;
  children: ((params?: any) => ReactNode) | string;
};

const Chat: React.FC<Props> = props => {
  const renderCodeBlock = (
    language: string,
    format: string,
    code: string,
    returnType?: string,
  ) => {
    if (returnType === 'forCopy') {
      return code;
    } else {
      return (
        <>
          <Text style={styles.codeLabel}>{format}</Text>
          <TouchableOpacityText
            onPress={() => Clipboard.setString(code)}
            style={styles.copyButton}>
            copy code
          </TouchableOpacityText>
          <CodeBlock language={language}>{code}</CodeBlock>
        </>
      );
    }
  };
  const copyResponse = () => {
    const copyString: string = elements.reduce((acc, item): any => {
      if (typeof item.children === 'string') {
        return acc + item.children + '\n';
      }
      if (typeof item.children === 'function') {
        return acc + '` ' + item.children('forCopy') + ' `' + '\n';
      } else {
        throw new Error('Unexpected type for item.children');
      }
    }, '');
    Clipboard.setString(copyString);
  };

  const elements: TElement[] = [
    {
      component: Text,
      styles: styles.h2Text,
      children: 'Adding Two Numbers in Python',
    },
    {
      component: Text,
      styles: styles.paragraphText,
      children:
        'Here is a simple Python code that adds two numbers and prints the result.',
    },
    {
      component: Text,
      styles: styles.listItem,
      children: '1. hello world',
    },
    {
      component: Text,
      styles: styles.listItem,
      children: '2. this is my list item',
    },
    {
      component: View,
      styles: styles.codeContainer,
      children: (returnType?: string) =>
        renderCodeBlock(
          'python',
          'PY',
          `a = 5
  b = 3
  kunal = 10/10
  sum = a + b
  print(sum)`,
          returnType,
        ),
    },
    {
      component: Text,
      styles: styles.paragraphText,
      children:
        'Explanation: The variables a and b are assigned the values 5 and 3. Then, the sum of these two numbers is calculated and stored in the variable "sum". Finally, the result is printed, which is 8.',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.innerLayout}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>New Title</Text>
          <IconButton
            name="close"
            variant="secondary"
            size="sm"
            iconSize={23}
            color={colors.sulu}
            onPress={() => props.navigation.navigate('home')}
          />
        </View>
        <View style={styles.conversationBox}>
          {/* <HowCanIHelpYou /> */}
          <View style={styles.width100}>
            <Gap height={30} />
            <View style={styles.gap20}>
              <View style={styles.sender}>
                <View style={styles.senderMessageBox}>
                  <Text
                    style={[typographyStyles.label, styles.senderMessageText]}>
                    what is javascript
                  </Text>
                </View>
                <Image
                  style={styles.senderAvatar}
                  srcSet="https://avatar.iran.liara.run/public/11"
                />
              </View>
              <View style={styles.receiver}>
                <View style={styles.receiverMessageBox}>
                  <View style={styles.receiverMessage}>
                    {elements.map((item, index) =>
                      React.createElement(
                        item.component,
                        {style: item.styles as any, key: index},
                        typeof item.children === 'function'
                          ? item.children()
                          : item.children,
                      ),
                    )}
                    <IconButton
                      name="content-copy"
                      variant="secondary"
                      size="xs"
                      iconSize={15}
                      color={colors.sulu}
                      onPress={copyResponse}
                    />
                  </View>
                </View>
                <Icon name="creation" size={24} color={colors.white} />
              </View>
            </View>
          </View>
        </View>
        <InputMessageBox />
      </View>
    </View>
  );
};

const HowCanIHelpYou = () => {
  return (
    <View style={styles.conversationInitBox}>
      <RobotSayHello />
      <Gap height={sizes.xs} />
      <Text style={[typographyStyles.title, {color: colors.gray500}]}>
        How can i help you ?
      </Text>
    </View>
  );
};

const InputMessageBox = () => {
  return (
    <View style={styles.messageInputBox}>
      <IconButton
        name="image"
        variant="secondary"
        size="lg"
        iconSize={24}
        color={colors.sulu}
      />
      <TextInput
        multiline
        numberOfLines={10}
        textAlignVertical="center"
        placeholder="Ask your question......"
        selectionColor={colors.gray300}
        placeholderTextColor={colors.white}
        cursorColor={colors.sulu}
        style={styles.input}
      />
      <IconButton
        name="send"
        variant="primary"
        size="lg"
        iconSize={24}
        color={colors.gray}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    justifyContent: 'flex-start',
  },
  innerLayout: {width: '100%', height: '100%'},
  header: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {...typographyStyles.title, color: colors.white},
  gap20: {
    gap: 20,
  },
  width100: {height: '100%'},
  messageInputBox: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 10,
    width: '100%',
    position: 'absolute',
    bottom: 10,
  },
  conversationBox: {
    alignSelf: 'center',
    height: '90%',
    width: '100%',
    justifyContent: 'center',
  },
  conversationInitBox: {
    width: '100%',
    alignItems: 'center',
  },
  sender: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    justifyContent: 'flex-end',
  },
  senderMessageBox: {
    ...globalStyles.border,
    backgroundColor: colors.gray,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  senderMessageText: {color: colors.white, width: '100%', textAlign: 'center'},
  senderAvatar: {width: 40, height: 40},
  receiver: {
    flexDirection: 'row-reverse',
    gap: 10,
    width: '100%',
    justifyContent: 'flex-end',
  },
  receiverMessageBox: {
    width: '90%',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  receiverMessage: {
    width: '100%',
    flexDirection: 'column',
    gap: 10,
  },
  input: {
    ...globalStyles.border,
    backgroundColor: colors.gray,
    paddingHorizontal: 10,
    fontFamily: fonts.RubikRegular,
    includeFontPadding: false,
    height: '100%',
    flex: 1,
  },
  h2Text: {
    ...typographyStyles.h2,
    color: colors.gray100,
  },
  listItem: {
    ...typographyStyles.label,
    color: colors.gray100,
    fontStyle: 'italic',
    marginLeft: 10,
    fontSize: sizes.xs,
  },
  suluSubtitleText: {
    ...typographyStyles.subtitle,
    color: colors.sulu,
    marginLeft: 10,
    fontStyle: 'italic',
  },
  codeLabel: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
    margin: 4,
    color: colors.yellow,
    ...typographyStyles.text,
    ...globalStyles.border,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  paragraphText: {
    ...typographyStyles.subtitle,
    color: colors.gray100,
    lineHeight: 23,
  },
  codeContainer: {
    backgroundColor: colors.gray,
    padding: 10,
    ...globalStyles.border,
    position: 'relative',
  },
  copyButton: {
    position: 'absolute',
    top: 1,
    right: 4,
    zIndex: 2,
    margin: 4,
  },
  copyButtonText: {
    ...typographyStyles.text,
    color: colors.white,
  },
});
