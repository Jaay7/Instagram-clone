import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { StyleSheet,Text, TextInput, View, ScrollView, Dimensions, Platform, Alert,TouchableOpacity, StatusBar as RNStatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from '@material-ui/core';
import Svg, {Use, Image,} from 'react-native-svg';
import { useFonts } from 'expo-font';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const EmailPhoneScreen = ({ route, navigation }) => {
  const { username, password } = route.params;
  return(
    <View style={{flex:1, backgroundColor: '#ffffff', marginTop: Platform.OS === 'web' ? 0 :RNStatusBar.currentHeight}}>
      <StatusBar style="auto"/>
      <View style={styles.container}>
        <Text style={styles.words}>Add Phone or Email</Text>
        <View style={{flex: 1, margin: 20}}>
          <Tab.Navigator
          swipeEnabled={false}
          tabBarOptions={{
            inactiveTintColor: '#c7c7c7',
            activeTintColor: '#000',
            style: {
                backgroundColor: '#fff',
            },
            indicatorStyle: {
                backgroundColor: '#000',
                height: 1
            }}}>
            <Tab.Screen
              name="Phone"
              children={()=> <PhoneTab route={route} navigation={navigation} />}
            />
            <Tab.Screen
              name="Email"
              children={()=> <EmailTab route={route} navigation={navigation} />}
            />
          </Tab.Navigator>
        </View>
      </View>
    </View>
  )
}

const EmailTab = ({route, navigation}) => {
    const { username, password } = route.params;
    const [email, setEmail] = useState('');
    const sendCred = () => {
      if(email !== '') {
        fetch("http://192.168.0.103:3000/signup", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "email" : email,
            "username" : username,
            "password": password
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
      else {
        console.log('email required')
      }
    }
  return(
    <View style={{flex:1, backgroundColor: '#fff', padding: 40}}>
        <TextInput
          style={styles.inputFields}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          textContentType="emailAddress"
        />
        <TouchableOpacity
        style={styles.buttons}
        onPress={() => sendCred() }>
          <Text style={styles.logi}>Complete Sign Up</Text>
        </TouchableOpacity>
        
     </View>
    );
};

const PhoneTab = ({route, navigation}) => {
  const { username, password } = route.params;
  const [phone, setPhone] = useState('');

  return(
    <View style={{flex: 1, backgroundColor: '#fff', padding: 40}}>
      <TextInput
        style={styles.inputFields}
        placeholder="Phone"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        textContentType="telephoneNumber"
      />
      <Text style={{alignSelf: 'center', padding: 10, color: '#727272', width: 260, lineHeight: 17, textAlign: 'center'}}>You may receive SMS updates from Instagram and can opt out at any time.</Text>
      <TouchableOpacity
      style={styles.buttons}
      onPress={() => console.log('phone') }>
        <Text style={styles.logi}>Complete Sign Up</Text>
      </TouchableOpacity>
    </View>
  )
}
export default EmailPhoneScreen;
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
      marginTop: 30,
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
      marginTop: 5,
    },
    inputFields:{
      color: '#000000',
      width: 300,
      height: 45,
      alignSelf: 'center',
      backgroundColor: '#f0f0f0',
      borderRadius: 4,
      marginBottom: 5,
      padding: 12,
      borderColor: '#d3d2d2',
      borderWidth: 1
      
    },
    
  });