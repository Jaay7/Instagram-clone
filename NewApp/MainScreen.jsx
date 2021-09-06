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
import SignupScreen from './SignupScreens/signup';
import HomeScreen from './home';
import MyDrawer from './BottomTab/profile';
import InboxScreen from './inbox';
import SearchScreen from './BottomTab/search';
import SettingsScreen from './settings';
import CameraScreen from './camera';
import StoryScreen from './Story';
import PrivacyScreen from './settingsTypes/privacy';
import SecurityScreen from './settingsTypes/security';
import ExploreScreen from './Explore';
import EditProfileScreen from './EditProfile';
import IGTVDiscoverScreen from './IGTVDiscover';
import PersonalInfoScreen from './PersonalInfo';
import RecomendedSearchesScreen from './RecSearches';
import CameraSettingsScreen from './CameraSettings';
import CloseFriendsScreen from './storysettings/CloseFriends';
import HideStoryScreen from './storysettings/HideStoryFrom';
import ChatsScreen from './Chats/ChatBox';
import ChatDetailsScreen from './Chats/ChatDetailsScreen';
import OthersProfileScreen from './OthersProfile';
import FAndFScreen from './profile/FAndF';
import ReelsScreen from './BottomTab/Reels';
import ArchiveScreen from './SideDrawer/Archive';
import LoadingScreen from './LoadingScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function MainScreen() {
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
      <Stack.Navigator>
              <Stack.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ headerShown: false }}
                />
              <Stack.Screen 
                name="Camera" 
                component={CameraScreen} 
                options={{ headerShown: false }}
                />
              <Stack.Screen 
                name="Inbox" 
                component={InboxScreen} 
                options={{ headerShown: false }}
                />
              <Stack.Screen 
                name="Reel" 
                component={ReelsScreen} 
                options={{ headerShown: false }}
                />

              <Stack.Screen 
                name="Story" 
                component={StoryScreen} 
                options={{ headerShown: false }}
                />
              <Stack.Screen 
                name="EditProfile" 
                component={EditProfileScreen} 
                options={{ headerShown: false }}
                />
              <Stack.Screen 
                name="PersonalInfo" 
                component={PersonalInfoScreen} 
                options={{ headerShown: false }}
                />
              <Stack.Screen 
                name="IGTVDiscover" 
                component={IGTVDiscoverScreen} 
                options={{ headerShown: false }}
                />
              <Stack.Screen 
                name="ChatsScreen" 
                component={ChatsScreen} 
                options={{ headerShown: false }}
                />
              <Stack.Screen 
                name="ChatDetails" 
                component={ChatDetailsScreen} 
                options={{ headerShown: false }}
                />
              <Stack.Screen 
                name="CameraSettings" 
                component={CameraSettingsScreen} 
                options={{ headerShown: false }}
                />
              <Stack.Screen 
                name="CloseFriends" 
                component={CloseFriendsScreen} 
                options={{ headerShown: false }}
                />
              <Stack.Screen 
                name="HideStoryFrom" 
                component={HideStoryScreen} 
                options={{ headerShown: false }}
                />
              <Stack.Screen 
                name="OthersProfile" 
                component={OthersProfileScreen} 
                options={{ headerShown: false }}
                />
              <Stack.Screen 
                name="Archive" 
                component={ArchiveScreen} 
                options={{ headerShown: false }}
              />
              
      </Stack.Navigator>
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