import {ScrollView, StyleSheet, Text, View} from 'react-native';
import RawBottomSheet from 'react-native-raw-bottom-sheet';
import React from 'react';
import {RBSheetRef} from '../../types/rbSheetRef';
import typographyStyles from '../../constants/typography';
import IconButton from '../interface/IconButton';
import colors from '../../constants/colors';
import globalStyles from '../../styles/style';
import sizes from '../../constants/sizes';
import Gap from '../interface/Gap';

type Props = {
  ref: RBSheetRef;
};

const TermsAndPolicy = React.forwardRef<RBSheetRef, Props>(
  (props, ref: any): JSX.Element => {
    const customStyles = {
      wrapper: {
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      container: globalStyles.bottomSheetContainer,
    };

    return (
      <RawBottomSheet
        ref={ref}
        height={430}
        customStyles={customStyles}
        customModalProps={{animationType: 'fade', statusBarTranslucent: true}}>
        <View style={styles.termServiceView}>
          <Text style={[typographyStyles.title, {color: colors.white}]}>
            Terms of Service
          </Text>
          <IconButton
            onPress={() => ref.current.close()}
            name="close"
            variant="secondary"
            size="md"
            iconSize={20}
            color={colors.sulu}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {[1, 2, 3, 4].map(i => (
            <View key={i}>
              <Text style={[typographyStyles.title, styles.titleOfContent]}>
                Clausl 12 ds asdaasdhfjj
              </Text>
              <Text style={[typographyStyles.label, styles.paragraph]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
            </View>
          ))}
          <Gap height={sizes.sm} />
          <Text style={[typographyStyles.title, {color: colors.white}]}>
            Privacy Policy
          </Text>
          {[1, 2, 3, 4].map(i => (
            <View key={i}>
              <Text style={[typographyStyles.title, styles.titleOfContent]}>
                Clausl 12 ds asdaasdhfjj
              </Text>
              <Text style={[typographyStyles.label, styles.paragraph]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
            </View>
          ))}
        </ScrollView>
      </RawBottomSheet>
    );
  },
);

export default TermsAndPolicy;

const styles = StyleSheet.create({
  termServiceView: {
    marginBottom: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  titleOfContent: {marginBottom: 10, marginTop: 10, color: colors.sulu},
  paragraph: {color: colors.gray300},
});
