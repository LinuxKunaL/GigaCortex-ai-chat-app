import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Keyboard,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import useSocket from '../hooks/useSocket';
import markdownStyle from '../constants/markdown';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, setRefreshKey} from '../app/redux';
import useChat from '../hooks/useChat';
import {ObjectId} from 'bson';
import codeLabel from '../utils/codingLabel';
import {launchImageLibrary} from 'react-native-image-picker';
import spaces from '../constants/spaces';
import {base64ToArrayBuffer} from '../utils/base64ToArrayBuffer';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = defaultProps & {};
type TInputData = {
  text: string;
  image: {
    url: string;
    arrayBuffer: any;
  };
};
type TConversionObject = {
  _id?: string;
  question: {
    text?: string;
    image: string;
  };
  answer: string[] | string;
};
type TAnswerObject = {
  questionId: string;
  answerInChunk: string[];
  isCompleted: boolean;
};

type TInputMessageBox = {
  setHeight: (height: number) => void;
  setInputData: (update: (state: any) => TInputData) => void;
  inputValue: string;
  sendButton: () => void;
  isDisable: boolean;
};
const Chat: React.FC<Props> = props => {
  const [inputViewHeight, setInputViewHeight] = useState(0);
  const [conversionObject, setConversionObject] = useState<TConversionObject[]>(
    [],
  );
  const [conversionId, setConversionId] = useState<string>('');
  const [inputData, setInputData] = useState<TInputData>({
    text: '',
    image: {
      url: '',
      arrayBuffer: null,
    },
  });
  const [conversationTitle, setConversationTitle] =
    useState<string>('New Title');
  const [chatModel, setChatModel] = useState<string>('ollama');
  const conversionObjectRef = useRef(conversionObject);
  const {stream} = useSocket();
  const {getConversationById} = useChat();
  const me = useSelector((state: RootState) => state.me);
  const [isInteract, setIsInteract] = useState(false);
  const dispatch = useDispatch();
  const REFScrollView = React.useRef<ScrollView>(null);
  const [isDisable, setIsDisable] = useState<boolean>(false);

  const renderCodeBlock = (language: string, code: string) => {
    const languageFormat = codeLabel[language.toLowerCase()];
    return (
      <View style={styles.codeContainer}>
        <Text style={styles.codeLabel}>
          {languageFormat ? languageFormat : language.toUpperCase()}
        </Text>
        <TouchableOpacityText
          onPress={() => Clipboard.setString(code)}
          style={styles.copyButton}>
          copy code
        </TouchableOpacityText>
        <CodeBlock language={language}>{code}</CodeBlock>
      </View>
    );
  };

  const copyResponse = (id: string) => {
    const result = conversionObject.find(item => item._id === id)?.answer;
    Clipboard.setString(result?.toString().replaceAll(',', '') as string);
  };

  const sendMessage = async () => {
    const userId = me._id;
    const newId = new ObjectId().toString();
    REFScrollView.current?.scrollToEnd({animated: true});
    try {
      if (inputData?.text.length === 0) {
        return ToastAndroid.show(
          'Please Enter the Question',
          ToastAndroid.SHORT,
        );
      }
      if (chatModel === 'ollama') {
        if (inputData?.image.url) {
          setInputData({
            image: {
              url: '',
              arrayBuffer: null,
            },
            text: '',
          });
          return ToastAndroid.show(
            'Image is not supported in Ollama use gemini',
            ToastAndroid.SHORT,
          );
        }
      }
      setIsDisable(true);
      /**
       * Here we set the new @conversationObject
       * for instantly show the new question
       */

      setConversionObject((prev: any) => {
        return [
          ...prev,
          {
            _id: newId,
            question: {
              text: inputData?.text ?? '',
              image: inputData?.image?.url,
            },
            answer: [],
          },
        ];
      });

      /**
       * Here we send @conversationId to the server
       * for put the new questions by this id
       */
      const data = {
        userId,
        question: {
          questionId: newId,
          text: inputData?.text,
          image: inputData?.image?.arrayBuffer,
        },
        conversionId,
        chatModel,
      };

      stream.emit('ask-question', data);

      setInputData({
        image: {
          url: '',
          arrayBuffer: null,
        },
        text: '',
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    conversionObjectRef.current = conversionObject;
  }, [conversionObject]);

  useEffect(() => {
    if (!stream) {
      return;
    }

    const handleReceiveAnswer = (data: TAnswerObject) => {
      const {questionId} = data;
      setConversionObject(prev =>
        prev.map(item =>
          item._id === questionId
            ? {
                ...item,
                answer: [
                  ...(item.answer || []),
                  ...(Array.isArray(data.answerInChunk)
                    ? [data.answerInChunk.join('')]
                    : [data.answerInChunk]),
                ],
              }
            : item,
        ),
      );
      REFScrollView.current?.scrollToEnd({animated: true});
      if (data.isCompleted) {
        !isInteract && setIsInteract(true);
        setIsDisable(false);
      }
    };

    const handleError = (error: string) => {
      ToastAndroid.show('Error: ' + error, ToastAndroid.LONG);
      setConversionObject([]);
      ToastAndroid.show('Try Again', ToastAndroid.SHORT);
      setIsDisable(false);
    };

    stream.on('receive-answer', handleReceiveAnswer);
    stream.on('error-in-ask-question', handleError);
    stream.on('receive-conversation-id', (id: string) => setConversionId(id));
    stream.on('receive-title', (title: string) => setConversationTitle(title));
  }, [isInteract, stream]);

  const onScreenClose = useCallback(() => {
    if (isInteract) {
      dispatch(setRefreshKey());
    }
  }, [dispatch, isInteract]);

  useEffect(() => {
    /**
     * When we open the conversation from @historyTab
     * than we get the all conversation by id
     */
    if (props.route.params && props.route.params.id) {
      setConversionId(props.route.params.id);
      getConversationById(props.route.params.id).then(
        (res: {success: boolean; data: any}) => {
          if (res.success) {
            setConversationTitle(res.data.title);
            setConversionObject(res.data.conversation);
          }
        },
      );
    }
    /**
     * When we close the screen or go back the screen
     * than we reFetch the @credits
     */
    props.navigation.addListener('beforeRemove', onScreenClose);

    AsyncStorage.getItem('chatModel').then(res => {
      setChatModel(res as string);
    });
  }, [
    getConversationById,
    props.route.params,
    props.navigation,
    onScreenClose,
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.innerLayout}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{conversationTitle}</Text>
          <IconButton
            name="close"
            variant="secondary"
            size="sm"
            iconSize={23}
            color={colors.sulu}
            onPress={() => props.navigation.goBack()}
          />
        </View>
        <View style={styles.conversationBox}>
          {conversionObject.length === 0 ? (
            <HowCanIHelpYou />
          ) : (
            <View style={styles.width100}>
              <ScrollView
                style={styles.flex1}
                showsVerticalScrollIndicator={false}
                ref={REFScrollView}>
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
                          {item.question?.image && (
                            <View
                              style={[
                                styles.inputImageView,
                                styles.senderImageView,
                              ]}>
                              <Image
                                style={styles.inputImage}
                                srcSet={item.question.image}
                              />
                            </View>
                          )}
                          <Text
                            style={[
                              typographyStyles.label,
                              styles.senderMessageText,
                            ]}>
                            {typeof item.question === 'string'
                              ? item.question
                              : item.question.text}
                          </Text>
                        </View>
                        <Image style={styles.senderAvatar} srcSet={me.avatar} />
                      </View>
                      <View style={styles.receiver}>
                        <View style={styles.receiverMessageBox}>
                          {item.answer.length > 0 ? (
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
                                {Array.isArray(item.answer)
                                  ? item.answer.reduce(
                                      (acc, curr) => acc + '' + curr,
                                      '',
                                    )
                                  : item.answer}
                              </Markdown>
                              <IconButton
                                name="content-copy"
                                variant="secondary"
                                size="xs"
                                iconSize={15}
                                color={colors.sulu}
                                onPress={() => copyResponse(item._id as string)}
                              />
                            </View>
                          ) : (
                            <ActivityIndicator
                              style={styles.alignSelf}
                              size="small"
                              color={colors.sulu}
                            />
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
          isDisable={isDisable}
          sendButton={sendMessage}
          setInputData={setInputData}
          setHeight={setInputViewHeight}
          inputValue={inputData?.text as string}
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

const InputMessageBox = (props: TInputMessageBox) => {
  const [image, setImage] = useState<string>('');
  const handleAddImage = () => {
    launchImageLibrary({mediaType: 'photo', includeBase64: true}, async res => {
      const selectedImage = res.assets?.[0];
      const arrayBuffer = await base64ToArrayBuffer(
        selectedImage?.base64 as string,
      );
      setImage(selectedImage?.uri as string);
      props.setInputData(prev => ({
        ...prev,
        image: {
          arrayBuffer,
          url: selectedImage?.uri as string,
        },
      }));
    });
  };
  const handleCloseImage = () => {
    setImage('');
    props.setInputData(prev => ({
      ...prev,
      image: {
        url: '',
        arrayBuffer: null,
      },
    }));
  };
  return (
    <View
      onLayout={event => props.setHeight(event.nativeEvent.layout.height + 30)}
      style={styles.messageInputBox}>
      <IconButton
        onPress={handleAddImage}
        name="image"
        variant="secondary"
        size="lg"
        iconSize={24}
        disabled={props.isDisable}
        color={colors.sulu}
      />
      <View style={styles.inputView}>
        {image && (
          <View style={styles.inputImageView}>
            <Image style={styles.inputImage} srcSet={image} />
            <IconButton
              size="xs"
              name="close"
              iconSize={19}
              variant="secondary"
              color={colors.sulu}
              onPress={handleCloseImage}
              style={styles.inputImageClose}
            />
          </View>
        )}
        <TextInput
          multiline
          numberOfLines={10}
          textAlignVertical="center"
          placeholder="Ask your question......"
          selectionColor={colors.gray300}
          placeholderTextColor={colors.white}
          cursorColor={colors.sulu}
          style={styles.input}
          defaultValue={props.inputValue}
          onChange={e => {
            const value = e.nativeEvent.text;
            props.setInputData(pre => ({
              ...pre,
              text: value,
            }));
          }}
        />
      </View>
      <IconButton
        name="send"
        variant="primary"
        size="lg"
        iconSize={24}
        color={colors.gray}
        disabled={props.isDisable}
        onPress={() => {
          props.sendButton();
          Keyboard.dismiss();
          setImage('');
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
  alignSelf: {alignSelf: 'flex-start'},
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
    justifyContent: 'flex-end',
    flex: 1,
    width: '100%',
  },
  senderMessageBox: {
    ...globalStyles.border,
    backgroundColor: colors.gray,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    maxWidth: '80%',
    flexShrink: 1,
  },
  senderMessageText: {
    color: colors.white,
    flexWrap: 'wrap',
    textAlign: 'left',
    lineHeight: 22,
  },
  senderImageView: {marginTop: 0, marginBottom: 10},
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
  inputView: {
    ...globalStyles.border,
    backgroundColor: colors.gray,
    paddingHorizontal: 10,
    flex: 1,
    width: '100%',
  },
  input: {
    fontFamily: fonts.RubikRegular,
    includeFontPadding: false,
    height: '100%',
    flex: 1,
    color: colors.white,
  },
  inputImageView: {
    width: 130,
    height: 130,
    marginTop: 10,
  },
  inputImage: {
    height: '100%',
    width: '100%',
    borderRadius: spaces.radius,
  },
  inputImageClose: {position: 'absolute', right: 4, top: 4},
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
  flex1: {
    flex: 1,
  },
});
