import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import globalStyles from '../styles/style';
import typographyStyles from '../constants/typography';
import colors from '../constants/colors';
import Gap from '../components/interface/Gap';
import sizes from '../constants/sizes';
import {useForm} from 'react-hook-form';
import Button from '../components/interface/Button';
import InputController from '../components/interface/InputController';
import GoogleLogo from '../assets/svg/GoogleLogo';
import fonts from '../constants/fonts';
import defaultProps from '../types/props';
import useAuth from '../hooks/useAuth';
type Props = defaultProps & {};

const Register: React.FC<Props> = props => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const {register} = useAuth();

  const onSubmit = (params: any): void => {
    if (params.password !== params.passwordAgain) {
      return ToastAndroid.show(
        'Password and confirm password must be same',
        ToastAndroid.SHORT,
      );
    }
    register(params);
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.layout}>
        <View style={styles.innerLayout}>
          <View style={styles.formView}>
            <Gap height={sizes.xxxl} />
            <Text style={[typographyStyles.h1, styles.titleText]}>
              Create account
            </Text>
            <Text style={[typographyStyles.label, styles.subtitleText]}>
              please enter your details to create account
            </Text>
            <Gap height={sizes.xxl} />
            <View style={styles.width100}>
              <InputController
                control={control}
                name="name"
                requiredMessage="Name is required"
                invalidMassage="Name must be alphabetical"
                placeholder="Enter your name"
                pattern={/^[a-z A-Z]+$/}
                errors={errors}
              />
              <InputController
                control={control}
                name="email"
                requiredMessage="Email is required"
                invalidMassage="Invalid email address"
                placeholder="Enter you email"
                pattern={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/}
                errors={errors}
              />
              <InputController
                control={control}
                name="password"
                requiredMessage="Password is required"
                invalidMassage="Password must be exactly 6 characters"
                placeholder="Enter password "
                isPassword={true}
                pattern={/^\w{6}$/}
                errors={errors}
              />
              <InputController
                control={control}
                name="passwordAgain"
                requiredMessage="Password again is required"
                invalidMassage="Password must be exactly 6 characters"
                placeholder="Enter password again"
                isPassword={true}
                pattern={/^\w{6}$/}
                errors={errors}
              />
              <Button
                variant="primary"
                fontSize="md"
                size="lg"
                onPress={handleSubmit(onSubmit)}>
                Submit
              </Button>
            </View>
            <Gap height={6} />
            <TouchableOpacity
              style={styles.width100}
              onPress={() => props.navigation.navigate('login')}>
              <Text style={[typographyStyles.label, styles.loginAccountText]}>
                Already have an account ?
                <Text style={{color: colors.sulu}}> login</Text>
              </Text>
            </TouchableOpacity>
          </View>
          <Button
            variant="secondary"
            fontSize="md"
            size="lg"
            onPress={() => ToastAndroid.show('Coming soon', ToastAndroid.SHORT)}
            style={styles.googleButtonView}>
            <View style={styles.googleButtonInner}>
              <GoogleLogo />
              <Text style={[typographyStyles.label, styles.googleButtonText]}>
                Continue with google
              </Text>
            </View>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  layout: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  innerLayout: {
    width: '100%',
    height: '100%',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  titleText: {color: colors.white, textAlign: 'center'},
  subtitleText: {color: colors.gray500, textAlign: 'center'},
  formView: {
    width: '100%',
    gap: 5,
    alignItems: 'center',
  },
  loginAccountText: {
    textAlign: 'left',
    color: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  googleButtonView: {
    marginBottom: 30,
  },
  googleButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 19,
  },
  googleButtonText: {color: colors.sulu, fontFamily: fonts.RubikMedium},
  width100: {width: '100%', gap: 15},
});
