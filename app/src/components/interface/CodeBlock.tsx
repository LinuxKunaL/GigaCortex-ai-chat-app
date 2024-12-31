import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CodeHighlighter from 'react-native-code-highlighter';
import colors from '../../constants/colors';
import {atomOneDark} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import fonts from '../../constants/fonts';

type Props = {
  children?: string;
  language?: string;
};

const CodeBlock: React.FC<Props> = props => {
  return (
    <CodeHighlighter
      scrollViewProps={{
        style: styles.codeScrollView,
        contentContainerStyle: styles.codeContentContainer,
      }}
      hljsStyle={atomOneDark}
      language={props.language}
      textStyle={styles.codeText}>
      {props.children as string}
    </CodeHighlighter>
  );
};

export default CodeBlock;

const styles = StyleSheet.create({
  codeScrollView: {
    backgroundColor: colors.gray,
    paddingTop: 20,
  },
  codeContentContainer: {
    backgroundColor: colors.gray,
  },
  codeText: {
    fontFamily: fonts.RubikRegular,
    lineHeight: 15,
    fontSize: 11,
    backgroundColor: colors.gray,
  },
});
