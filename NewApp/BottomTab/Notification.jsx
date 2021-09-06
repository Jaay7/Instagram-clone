import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet,Text, TouchableWithoutFeedback, View, Dimensions, ScrollView,Image, Platform, Alert,TouchableOpacity, StatusBar as RNStatusBar } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { createStackNavigator } from '@react-navigation/stack';
import FollowReqScreen from './FollowReq';
import { yourip } from '../helpers/keys';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Badge, Divider } from 'react-native-elements';

const Stack = createStackNavigator();

const NotficationScreen = ({ navigation }) => {
  return(
    <Stack.Navigator>
      <Stack.Screen 
        name="Activity"
        component={ActivityScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="FollowReq"
        component={FollowReqScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
};

export default NotficationScreen;

const ActivityScreen = ({ navigation }) => {
  const [ username, setUsername] = useState('')
  const [ followRequests, setFollowRequests ] = useState(followRequests);
  const [ isprivate, setPrivate ] = useState(false);
  useEffect(() => {
    async function getdata() {
      const token = await AsyncStorage.getItem("token")
      fetch(`http://${yourip}:3000/`, {
        headers: new Headers({
          Authorization: "Bearer "+token
        })
      })
      .then(res => res.json())
      .then((data) => {
        setUsername(data.username);
        setPrivate(data.private);
      })
    }
    getdata();
  }, [username])
  useEffect(() => {
    async function getdata() {
      fetch(`http://${yourip}:3000/followRequests/${username}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then((data) => {
        if(data.followRequests.length === 0) {
          setFollowRequests(undefined);
        } else {
          setFollowRequests(data.followRequests)
        }
      })
    }
    getdata();
  }, [username]);

  const arr = [
    {
      "user": "sdfnskv",
      "name": "sidjvfnskd"
    }
  ]
  return(
    <View style={styles.container}>
      <View style={styles.tabbar}>
        <Text style={{color: '#000', alignSelf: 'center', fontSize: 20, paddingLeft: 20, fontWeight: 'bold' }}>Activity</Text>
      </View>
      {isprivate === true ? (
        followRequests === undefined ? (
          <Text>No Follow Requests</Text>
        ) : (
          <TouchableWithoutFeedback onPress={() => navigation.navigate('FollowReq')}>
            <View style={{flexDirection: 'row', padding: 10}}>
              <Image source={{uri: followRequests.slice(-1)[0].profilepic}} style={{height: 50, width: 50 ,borderRadius: 25}} />
              <Badge
                value={followRequests.length}
                containerStyle={{  left: -17 }}
                badgeStyle={{height: 20, width: 20, borderRadius: 11, backgroundColor: "#f03c3c" }}
              />
              <View style={{flexDirection: 'column'}}>
                <Text style={{fontWeight: "bold", fontSize: 16}}>Follow Requests</Text>
                <Text>Approve or ignore requests</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )
      ) : (
      <></>
      )}
    </View>
    
  );
}

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
    // borderBottomWidth: 1 
},
listItems: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingLeft: 15,
  paddingBottom: 19
}
})