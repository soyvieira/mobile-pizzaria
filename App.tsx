import { StatusBar, View, Text } from 'react-native';

export default function App() {
  return (
    <View>
      <StatusBar backgroundColor='#000' barStyle='light-content' translucent={false}/>
      <Text>
        Hello, world!
      </Text>
    </View>
  )
}