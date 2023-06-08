import React from 'react';
import {
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/app.routes';
import { api } from '../../services/api';

type RouteDetailParams = {
  FinishOrder: {
    number: string | number;
    order_id: string;
  }
}

type FinishOrderRouteProp = RouteProp<RouteDetailParams, 'FinishOrder'>

export default function FinishOrder(){

  const route = useRoute<FinishOrderRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  async function handleFinish(){
    try{
      await api.put('/order/send', {
        order_id: route.params?.order_id
      })
      navigation.popToTop(); // Go back to dashboard

    }catch(err){
      console.log('Error while finalizing the order. Error: ' + err);
    }
  }

  return(
    <ImageBackground 
      source={require('../../assets/background-image.jpg')} 
      style={styles.container}
    >
      <Text style={styles.alert}>
        Do you want to send the order?
      </Text>
      <Text style={styles.title}>
        Table {route.params?.number}
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <Text style={styles.buttonText}>
          Send order
        </Text>
        <Feather name='shopping-cart' size={20} color='#f5f5f5' style={ { marginLeft:12}} />
      </TouchableOpacity>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: '10%',
    paddingEnd: '8%',
    paddingStart: '8%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  alert:{
    fontSize: 20,
    color: '#f5f5f5',
    marginBottom: 30
  },
  title:{
    fontSize: 34,
    color: '#f5f5f5',
    marginBottom: 40
  },
  button:{
    backgroundColor: '#EC5453',
    width: '90%',
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  buttonText:{
    color: '#f5f5f5',
    fontSize: 18,
    fontWeight: '600'
  }
})