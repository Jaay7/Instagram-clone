import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { StyleSheet,Text, TextInput, View, ScrollView, Dimensions, Platform, Alert,TouchableOpacity, StatusBar as RNStatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import PasswordScreen from './password';
import SignupScreen from './signup';
import EmailPhoneScreen from './EmailAndPhone';

const Stack = createStackNavigator();

const UsernameScreen = ({ navigation }) => {
  return(
    <View style={{flex: 1}}>
      <Stack.Navigator>
        <Stack.Screen 
          name="username" 
          component={userName}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="PasswordScreen"
          component={PasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="EmailAndPhone" 
          component={EmailPhoneScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </View>
  )
}

const userName = ({navigation}) => {
  const [username, setUsername] = useState('');
  const sendUsername = () => {
    if (username === '') {
      console.log('username required')
    }
    else {
      navigation.navigate('PasswordScreen', {'username': username})
    }
  }
  return(
    <View style={{flex:1, backgroundColor: '#ffffff', marginTop: Platform.OS === 'web' ? 0 :RNStatusBar.currentHeight}}>
      <StatusBar style="auto"/>
      <ScrollView style={styles.main}>
        <View style={styles.container}>
        <Text style={styles.words}>Choose Username</Text>
        <Text style={{alignSelf: 'center', padding: 10, color: '#727272'}}>You can always change it later.</Text>
        <TextInput
          style={styles.inputFields}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          textContentType="username"
        />
        <TouchableOpacity
        style={styles.buttons}
        onPress={() => sendUsername() }>
          <Text style={styles.logi}>Next</Text>
        </TouchableOpacity>
      </View>
     </ScrollView>
     </View>
    );
  };
export default UsernameScreen;
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