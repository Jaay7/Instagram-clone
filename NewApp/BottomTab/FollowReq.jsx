import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet,Text, Image, View, Dimensions, ScrollView, Platform, StatusBar as RNStatusBar,TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { yourip } from '../helpers/keys';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FollowReqScreen = ({navigation}) => {
  const [ username, setUsername] = useState('')
  const [ followRequests, setFollowRequests ] = useState(followRequests);
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
        setUsername(data.username)
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
        setFollowRequests(data.followRequests)
      })
    }
    getdata();
  }, [username])
  return(
    <View style={styles.container}>
      <View style={styles.tabbar}>
        <AntDesign onPress={() => navigation.goBack() } name="arrowleft" color='#000' size={26} style={{ padding: 10}}  />
        <Text style={{color: '#000', fontSize: 18, paddingLeft: 5, fontWeight: 'bold' }}>Follow Requests</Text>
      </View>
      <ScrollView style={{backgroundColor: '#fff'}}>
        <View>
        {followRequests !== undefined ? (
          followRequests.map((index) => {
            return(
              <View key={index.username} style={{flexDirection: 'row', flex: 1, alignItems: 'center', padding: 7, marginLeft: 10, width: Dimensions.get('window').width}}>
                <Image source={{uri: index.profilepic}} style={{height: 50, width: 50, borderRadius: 30}} />
                <View style={{flexDirection: 'column', padding: 10, overflow: 'hidden'}}>
                  <Text>{index.username}</Text>
                  <Text style={{color: '#b4b4b4'}}>{index.name}</Text>
                </View>
                <View style={{flex: 1}}></View>
                <TouchableOpacity style={{backgroundColor: '#2778e2', padding: 5, width: 70, alignItems: 'center', borderRadius: 5}}>
                  <Text style={{fontWeight: 'bold', color: '#fff'}}>Confirm</Text>
                </TouchableOpacity>
                <AntDesign name="close" size={15} color="#b4b4b4" style={{padding: 10, marginRight: 10}} />
              </View>
            )
          })) : (
            <>
            <Text>sfddf</Text></>
          )
        }
        </View>
      </ScrollView>
    </View>
  );
}

export default FollowReqScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
})