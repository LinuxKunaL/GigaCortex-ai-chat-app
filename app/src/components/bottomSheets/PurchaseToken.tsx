import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import RawBottomSheet from 'react-native-raw-bottom-sheet';
import React from 'react';
import {RBSheetRef} from '../../types/rbSheetRef';
import typographyStyles from '../../constants/typography';
import IconButton from '../interface/IconButton';
import colors from '../../constants/colors';
import globalStyles from '../../styles/style';
import Icon from '../interface/Icon';
import sizes from '../../constants/sizes';
import Gap from '../interface/Gap';

type Props = {
  ref: RBSheetRef;
};
type TPricingItem = {
  id: number;
  token: number;
  price: number;
  isPopular: boolean;
};

const PurchaseToken = React.forwardRef<RBSheetRef, Props>(
  (props, ref: any): JSX.Element => {
    const pricing: TPricingItem[] = [
      {
        id: 1,
        token: 1999,
        price: 29,
        isPopular: false,
      },
      {
        id: 2,
        token: 4999,
        price: 69,
        isPopular: true,
      },
      {
        id: 3,
        token: 9999,
        price: 129,
        isPopular: true,
      },
      {
        id: 4,
        token: 2999,
        price: 39,
        isPopular: false,
      },
      {
        id: 5,
        token: 7999,
        price: 99,
        isPopular: true,
      },
    ];

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
                Purchase Token
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
                style={styles.tokenView}>
                <View style={styles.tokenTextsView}>
                  <Icon
                    name="star-circle"
                    size={sizes.xxl}
                    color={colors.sulu}
                  />
                  <Text style={[typographyStyles.title, {color: colors.white}]}>
                    {item.token} <Text style={styles.tokenText}>Tokens</Text>
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
