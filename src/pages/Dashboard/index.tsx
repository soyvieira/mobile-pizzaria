import React, {useContext} from "react";
import {View, Text, Button} from 'react-native';
import { AuthContext } from "../../contexts/AuthContext";

export default function Dashboard(){

  const { signOut } = useContext(AuthContext);

  return(
    <View>
      <Text>Dashboard here!</Text>
      <Button
        title='Log out'
        onPress={signOut}
      />
    </View>
  )
}