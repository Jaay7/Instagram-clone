import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { StyleSheet,Text, Modal, View, ScrollView, Dimensions, Platform, Alert,TouchableOpacity, StatusBar as RNStatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Input } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import PrivacyScreen from './settingsTypes/privacy';
import SecurityScreen from './settingsTypes/security';
import NotificationSettingsScreen from './settingsTypes/NotificationSettings';
import { Signout } from './helpers/auths';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const SettingsSc = ({navigation}) => {
  return(
    <View style={{flex:1}}>
      <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="Privacy" 
        component={PrivacyScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Security" 
        component={SecurityScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="NotificationSettings" 
        component={NotificationSettingsScreen} 
        options={{ headerShown: false }}
      />
      </Stack.Navigator>
    </View>
  )
}

const SettingsScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = React.useState('Light');

  const ThemeSelection = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

  const list = [
    {
      screen: 'Security',
      title: 'Follow and Invite Friends',
      icon: 'account-plus-outline',
    },
    {
      screen: 'NotificationSettings',
      title: 'Notifications',
      icon: 'bell-outline'
    },
    {
      screen: 'Privacy',
      title: 'Privacy',
      icon: 'lock-outline'
    },
    {
      screen: 'Security',
      title: 'Security',
      icon: 'security'
    },
    {
      screen: 'Security',
      title: 'Ads',
      icon: 'atom'
    },
    {
      screen: 'Security',
      title: 'Account',
      icon: 'account-circle-outline'
    },
    {
      screen: 'Security',
      title: 'Help',
      icon: 'help-rhombus-outline'
    },
    {
      screen: 'Security',
      title: 'About',
      icon: 'information-outline'
    },
    {
      screen: 'Security',
      title: 'Theme',
      icon: 'invert-colors'
    }
  ]
  const logout = async() => {
    await AsyncStorage.removeItem('token')
    .then(() => {
      navigation.replace('Login')
    })
  }
  return(
  <View style={styles.container}>
    <StatusBar style="auto" />
    <View style={styles.tabbar}>
        <AntDesign onPress={() => navigation.goBack() } name="arrowleft" color='#000' size={26} style={{ padding: 10}}  />
        <Text style={{color: '#000', fontSize: 19, paddingLeft: 10, fontWeight: '700' }}>Settings</Text>
      </View>
    <ScrollView>
      
      <Input 
      placeholder='Search'
      returnKeyType="search"
      placeholderTextColor="#727272"
      inputContainerStyle={{borderColor: '#00000000', marginTop: 15, backgroundColor: '#ececec', borderRadius: 10, height: 39}}
      style={{color: '#000', fontSize: 15}}
        leftIcon={
          <AntDesign name="search1" color='#727272' size={20} style={{paddingLeft: 5, paddingRight: 15}}  />
        }
      />
      <View>
        {list.map((index) => {
          return(
            <TouchableOpacity style={styles.listItems} 
              key={index.title}
              onPress={() => {
                index.title === 'Theme' ? setModalVisible(true) : navigation.navigate(index.screen)
              }}
            >
              <MaterialComunityIcons name={index.icon} size={27} color="#000000" />
              <Text style={{color: '#000000', fontSize: 16, paddingLeft: 6}}>{index.title}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
      <Text style={{color: '#2778e2', fontSize: 17, paddingLeft: 15}}>Accounts center</Text>
      <Text style={{color: '#727272', paddingLeft: 15, paddingTop: 16}}>
        Control settings for connected experiences across
        Instagram, the Facebook app and Messenger, 
        including story and the post sharing and logging in.
      </Text>
      <Text style={{color: '#000', fontSize: 17, fontWeight: '700', paddingTop: 18, paddingLeft: 15}}>Logins</Text>
      <Text style={{color: '#2778e2', fontSize: 17, paddingLeft: 15, paddingTop: 25}}>Add Account</Text>
      <Text onPress={() => {
        logout()}} style={{color: '#2778e2', fontSize: 17, paddingLeft: 15, paddingTop: 25, paddingBottom: 20}}>Logout</Text>
    </ScrollView>
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{flexDirection: 'row', alignItems: 'center',}}>
            <Text style={{fontSize: 18}}>Light</Text>
            <View style={{flex: 1}}></View>
            <RadioButton
            color="#2778e2"
            value="Light"
            status={ checked === 'Light' ? 'checked' : 'unchecked' }
            onPress={() => {setChecked('Light'); setModalVisible(false);}}
          />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 18}}>Dark</Text>
            <View style={{flex: 1}}></View>
            <RadioButton
            color="#2778e2"
            value="Dark"
            status={ checked === 'Dark' ? 'checked' : 'unchecked' }
            onPress={() => {setChecked('Dark'); setModalVisible(false);}}
          />
          </View>
          
          {/* <Text onPress={() => setModalVisible(false)}>close</Text> */}
        </View>
      </View>
    </Modal>
  </View>
  );
}
export default SettingsSc;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      marginTop: Platform.OS === 'web' ? 0 :RNStatusBar.currentHeight

    },
    tabbar: {
      flexDirection: 'row',
      height: 50,
      zIndex: 1,
      backgroundColor: '#ffffff',
      // borderBottomColor: '#e2e2e2',
      // borderBottomWidth: 1,
      alignItems: 'center'
  },
  listItems: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingBottom: 19
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#00000060'
  },
  modalView: {
    width: 270,
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  })