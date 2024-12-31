import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RobotSayHello from '../../assets/svg/RobotSayHello';
import Button from '../../components/interface/Button';
import typographyStyles from '../../constants/typography';
import colors from '../../constants/colors';
import Gap from '../../components/interface/Gap';
import sizes from '../../constants/sizes';
import {ScrollView} from 'react-native';
import spaces from '../../constants/spaces';
import {useFocusEffect} from '@react-navigation/native';
import defaultProps from '../../types/props';

type Props = defaultProps & {};

const Home: React.FC<Props> = props => {
  const demoPrompts = [
    [
      '🍏 Secrets of apples!',
      '🚀 Explore galaxies!',
      '🎨 Paint your dreams!',
      '🐾 Follow the wild!',
      '📚 Unlock tales!',
      '🌊 Dive into mysteries!',
      '🔮 Crystal ball secrets!',
    ],
    [
      '🧩 Solve the puzzle!',
      '🎶 Tune into life!',
      '🏰 Find hidden treasures!',
      '🌟 Shine like stars!',
      '🧙‍♂️ Cast magic spells!',
      '🚲 Relive childhood!',
    ],
    [
      '🎭 Step into stories!',
      '⏳ Travel through time!',
      '🌌 Wander the cosmos!',
      '🧵 Stitch hope together!',
      '🏹 Chase legends!',
      '🎡 Spin fortune’s wheel!',
      '🌻 Grow your dreams!',
    ],
  ];

  const scrollViewRef = React.useRef<ScrollView[]>([]);

  useFocusEffect(() => {
    setTimeout(() => {
      scrollViewRef.current.map(scr =>
        scr.scrollTo({x: Math.random() * 540, animated: true}),
      );
    }, 200);
  });

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.robotView}>
          <RobotSayHello />
          <Gap height={sizes.xs} />
          <Text style={[typographyStyles.title, {color: colors.gray500}]}>
            How can i help you ?
          </Text>
          <Button
            variant="primary"
            size="lg"
            fontSize="sm"
            style={styles.buttonView}
            onPress={() => props.navigation.navigate('chat')}>
            Start a new chat
          </Button>
        </View>
      </View>
      <Gap height={sizes.xxl * 1.4} />
      <View style={styles.promptView}>
        {[0, 1, 2].map(item => (
          <ScrollView
            key={item}
            ref={(el: ScrollView) => {
              scrollViewRef.current[item] = el;
            }}
            showsHorizontalScrollIndicator={false}
            horizontal>
            <View style={styles.promptRowView}>
              {demoPrompts[item].map((prompt, index) => (
                <Text
                  key={index}
                  style={[typographyStyles.subtitle, styles.promptText]}>
                  {prompt}
                </Text>
              ))}
            </View>
          </ScrollView>
        ))}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  robotView: {
    alignItems: 'center',
    gap: 10,
  },
  promptView: {height: 100, gap: 12},
  promptRowView: {
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    transformOrigin: 'center',
  },
  promptText: {
    backgroundColor: colors.gray,
    paddingHorizontal: 10,
    paddingVertical: 3,
    color: colors.white,
    borderRadius: spaces.radius - 2,
  },
  buttonView: {
    width: 'auto',
    paddingHorizontal: 30,
  },
});
