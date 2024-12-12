import React from 'react';
import Splash from './screens/Splash';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import colors from './constants/colors';
import Intro from './screens/Intro';
import Login from './screens/Login';
import Register from './screens/Register';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  const options: {} = {
    headerShown: false,
    animation: 'default',
  };
  return (
    <NavigationContainer>
      <StatusBar translucent={false} backgroundColor={colors.dark} />
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen options={options} name="splash" component={Splash} />
        <Stack.Screen options={options} name="intro" component={Intro} />
        <Stack.Screen options={options} name="login" component={Login} />
        <Stack.Screen options={options} name="register" component={Register}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
