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
          {/* Terms of Service Section */}
          <Text style={[typographyStyles.title, {color: colors.white}]}>
            Terms of Service
          </Text>

          <View>
            <Text style={[typographyStyles.title, styles.titleOfContent]}>
              1. User Responsibilities
            </Text>
            <Text style={[typographyStyles.label, styles.paragraph]}>
              By using GigaCortex, you agree not to misuse the AI services,
              engage in illegal activities, or violate any applicable laws. The
              app reserves the right to suspend accounts that breach these
              terms.
            </Text>
          </View>

          <View>
            <Text style={[typographyStyles.title, styles.titleOfContent]}>
              2. Credit System
            </Text>
            <Text style={[typographyStyles.label, styles.paragraph]}>
              GigaCortex operates on a credit-based system for AI interactions.
              Users must purchase or spend credits to conversion with AI .
            </Text>
          </View>

          <View>
            <Text style={[typographyStyles.title, styles.titleOfContent]}>
              3. Authentication & Account Security
            </Text>
            <Text style={[typographyStyles.label, styles.paragraph]}>
              User authentication is required to access GigaCortex. Your account
              information is securely stored and encrypted. You are responsible
              for maintaining the confidentiality of your credentials.
            </Text>
          </View>

          <Gap height={sizes.sm} />

          {/* Privacy Policy Section */}
          <Text style={[typographyStyles.title, {color: colors.white}]}>
            Privacy Policy
          </Text>

          <View>
            <Text style={[typographyStyles.title, styles.titleOfContent]}>
              1. User & AI Chat Data Privacy
            </Text>
            <Text style={[typographyStyles.label, styles.paragraph]}>
              GigaCortex stores chat interactions to improve AI responses. Your
              data is encrypted and not shared with third parties without
              consent, except as required by law.
            </Text>
          </View>

          <View>
            <Text style={[typographyStyles.title, styles.titleOfContent]}>
              2. Data Collection & Usage
            </Text>
            <Text style={[typographyStyles.label, styles.paragraph]}>
              We collect minimal user data necessary for account authentication,
              AI interaction improvements, and credit transactions. Your
              personal data will never be sold or used for advertising.
            </Text>
          </View>

          <View>
            <Text style={[typographyStyles.title, styles.titleOfContent]}>
              3. Payment & Financial Data Security
            </Text>
            <Text style={[typographyStyles.label, styles.paragraph]}>
              Payment transactions for credit purchases are securely processed
              via third-party gateways. GigaCortex does not store your financial
              details.
            </Text>
          </View>
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
