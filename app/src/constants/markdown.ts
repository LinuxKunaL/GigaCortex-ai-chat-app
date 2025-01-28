import fonts from './fonts';
import colors from './colors';
import globalStyles from '../styles/style';
import typographyStyles from './typography';
import spaces from './spaces';
import {StyleSheet} from 'react-native';

const markdownStyle: StyleSheet.NamedStyles<any> = {
  heading1: {
    ...typographyStyles.h2,
    color: colors.gray100,
  },
  Heading2: {
    ...typographyStyles.h2,
    color: colors.white,
  },
  heading3: {
    fontFamily: fonts.RubikMedium,
    color: colors.white,
  },
  body: {
    gap: 7,
    height: 'auto',
  },
  paragraph: {
    ...typographyStyles.subtitle,
    color: colors.gray100,
    lineHeight: 24,
  },
  code_inline: {
    backgroundColor: colors.gray500,
    fontStyle: 'italic',
    color: colors.white,
  },
  strong: {
    fontWeight: '700',
  },
  list_item: {
    ...typographyStyles.subtitle,
    color: colors.gray100,
    lineHeight: 24,
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
  hr: {
    borderColor: colors.gray500,
    borderWidth: 1,
  },
  table: {
    backgroundColor: colors.gray,
    ...globalStyles.border,
    overflow: 'scroll',
  },
  thead: {
    fontSize: 12,
    border: 0,
  },
  tr: {
    borderBottomWidth: 0,
  },
  th: {
    backgroundColor: colors.gray500,
    ...typographyStyles.label,
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  td: {
    ...typographyStyles.label,
    color: colors.white,
    fontSize: 12,
    borderColor: colors.gray500,
    borderWidth: 0.5,
  },
};

export default markdownStyle;
