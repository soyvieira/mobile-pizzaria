import React, {useState, useContext} from 'react';
import {
  View, 
  Text, 
  ImageBackground,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import { AuthContext } from '../../contexts/AuthContext';

export default function SignIn(){
  const { signIn, loadingAuth } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(){

    if( email === '' || password ===''){
      alert('Please, type your email and password')
      return;
    }

    await signIn({email, password});

  }

  return(
    <ImageBackground source={require('../../assets/background-image.jpg')} style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/logo.png')}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email'
          style={styles.input}
          placeholderTextColor='#C3c1c1'
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder='Password'
          style={styles.input}
          placeholderTextColor='#C3c1c1'
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          {loadingAuth ? (
            <ActivityIndicator size={25} color='#fff' />
          ) : (
           <Text style={styles.buttonText}>Log in</Text>
          )}
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo:{
    marginBottom:10
  },
  inputContainer:{
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 14
  },
  input:{
    fontSize: 18,
    width: '90%',
    height: 40,
    backgroundColor: '#f5f5f5',
    marginBottom: 25,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: '#000'
  },
  button:{
    width: '90%',
    height: 40,
    backgroundColor: '#EC5453',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 14
  },
  buttonText:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F5F5F5'
  }
})