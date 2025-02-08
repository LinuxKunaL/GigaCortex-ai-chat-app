import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import Gap from '../interface/Gap';
import Icon from '../interface/Icon';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/redux';
import sizes from '../../constants/sizes';
import colors from '../../constants/colors';
import RNRestart from 'react-native-restart';
import useCredit from '../../hooks/useCredit';
import globalStyles from '../../styles/style';
import IconButton from '../interface/IconButton';
import {RBSheetRef} from '../../types/rbSheetRef';
import typographyStyles from '../../constants/typography';
import RawBottomSheet from 'react-native-raw-bottom-sheet';
import React, {useCallback, useEffect, useState} from 'react';
import RazorpayCheckout, {
  CheckoutOptions,
  SuccessResponse,
} from 'react-native-razorpay';

type Props = {
  ref: RBSheetRef;
};
type TPricingItem = {
  id: number;
  credit: number;
  price: number;
  isPopular: boolean;
};

const PurchaseToken = React.forwardRef<RBSheetRef, Props>(
  (props, ref: any): JSX.Element => {
    const me = useSelector((state: RootState) => state.me);
    const [pricing, setPricing] = useState<TPricingItem[]>([]);
    const {getCreditPricing, getOrder, paymentCredit} = useCredit();
    var options: CheckoutOptions = {
      description: 'Credits towards consultation',
      image: 'https://i.postimg.cc/DzDnRzbS/App-logo.png',
      currency: 'INR',
      key: process.env.RAZORPAY_KEY_ID as string,
      name: 'Purchase Credits',
      amount: 0,
      order_id: '',
      prefill: {
        email: me.email,
        contact: '9999999999',
        name: me.name,
      },
      theme: {color: colors.sulu},
    };

    const fetchPricing = useCallback(async () => {
      const result = await getCreditPricing();
      setPricing(result);
    }, [getCreditPricing]);

    useEffect(() => {
      fetchPricing();
    }, [fetchPricing]);

    const handlePurchaseCredit = async (id: number) => {
      const result = await getOrder(id);

      options.amount = result.amount;
      options.order_id = result.id;

      RazorpayCheckout.open(options)
        .then(async (pay: SuccessResponse) => {
          const data = {
            paymentId: pay.razorpay_payment_id,
            orderId: pay.razorpay_order_id,
            creditId: id,
            _id: result._id,
          };
          const res = await paymentCredit(data);
          ToastAndroid.show(res.message, ToastAndroid.SHORT);
          ref.current?.close();
          RNRestart.restart();
        })
        .catch((error: any) => {
          console.log(error);
          ToastAndroid.show('Error: ' + error, ToastAndroid.LONG);
        });
    };

    return (
      <RawBottomSheet
        ref={ref}
        height={430}
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
                Purchase Credit
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
          <View style={{gap: sizes.xs}}>
            {pricing.map(item => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.7}
                onPress={() => handlePurchaseCredit(item.id)}
                style={styles.tokenView}>
                <View style={styles.tokenTextsView}>
                  <Icon
                    name="star-circle"
                    size={sizes.xxl}
                    color={colors.sulu}
                  />
                  <Text style={[typographyStyles.title, {color: colors.white}]}>
                    {item.credit} <Text style={styles.tokenText}>Credits</Text>
                  </Text>
                  <Text>
                    {item.isPopular && (
                      <Icon name="fire" size={sizes.md} color={colors.red} />
                    )}
                  </Text>
                </View>
                <Text style={[typographyStyles.title, {color: colors.white}]}>
                  <Text style={{color: colors.sulu}}>₹ </Text>
                  {item.price}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </RawBottomSheet>
    );
  },
);

export default PurchaseToken;

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
  tokenView: {
    ...globalStyles.border,
    padding: sizes.xs,
    backgroundColor: colors.gray,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  tokenTextsView: {
    flexDirection: 'row',
    gap: sizes.xs - 4,
    alignItems: 'center',
  },
  tokenText: {color: colors.gray300, fontSize: sizes.sm},
});
