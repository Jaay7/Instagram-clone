import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet,Text, TextInput, View, Dimensions, ScrollView, Platform, StatusBar as RNStatusBar,TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RadioButton, Switch } from 'react-native-paper';
import { Divider } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {yourip} from '../helpers/keys'
const PrivacyScreen = ({navigation}) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const isPrivate = !isSwitchOn;
  useEffect(() => {
    async function getdata() {
      const token = await AsyncStorage.getItem("token")
      // setUsername(token)
    
      fetch(`http://${yourip}:3000/`, { 
        headers: new Headers({
          Authorization:"Bearer "+token
        })
      })
      .then(res => res.json())
      .then((data) => {
        console.log(data.private)
        setIsSwitchOn(data.private);
      })
    }
    getdata();
  }, []);

  const onToggleSwitch = async() => {
    setIsSwitchOn(!isSwitchOn);
    const token = await AsyncStorage.getItem("token")
    fetch(`http://${yourip}:3000/setAccType`, {
      method: "POST",
      headers: new Headers({
        Authorization:"Bearer "+token,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        "private": isPrivate
      })
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
    })
  };
  const ConnectionsList = [
    {name: 'Restricted Accounts', icon: 'account-off-outline', screen: ''},
    {name: 'Blocked Accounts', icon: 'close-circle-outline', screen: ''},
    {name: 'Muted Accounts', icon: 'bell-off-outline', screen: ''},
    {name: 'Accounts You Follow', icon: 'account-multiple-outline', screen: ''},
  ]
  return(
    <View style={styles.container}>
      <View style={styles.tabbar}>
        <AntDesign onPress={() => navigation.goBack() } name="arrowleft" color='#000' size={26} style={{ padding: 10}}   />
        <Text style={{color: '#000', fontSize: 19, paddingLeft: 10, fontWeight: '700' }}>Privacy</Text>
      </View>
      <ScrollView>
        <Text style={styles.heading}>Account Privacy</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', margin: 10}}>
          <Feather name="lock" size={26} />
          <Text style={styles.itemss}>Private Account</Text>
          <View style={{flex: 1}}></View>
          <Switch value={isSwitchOn} color="#2778e2" onValueChange={onToggleSwitch} />
        </View>
        <Divider style={{ backgroundColor: '#cfcfcf', marginTop: 10}} />
        <View>
          <Text style={styles.heading}>Interactions</Text>
          <TouchableWithoutFeedback style={styles.lists}>
            <Feather name="message-circle" size={28} />
            <Text style={{fontSize: 16, paddingLeft: 6}}>Comments</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={styles.lists}>
            <MaterialCommunityIcons name="account-box-outline" size={28} />
            <Text style={{fontSize: 16, paddingLeft: 6}}>Tags</Text>
            <View style={{flex: 1}}></View>
            <Text style={{color: '#727272'}}>Everyone</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={styles.lists}>
            <MaterialCommunityIcons name="at" size={28} />
            <Text style={{fontSize: 16, paddingLeft: 6}}>Mentions</Text>
            <View style={{flex: 1}}></View>
            <Text style={{color: '#727272'}}>Everyone</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={styles.lists}>
            <MaterialCommunityIcons name="progress-check" size={28} />
            <Text style={{fontSize: 16, paddingLeft: 6}}>Story</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={styles.lists}>
            <MaterialCommunityIcons name="book-open-outline" size={28} />
            <Text style={{fontSize: 16, paddingLeft: 6}}>Guide</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={styles.lists}>
            <MaterialCommunityIcons name="account-check-outline" size={28} />
            <Text style={{fontSize: 16, paddingLeft: 6}}>Activity Status</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={styles.lists}>
            <MaterialCommunityIcons name="facebook-messenger" size={28} />
            <Text style={{fontSize: 16, paddingLeft: 6}}>Messages</Text>
          </TouchableWithoutFeedback>
        </View>
        <Divider style={{ backgroundColor: '#cfcfcf', marginTop: 10}} />
        <View>
          <Text style={styles.heading}>Connections</Text>
          {
            ConnectionsList.map((index) => {
              return(
                <TouchableWithoutFeedback key={index.name} style={styles.lists}>
                  <MaterialCommunityIcons name={index.icon} size={28} />
                  <Text style={{fontSize: 16, paddingLeft: 6}}>{index.name}</Text>
                </TouchableWithoutFeedback>
              )
            })
          }
        </View>
      </ScrollView>
    </View>
  );
}

export default PrivacyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'web' ? 0 :RNStatusBar.currentHeight,
    backgroundColor: '#fff'
  },
  tabbar: {
    flexDirection: 'row',
    height: 50,
    zIndex: 1,
    backgroundColor: '#ffffff',
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 1,
    alignItems: 'center'
  },
  heading: {
    fontWeight: 'bold',
    margin: 10,
    fontSize: 16
  },
  itemss: {
    fontSize: 16,
    paddingLeft: 10
  },
  lists: {
    padding: 10,
     flexDirection: 'row',
     alignItems: 'center'
  }
})