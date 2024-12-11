import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import defaultProps from '../types/props'

type Props = defaultProps & {}

const Login: React.FC<Props> = props => {
  return (
    <View>
      <Text onPress={()=>props.navigation.navigate("intro")}>Login</Text>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})