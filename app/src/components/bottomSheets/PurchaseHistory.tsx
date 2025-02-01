import {ScrollView, StyleSheet, Text, View} from 'react-native';
import RawBottomSheet from 'react-native-raw-bottom-sheet';
import React, {useCallback, useEffect, useState} from 'react';
import {RBSheetRef} from '../../types/rbSheetRef';
import typographyStyles from '../../constants/typography';
import IconButton from '../interface/IconButton';
import colors from '../../constants/colors';
import globalStyles from '../../styles/style';
import sizes from '../../constants/sizes';
import Gap from '../interface/Gap';
import fonts from '../../constants/fonts';
import useCredit from '../../hooks/useCredit';

type Props = {
  ref: RBSheetRef;
  transactionHistory: {
    date: string;
    credit: number;
    amount: number;
    paymentId: string;
  }[];
};
type TPurchaseHistory = {
  credits: number;
  amount: number;
  razorpayId: string;
  createdAt: Date;
  paymentStatus: string;
};

const PurchaseHistory = React.forwardRef<RBSheetRef, Props>(
  (props, ref: any): JSX.Element => {
    const {getPurchasedHistory} = useCredit();
    const [purchaseHistory, setPurchaseHistory] = useState<TPurchaseHistory[]>(
      [],
    );

    const fetching = useCallback(async () => {
      const result = await getPurchasedHistory();
      setPurchaseHistory(result);
    }, [getPurchasedHistory]);

    useEffect(() => {
      fetching();
    }, [fetching]);

    console.log(purchaseHistory);

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
                Purchase history
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
          <ScrollView>
            <View style={{gap: sizes.xs}}>
              {purchaseHistory.map((item, index) => (
                <View style={styles.itemView} key={index}>
                  <View style={styles.itemInnerView}>
                    <View style={styles.tokenOrTotal}>
                      <Text style={styles.itemText}>
                        Credit :{' '}
                        <Text style={styles.itemSubtext}>{item.credits}</Text>
                      </Text>
                      <Text style={styles.itemText}>
                        Total :{' '}
                        <Text style={styles.itemSubtext}>₹{item.amount}</Text>
                      </Text>
                    </View>
                    <Text style={styles.itemText}>
                      Payment id :
                      <Text style={styles.itemSubtext}> {item.razorpayId}</Text>
                    </Text>
                    <Text style={styles.itemText}>
                      Date :
                      <Text style={styles.itemSubtext}>
                        {' '}
                        {new Date(item.createdAt as any).toDateString()}
                      </Text>
                    </Text>
                  </View>
                </View>
              ))}
              {purchaseHistory.length === 0 && (
                <Text style={{...styles.itemText, color: colors.gray100}}>
                  No transaction history
                </Text>
              )}
            </View>
          </ScrollView>
        </View>
      </RawBottomSheet>
    );
  },
);

export default PurchaseHistory;

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
  itemView: {
    ...globalStyles.border,
    padding: sizes.xs,
    backgroundColor: colors.gray,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  itemInnerView: {
    gap: sizes.xs - 4,
  },
  tokenOrTotal: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  itemText: {
    ...typographyStyles.title,
    color: colors.white,
    fontFamily: fonts.RubikRegular,
  },
  itemSubtext: {color: colors.sulu, fontSize: sizes.sm - 1},
});
