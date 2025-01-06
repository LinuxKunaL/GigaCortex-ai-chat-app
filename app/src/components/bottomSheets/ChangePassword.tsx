import {StyleSheet, Text, View} from 'react-native';
import RawBottomSheet from 'react-native-raw-bottom-sheet';
import React from 'react';
import {RBSheetRef} from '../../types/rbSheetRef';
import typographyStyles from '../../constants/typography';
import IconButton from '../interface/IconButton';
import colors from '../../constants/colors';
import globalStyles from '../../styles/style';
import sizes from '../../constants/sizes';
import Gap from '../interface/Gap';
import InputController from '../interface/InputController';
import {useForm} from 'react-hook-form';
import Button from '../interface/Button';

type Props = {
  ref: RBSheetRef;
};

const ChangePassword = React.forwardRef<RBSheetRef, Props>(
  (props, ref: any): JSX.Element => {
    const {
      control,
      handleSubmit,
      formState: {errors},
    } = useForm();

    const onSubmit = (params: any): void => {
      console.log(params);
    };
    return (
      <RawBottomSheet
        ref={ref}
        height={350}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
          container: globalStyles.bottomSheetContainer,
        }}
        customModalProps={{animationType: 'fade', statusBarTranslucent: true}}>
        <View style={styles.bottomSheetView}>
          <View style={styles.bottomSheetTitleView}>
            <View style={styles.titleView}>
              <Text style={[typographyStyles.title, {color: colors.white}]}>
                Change Password
              </Text>
            </View>
            <IconButton
              onPress={() => ref.current?.close()}
              variant="secondary"
              size="md"
              name="close"
              iconSize={20}
              color={colors.sulu}
            />
          </View>
          <Gap height={15} />
          <View style={styles.formView}>
            <InputController
              control={control}
              name="oldPassword"
              requiredMessage="old password is required"
              invalidMassage="Password must be exactly 6 characters"
              placeholder="Enter your old password"
              pattern={/^\w{6}$/}
              errors={errors}
            />
            <InputController
              control={control}
              name="newPassword"
              requiredMessage="new password is required"
              invalidMassage="Password must be exactly 6 characters"
              placeholder="Enter your new password"
              pattern={/^\w{6}$/}
              errors={errors}
            />
            <InputController
              control={control}
              name="confirmPassword"
              requiredMessage="confirm password is required"
              invalidMassage="Password must be exactly 6 characters"
              placeholder="Enter your confirm password"
              pattern={/^\w{6}$/}
              errors={errors}
            />
            <Button
              fontSize="md"
              size="lg"
              variant="primary"
              onPress={handleSubmit(onSubmit)}>
              Submit
            </Button>
          </View>
        </View>
      </RawBottomSheet>
    );
  },
);

export default ChangePassword;

const styles = StyleSheet.create({
  bottomSheetView: {height: '100%'},
  bottomSheetTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleView: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
  formView: {
    gap: sizes.xs,
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
});
