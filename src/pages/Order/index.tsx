import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { api } from '../../services/api';

type RouteDetailParams = {
  Order:{
    number: string | number;
    order_id: string;
  }
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export default function Order(){
  const route = useRoute<OrderRouteProps>();
  const navigation= useNavigation();

  async function handleCloseOrder(){
    try{
      await api.delete('/order', {
        params: {
          order_id: route.params?.order_id
        }
      })

      navigation.goBack();

    }catch(err){
      console.log(err);
    }
  }

  return(
    <ImageBackground 
      source={require('../../assets/background-image.jpg')} 
      style={styles.container}
    >
      <View style={styles.header}>
        <Text
          style={styles.title}
        >
          Table {route.params.number}
        </Text>
        <TouchableOpacity onPress={handleCloseOrder}>
          <Feather name='trash-2' size={30} color='#EC5453' />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.input}>
        <Text style={{color: '#000'}}>Select category</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.input}>
        <Text style={{color: '#000'}}>Select item</Text>
      </TouchableOpacity>

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Amount</Text>
        <TextInput
          placeholder='1'
          placeholderTextColor='#000'
          keyboardType='numeric'
          style={[styles.input, {width: '70%', textAlign: 'center'}]}
        />
      </View>
      <View style={styles.actions}>

        <TouchableOpacity style={styles.buttonAdd}>
          <Text style={styles.buttonAddText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: '10%',
    paddingEnd: '8%',
    paddingStart: '8%'
  },
  header:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 30,
  },
  title:{
    fontSize: 30,
    fontWeight: '300',
    color: '#f5f5f5',
    paddingRight: 30
  }, 
  input:{
    backgroundColor: '#f5f5f5',
    marginBottom: 25,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: '#000',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    fontSize: 18
  },
  qtdContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  qtdText:{
    fontSize: 18,
    color: '#fff'
  },
  actions:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 30
  },
  buttonAdd:{
    backgroundColor: '#086500',
    borderRadius: 8,
    height: 40,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonAddText:{
    color: '#f5f5f5',
    fontSize: 22,
    fontWeight: 'bold'
  },
  button:{
    backgroundColor: '#EC5453',
    width: '70%',
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    color: '#f5f5f5',
    fontSize: 18,
    fontWeight: '600'
  }
})