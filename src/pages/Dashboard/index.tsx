import React, {useState} from "react";
import {
  ImageBackground,
  Text, 
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/app.routes';
import { api } from '../../services/api';

//import { AuthContext } from "../../contexts/AuthContext";

export default function Dashboard(){

  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  //const { signOut } = useContext(AuthContext);

  const[ number, setNumber ] = useState('');

  async function openOrder() {
    if(number === ''){
      alert('Please, type a number')
      return;
    }

    const response = await api.post('/order', {
      table: Number(number)
    })
   
    //console.log(response.data);      
    navigation.navigate('Order', {number: number, order_id: response.data.id});
    setNumber('');

  }

  return(
      <ImageBackground 
        source={require('../../assets/background-image.jpg')} 
        style={styles.container}
      >
        <Text style={styles.title}>
          New Order
        </Text>
        <TextInput
          placeholder='Table number'
          placeholderTextColor='#c3c1c1'
          style={styles.input}
          keyboardType='numeric'
          value={number}
          onChangeText={setNumber}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={openOrder}
        >
          <Text style={styles.buttonText}>Open</Text>
        </TouchableOpacity>
      </ImageBackground>

  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    //paddingVertical: 15,
  },
  title:{
    fontSize: 30,
    fontWeight: '400',
    color: '#c3c1c1',
    marginBottom: 24,
  },
  input:{
    width: '50%',
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 22,
    color: '#000'
  },
  button:{
    width: '50%',
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    backgroundColor:'#EC5453'
  },
  buttonText:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F5F5F5'
  }
})