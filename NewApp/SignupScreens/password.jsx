import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { StyleSheet,Text, TextInput, View, ScrollView, Dimensions, Platform, Alert,TouchableOpacity, StatusBar as RNStatusBar } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const PasswordScreen = ({ route, navigation }) => {
  const { username } = route.params;
  const [password, setPassword] = useState('');

  const sendPassword = () => {
    if(password === '') {
      console.log('password required')
    }
    else {
      navigation.navigate('Signup', {'username': username, 'password': password})
    }
  }
  return(
    <View style={{flex:1, backgroundColor: '#ffffff', marginTop: Platform.OS === 'web' ? 0 :RNStatusBar.currentHeight}}>
      <StatusBar style="auto"/>
      <ScrollView style={styles.main}>
        <View style={styles.container}>
        <Text style={styles.words}>Create a Password</Text>
        <Text style={{alignSelf: 'center', padding: 10, color: '#727272', textAlign: 'center', width: 260, lineHeight: 23}}>For security, your password must be 6 characters or more.</Text>
        <TextInput
          style={styles.inputFields}
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          textContentType="password"
          
        />
        
        <TouchableOpacity
        style={styles.buttons}
        onPress={() => sendPassword() }>
          <Text style={styles.logi}>Next</Text>
        </TouchableOpacity>
      </View>
     </ScrollView>
     </View>
    );
  };
export default PasswordScreen;
const styles = StyleSheet.create({
  
    main: {
      flex: 1,
      backgroundColor: '#ffffff',
      marginTop: Platform.OS === 'web' ? 0 :RNStatusBar.currentHeight
    },
    container: {
      flex: 1,
    },
    words:{
      color: '#000000',
      fontSize: 26,
      alignSelf: 'center'
    },
    logi:{
      color: '#fff',
      alignSelf: 'center',
      // fontSize: 18,
    },
    buttons:{
      alignSelf: 'center',
      backgroundColor: '#2778e2',
      padding: 12,
      width: 300,
      borderRadius: 4,
      marginBottom: 15,
    },
    inputFields:{
      color: '#000000',
      width: 300,
      height: 45,
      alignSelf: 'center',
      backgroundColor: '#f0f0f0',
      borderRadius: 4,
      marginBottom: 15,
      padding: 12,
      borderColor: '#d3d2d2',
      borderWidth: 1
      
    },
    
  });