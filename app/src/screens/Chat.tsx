// @ts-nocheck
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Keyboard,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import React, {
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
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
import Markdown from 'react-native-markdown-display';
import spaces from '../constants/spaces';
import {io} from 'socket.io-client';
import useSocket from '../hooks/useSocket';
import markdownStyle from '../constants/markdown';

type Props = defaultProps & {};
type TConversionObject = {
  id: number;
  me: string;
  ai: string;
};
type TAnswerObject = {
  questionId: number;
  answerInChunk: string[];
  isCompleted: boolean;
};

const Chat: React.FC<Props> = props => {
  const [inputViewHeight, setInputViewHeight] = useState(0);
  const [conversionObject, setConversionObject] = useState<TConversionObject[]>(
    [],
  );
  const [inputData, setInputData] = useState('');
  const {stream} = useSocket();
  const conversionObjectRef = useRef(conversionObject);

  const renderCodeBlock = (
    language: string,
    code: string,
    returnType?: string,
  ) => {
    // const codeLabel = {
    //   python: 'PY',
    //   c: 'C',
    //   java: 'JAVA',
    //   cpp: 'CPP',
    //   js: 'JS',
    //   html: 'HTML',
    //   css: 'CSS',
    // };
    if (returnType === 'forCopy') {
      return code;
    } else {
      return (
        <View style={styles.codeContainer}>
          <Text style={styles.codeLabel}>{language.toUpperCase()}</Text>
          <TouchableOpacityText
            onPress={() => Clipboard.setString(code)}
            style={styles.copyButton}>
            copy code
          </TouchableOpacityText>
          <CodeBlock language={language}>{code}</CodeBlock>
        </View>
      );
    }
  };

  const copyResponse = () => {
    Clipboard.setString(markdownBlocks.join('\n'));
  };

  const sendMessage = async () => {
    const id = getRandomNumber(20, 100);

    setConversionObject(prev => {
      return [
        ...prev,
        {
          id: id,
          me: inputData,
          ai: [],
        },
      ];
    });

    const data = {
      question: {
        id: id,
        text: inputData,
      },
      chatModel: 'gemini',
    };

    stream.emit('ask-question', data);

    setInputData('');
  };

  useEffect(() => {
    conversionObjectRef.current = conversionObject;
  }, [conversionObject]);

  useEffect(() => {
    const handleReceiveAnswer = (data: TAnswerObject) => {
      const {questionId} = data;
      setConversionObject(prev => {
        return prev.map(item =>
          item.id === questionId
            ? {...item, ai: [...(item.ai || []), ...(data.answerInChunk || [])]}
            : item,
        );
      });
    };
    stream.on('receive-answer', handleReceiveAnswer);
  }, [stream]);

  function getRandomNumber(min, max) {
    return (Math.random() * (max - min) + min).toFixed(0);
  }

  const changeInput = (value: string) => {
    setInputData(value);
  };

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
          {conversionObject.length === 0 ? (
            <HowCanIHelpYou />
          ) : (
            <View style={styles.width100}>
              <ScrollView
                style={{
                  flex: 1,
                }}
                showsVerticalScrollIndicator={false}>
                <Gap height={30} />
                <View
                  style={{
                    ...styles.conversionBlock,
                    marginBottom: inputViewHeight,
                  }}>
                  {conversionObject.map((item, index) => (
                    <React.Fragment key={index}>
                      <View style={styles.sender}>
                        <View style={styles.senderMessageBox}>
                          <Text
                            style={[
                              typographyStyles.label,
                              styles.senderMessageText,
                            ]}>
                            {item.me}
                          </Text>
                        </View>
                        <Image
                          style={styles.senderAvatar}
                          srcSet="https://avatar.iran.liara.run/public/11"
                        />
                      </View>
                      <View style={styles.receiver}>
                        <View style={styles.receiverMessageBox}>
                          {item.ai.length > 0 ? (
                            <View style={styles.receiverMessage}>
                              <Markdown
                                key={index}
                                rules={{
                                  fence: (node: any) =>
                                    renderCodeBlock(
                                      node.sourceInfo,
                                      node.content,
                                    ),
                                }}
                                style={markdownStyle}>
                                {item.ai?.reduce(
                                  (acc, curr) => acc + '' + curr,
                                )}
                              </Markdown>
                              <IconButton
                                name="content-copy"
                                variant="secondary"
                                size="xs"
                                iconSize={15}
                                color={colors.sulu}
                                onPress={copyResponse}
                              />
                            </View>
                          ) : (
                            <Text style={styles.receiverMessageText}>
                              Loading...
                            </Text>
                          )}
                        </View>
                        <Icon name="creation" size={20} color={colors.white} />
                      </View>
                    </React.Fragment>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}
        </View>
        <InputMessageBox
          sendButton={sendMessage}
          changeInput={changeInput}
          inputValue={inputData}
          setHeight={setInputViewHeight}
        />
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

const InputMessageBox = ({setHeight, changeInput, inputValue, sendButton}) => {
  return (
    <View
      onLayout={event => setHeight(event.nativeEvent.layout.height + 30)}
      style={styles.messageInputBox}>
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
        defaultValue={inputValue}
        onChange={e => {
          changeInput(e.nativeEvent.text);
        }}
      />
      <IconButton
        name="send"
        variant="primary"
        size="lg"
        iconSize={24}
        color={colors.gray}
        onPress={() => {
          sendButton();
          Keyboard.dismiss();
        }}
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
  conversionBlock: {
    gap: 20,
    overflow: 'scroll',
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
    height: 'auto',
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
    height: 'auto',
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
    color: colors.white,
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
