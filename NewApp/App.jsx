import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet,Text, TextInput, View, Dimensions, ScrollView, Platform,TouchableOpacity, StatusBar as RNStatusBar } from 'react-native';
import { NavigationContainer,  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainScreen from './MainScreen';
import UsernameScreen from './SignupScreens/username';
import PasswordScreen from './SignupScreens/password';
import { yourip } from './helpers/keys'
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function MyStack() {
  let [fontsLoaded] = useFonts({
    'Lobster-Regular': require('./assets/fonts/Lobster-Regular.ttf'),
    'Billabong': require('./assets/fonts/Billabong.ttf'),
    'Cookie-Regular': require('./assets/fonts/Cookie-Regular.ttf'),
    'Engagement-Regular': require('./assets/fonts/Engagement-Regular.ttf'),
    'Ramabhadra-Regular': require('./assets/fonts/Ramabhadra-Regular.ttf'),
    'Teko-Regular': require('./assets/fonts/Teko-Regular.ttf'),
    'Parisienne-Regular' : require('./assets/fonts/Parisienne-Regular.ttf'),
    'CourierPrime-Bold' : require('./assets/fonts/CourierPrime-Bold.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  // const [isLoggedIn, setLoggedIn] = useState(false)
  // const detectLogin = async() => {
  //   const token = await AsyncStorage.getItem('token')
  //   if (token) {
  //     setLoggedIn(true)
  //   } else {
  //     setLoggedIn(false)
  //   }
  // }
  // useEffect(() => {
  //   detectLogin()
  // }, [])
  return(
    <NavigationContainer>
      <Stack.Navigator>
            {/* <Stack.Screen
              name="loading"
              component={LoadingScreen}
              options={{ headerShown: false}}
            /> */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="UsernameScreen"
          component={UsernameScreen}
          options={{ headerShown: false }}
        />
            
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const sendCreds = () => {
    fetch(`http://${yourip}:3000/signin`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "username": username,
      "password": password
    })
  })
  .then((response) => response.json())
  .then( async (data) => {
    console.log(data)
    try {
      await AsyncStorage.setItem('token', data.token);
      navigation.replace('Main')
    } catch (error) {
      console.log(error)
    }
  })
  .catch((error) => {
    console.log(error.message);
    throw error;
  })
    // Signin(username, password)
    
  }
  return (
    <View style={{flex:1, backgroundColor: '#ffffff', marginTop: Platform.OS === 'web' ? 0 :RNStatusBar.currentHeight}}>
      <StatusBar style="auto"/>
      <ScrollView style={styles.main}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{color: '#777777', alignSelf: 'center'}}>English(United States) </Text>
          <MaterialIcons name="keyboard-arrow-down" color={'#777777'} size={26} style={{marginVertical: 10}}/>
        </View>
      <View style={styles.container}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginBottom: 10}}>
          <Text style={styles.i}>I</Text>
          <Text style={styles.words}>nstagram</Text>
        </View>
      <TextInput
        style={styles.inputFields}
        placeholder="Phone number, email or username"
        placeholderTextColor="#727272"
        value={username}
        onChangeText={text => setUsername(text)}
        textContentType="username"
      />
      <TextInput
        style={styles.inputFields}
        placeholder="Password"
        placeholderTextColor="#727272"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
        textContentType="password"
      />
      <TouchableOpacity
      style={styles.buttons}
      onPress={() =>
        sendCreds()
      }>
        <Text style={styles.logi}>Login</Text>
      </TouchableOpacity>
      <View style={styles.btmm}>
        <Text style={styles.texts}>Forgot your login details?</Text>
        <Text style={styles.teexts}
        onPress={() =>
        console.log("help")
      }>Get help logging in.</Text>
      </View>
      <View style={styles.btmm}>
      <View style={{height: 1, width: 140, backgroundColor: '#e2e2e2'}}></View>
      <Text style={{color: '#adadad',padding: 5, fontWeight: 'bold'}}>OR</Text>
      <View style={{height: 1, width: 140, backgroundColor: '#e2e2e2'}}></View>
      </View>
      <View style={styles.btmm}>
        <FontAwesome5 name="facebook" color={'#2778e2'} size={26} />
        <Text style={styles.teeexts}>Log in with Facebook</Text>
      </View>
      <View style={styles.line}></View>
      <View style={styles.btm}>
        <Text style={styles.texts}>Don't have an account?</Text>
        <Text style={styles.teexts}
        onPress={() =>
          navigation.replace('UsernameScreen')
      }>Sign up.</Text>
      </View>
    </View>
    </ScrollView>
    </View>
    
  );
};



const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: '#e2e2e2',
    marginTop: 130,
    width: Dimensions.get('window').width
},
  texts:{
    color: '#777777',
    padding: 5,
  },
  teexts:{
    color: '#28386d',
    paddingLeft: 3,
    fontWeight: 'bold'
  },
  teeexts:{
    paddingLeft: 3,
    color: '#2778e2',
    fontWeight: 'bold'
  },
  tabname:{
    fontSize: 20,
  color: '#ffffff',
},
  main: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    marginTop: 130,
    // alignItems: 'center',
    // backgroundColor: '#000000',
    // justifyContent: 'center',
  },
  btm: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'

  },
  btmm: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  i:{
    fontFamily: 'Engagement-Regular',
    color: '#000000',
    fontSize: 46,
    marginBottom: 10,
    alignSelf: 'center'
  },
  words:{
    fontFamily: 'Cookie-Regular',
    color: '#000000',
    fontSize: 50,
    marginBottom: 10,
    alignSelf: 'center'
  },
  logi:{
    color: '#fff',
    alignSelf: 'center',
    fontSize: 15,
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
  //slider
  containerz: {
    height: 200,
    flex: 1,
  },
  item: {
    width: 200,
    height: 200,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: '#ff000000',
    borderRadius: 8,
    width: 200,
    height: 200,
  },
  image: {
    height: 200,
    width: 200,
    resizeMode: 'cover',
  },
});


// 5736