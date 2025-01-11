// @ts-nocheck
import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import React, {Fragment, ReactNode, useEffect, useState} from 'react';
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

type Props = defaultProps & {};
type TElement = {
  component: React.ComponentType<any>;
  styles: any;
  children: ((params?: any) => ReactNode) | string;
};

const Chat: React.FC<Props> = props => {
  const [inputViewHeight, setInputViewHeight] = useState(0);
  const [markdownBlocks, setMarkdownBlocks] = useState<string[]>([]);
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
          <Text style={styles.codeLabel}>PY</Text>
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
    Clipboard.setString(element);
  };

  const blocks = [
    'HTML (HyperText Markup Language) is **Markup Language** the standard language used to create and design webpages. It structures web content using elements represented by tags, such as `<h1>` for headings, `<p>` for paragraphs, and `<a>` for links.',

    '### Key Features of HTML:',

    '1. **Markup Language**: Defines the structure of web pages using tags.',
    '2. **Basic Building Block**: Works alongside CSS for styling and JavaScript for interactivity.',
    '3. **Cross-Platform**: Supported by all modern browsers.',

    '> hi',

    'The killer feature of `markdown-it` is very effective support of',

    '### Example:',

    '```html\n<!DOCTYPE html>\n<html>\n<head>\n  <title>My Web Page</title>\n</head>\n<body>\n  <h1>Welcome to My Website</h1>\n  <p>This is a paragraph of text.</p>\n  <a href="https://example.com">Visit Example</a>\n</body>\n</html>\n```',

    '```javascript\nvar code = 12\nlog(code+12);\nfunction kunal(){\n  return 12\n}\n```',

    '```python\na = 5\nb = 3\nsum = a + b\nprint("The sum is", sum)\n```',
  ];

  useEffect(() => {
    // let index = 0;
    // const interval = setInterval(() => {
    //   if (index < blocks.length) {
    //     setMarkdownBlocks(prev => [...prev, blocks[index]]);
    //     index++;
    //   } else {
    //     clearInterval(interval);
    //   }
    // }, 500);
    // return () => clearInterval(interval);
  }, []);

  const markdownStyle = {
    heading1: styles.h2Text,
    heading3: {
      fontFamily: fonts.RubikMedium,
      color: colors.white,
    },
    body: {
      gap: 10,
      height: 'auto',
    },
    paragraph: styles.paragraphText,
    code_inline: {
      backgroundColor: colors.gray500,
      fontStyle: 'italic',
      color: colors.white,
    },
    strong: {
      fontWeight: '700',
    },
    list_item: {
      ...styles.paragraphText,
    },
    blockquote: {
      backgroundColor: colors.gray,
      borderRadius: 3,
      borderColor: colors.gray500,
    },
    link: {
      color: colors.sulu,
      fontStyle: 'italic',
    },
    image: {
      borderRadius: spaces.radius,
    },
  };

  const fetchStreamWithAxios = async () => {
    const url = 'http://192.168.0.133:3001';

    const stream = io(url);
    stream.on('connect', () => {
      console.log('connected');
    });
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
          {/* <HowCanIHelpYou /> */}
          <View style={styles.width100}>
            <Gap height={30} />
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
              <View
                style={{
                  ...styles.conversionBlock,
                  marginBottom: inputViewHeight,
                }}>
                <View style={styles.sender}>
                  <View style={styles.senderMessageBox}>
                    <Text
                      style={[
                        typographyStyles.label,
                        styles.senderMessageText,
                      ]}>
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
                      {markdownBlocks.map((bl, index) => (
                        <Markdown
                          key={index}
                          rules={{
                            fence: (node: any) =>
                              renderCodeBlock(node.sourceInfo, node.content),
                          }}
                          style={markdownStyle}>
                          {bl}
                        </Markdown>
                      ))}
                      <IconButton
                        name="content-copy"
                        variant="secondary"
                        size="xs"
                        iconSize={15}
                        color={colors.sulu}
                        // onPress={copyResponse}
                        onPress={fetchStreamWithAxios}
                      />
                    </View>
                  </View>
                  <Icon name="creation" size={24} color={colors.white} />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
        <InputMessageBox setHeight={setInputViewHeight} />
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

const InputMessageBox = ({setHeight}) => {
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
    lineHeight: 24,
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
