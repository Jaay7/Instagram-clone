import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet,Text, TextInput, View, ScrollView, Dimensions, Platform, Alert,TouchableOpacity, StatusBar as RNStatusBar } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { yourip } from '../helpers/keys'
const SignupScreen = ({ route, navigation }) => {

    const { username, password } = route.params;

    const sendCred = () => {
      fetch(`http://${yourip}:3000/signup`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "username" : username,
          "password": password,
        })
      })
      .then((res) => res.json())
      .then( async (data) => {
        console.log(data)
        try {
          await AsyncStorage.setItem('token', data.token);
          navigation.replace('Main')
        } catch (error) {
          console.log(error)
        }
      })
    }
  return(
    <View style={{flex:1, backgroundColor: '#ffffff', marginTop: Platform.OS === 'web' ? 0 :RNStatusBar.currentHeight}}>
      <StatusBar style="auto"/>
        <View style={styles.container}>
        <Text style={styles.words}>Welcome to Instagram, {username}</Text>
        <Text style={{alignSelf: 'center', padding: 10, color: '#727272', width: 260, lineHeight: 20, textAlign: 'center'}}>You can update this info anytime in Settings, or enter new info now.</Text>
        <TouchableOpacity
        style={styles.buttons}
        onPress={() => sendCred() }>
          <Text style={styles.logi}>Complete Sign Up</Text>
        </TouchableOpacity>
        <Text onPress={() => navigation.navigate('EmailAndPhone', {'username': username, 'password': password})} style={styles.texts}>Add New Phone or Email</Text>
      </View>
      {/* <View style={styles.line}></View> */}
      <View style={styles.footer}>
      <View style={styles.btm}>
        <Text style={{color: '#777777'}}>Already have an account</Text>
        <Text onPress={() =>
        navigation.replace('Login')
      } style={{color: '#28386d', fontWeight: 'bold'}}> SignIn</Text>
      </View>
      </View>
     </View>
    );
  };
export default SignupScreen;
const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: '#e2e2e2',
    marginTop: 130,
    width: Dimensions.get('window').width
  },
    texts:{
      color: '#2778e2',
      padding: 10,
      alignSelf: 'center',
      fontWeight: 'bold'
    },
    main: {
      flex: 1,
      backgroundColor: '#ffffff',
      marginTop: Platform.OS === 'web' ? 0 :RNStatusBar.currentHeight
    },
    container: {
      flex: 1,
      marginTop: 150,
    },
    footer: {
      position: 'absolute',
      flex:0.1,
      left: 0,
      right: 0,
      bottom: -10,
      flexDirection:'row',
      height: 55,
      alignItems:'center',
      borderTopColor: '#e2e2e2',
      justifyContent: 'center',
      alignItems: 'center',
    borderTopWidth: 1 
    },
    btm: {
      display: 'flex',
      flexDirection: 'row',
    },
    btmm: {
      marginBottom: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    words:{
      color: '#000000',
      fontSize: 26,
      width: 300,
      marginBottom: 10,
      alignSelf: 'center',
      textAlign: 'center'
    },
    logi:{
      color: '#fff',
      alignSelf: 'center',
      // fontSize: 16,
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