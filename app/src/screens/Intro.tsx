import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import defaultProps from '../types/props';
import globalStyles from '../styles/style';
import RobotWithCredit from '../assets/svg/RobotWithCredit';
import Button from '../components/interface/Button';
import typographyStyles from '../constants/typography';
import colors from '../constants/colors';
import Gap from '../components/interface/Gap';
import RobotWithLaptop from '../assets/svg/RobotWithLaptop';
import RobotWithOllama from '../assets/svg/RobotWithOllama';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = defaultProps & {};

const Intro: React.FC<Props> = props => {
  const [introIndex, setIntroIndex] = useState(0);

  useEffect(() => {
    AsyncStorage.setItem('chatModel', 'ollama');
  }, []);

  const content = [
    {
      robot: <RobotWithCredit />,
      title: 'Smart Credit System',
      para: 'Buy, spend, and manage credits effortlessly for enhanced interactions.',
      nextRoute: '',
    },
    {
      robot: <RobotWithLaptop />,
      title: 'Intelligent Image Analysis',
      para: 'Upload images and let GigaCortex extract insights instantly.',
      nextRoute: '',
    },
    {
      robot: <RobotWithOllama />,
      title: 'Ollama Open-souce modal',
      para: 'GigaChat use ollama chat modal for Fast and batter response.',
      nextRoute: '',
    },
  ];

  return (
    <View style={globalStyles.container}>
      <View style={styles.layoutView}>
        {content[introIndex].robot}
        <Text style={[typographyStyles.h1, styles.title]}>
          {content[introIndex].title}
        </Text>
        <Gap height={12} />
        <Text style={[typographyStyles.label, styles.para]}>
          {content[introIndex].para}
        </Text>
        <Gap height={36} />
        <Button
          variant="primary"
          size="lg"
          fontSize="md"
          onPress={() => {
            if (introIndex === 2) {
              return props.navigation.navigate('login');
            }
            setIntroIndex(pre => pre + 1);
          }}>
          Next
        </Button>
      </View>
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({
  layoutView: {
    height: '100%',
    paddingBottom: 24,
    justifyContent: 'flex-end',
    width: '100%',
    alignItems: 'center',
  },
  title: {color: colors.white, textAlign: 'center'},
  para: {color: colors.gray500, textAlign: 'center'},
});
