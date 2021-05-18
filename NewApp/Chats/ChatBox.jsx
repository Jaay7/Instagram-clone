import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet,Text, TextInput, View, Dimensions, ScrollView, Platform, StatusBar as RNStatusBar,TouchableOpacity, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { yourip } from '../helpers/keys'

const ChatsScreen = ({route, navigation}) => {
  const {username, newPerson} = route.params;
  const [msg, setMsg] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [senderMsg, setSenderMsg] = useState(msg);
  const [receiverMsg, setReceiverMsg] = useState(receiverMsg);
  const [allMsgs, setAllMsgs] = useState(allMsgs);
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
        console.log(data.username)
        setCurrentUser(data.username);
      })
    }
    getdata();
  }, []);
  const [propic, setPropic] = useState(null);
  useEffect(() => {
    async function getdata() {
      fetch(`http://${yourip}:3000/othersprofile/${username}`, { 
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        setPropic(data.profilepic);
      })
    }
    getdata();
  }, []);
  useEffect(() => {
    async function getChats() {
      fetch(`http://${yourip}:3000/chats/receivemessage/${currentUser}/${username}`, {
        method: "GET"
      })
      .then(res => res.json())
      .then((data) => {
        console.log(data.messages)
        setAllMsgs(data.messages)
      })
      .catch((error) => {
        console.log(error)
      })
    }
    getChats();
  }, [currentUser, username]);
  // const [isNew, setNew] = useState(newPerson);
  const [sendVisible, setSendVisible] = useState(true);
  const sendMessage = () => {
    fetch(`http://${yourip}/chats/sendmessage`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "sender": currentUser,
        "receiver": username,
        "message": msg
      })
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
    })
  }
  return(
    <View style={styles.container}>
      <View style={styles.tabbar}>
        <View style={styles.subtabbar}>
          <AntDesign onPress={() => navigation.goBack() } name="arrowleft" color='#000' size={26} style={{padding: 10}}  />
          <TouchableWithoutFeedback style={{alignItems: 'center', flexDirection: 'row', padding: 10}} onPress={() => navigation.navigate('OthersProfile', {'username': username})}>
            <Image source={{uri: propic}} style={{height: 30, width: 30, borderRadius: 15,}}/>
            <Text style={{color: '#000',fontSize: 15, paddingLeft: 13, fontWeight: 'bold' }}>{username}</Text>
          </TouchableWithoutFeedback>
          <View style={{flex: 1}}></View>
          {!newPerson ? (
            <>
              <Feather name="video" color='#000' size={26} style={{padding: 10}} />
              <Feather name="info" onPress={() => navigation.navigate('ChatDetails', {'username': username})} color='#000' size={26} style={{padding: 10}} />
            </>
              ) : ( <></>)
          }
        </View>
      </View>
      <ScrollView snapToEnd={true} snapToStart={false} onScroll={(event) => {
        var offset = 0
        var currentOffset = event.nativeEvent.contentOffset.y;
        var direction = currentOffset > offset ? 'down' : 'up';
        offset = currentOffset;
        console.log(direction)
      }} style={{flex: 1, backgroundColor: '#e4cfee',}}>
        {
          allMsgs !== undefined ? (
            allMsgs.map((index) => {
              return(
              <View key={index._id}>
                <View style={{alignItems: 'flex-end', alignSelf: 'flex-end', width: Dimensions.get('screen').width - 110}}>
                  {index.sender == currentUser ? (
                    <TouchableOpacity style={styles.senderside}>
                      <Text style={{color: '#fff', fontSize: 16}}> {index.message} </Text> 
                    </TouchableOpacity>): (<></>)
                  }
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', alignSelf: 'flex-start', width: Dimensions.get('screen').width - 110}}>
                  { index.sender == username ?(
                    <>
                    <Image source={{uri: propic}} style={{height: 30, width: 30, borderRadius: 15, alignSelf: 'flex-end', margin: 5}} />
                    <TouchableOpacity style={styles.receiverside}>
                      <Text style={{fontSize: 16}}>{index.message}</Text>
                    </TouchableOpacity>
                    </>) : (<></>)
                  }
                </View>
              </View>
            )})
        ) : ( <></>)
      }
      </ScrollView>
      <View style={styles.messagebar}>
        <MaterialComunityIcons name="camera" size={26} color="#fff" 
        style={{backgroundColor: '#842eac', borderRadius: 25, padding: 8, marginLeft: 5}} />
        <TextInput 
          placeholder="Message..."
          value={msg}
          placeholderTextColor="#727272"
          onChangeText={(text) => setMsg(text)}
          style={styles.msginput}
          onTextInput={() => setSendVisible(false)}
        />
        {sendVisible ? (
          <>
            <Feather name="mic" color='#000' size={24} style={{padding: 5}} />
            <AntDesign name="picture" size={28} color='#000' style={{padding: 5}} />
            <MaterialComunityIcons name="sticker-emoji" color='#000' size={28} style={{ padding: 5, marginRight: 20}} />
          </>
        ) : (
          <Text
            style={{marginRight: 20, padding: 5, fontSize: 18, fontWeight: 'bold', color: '#2778e2'}}
            onPress={()=> {console.log(msg); setSendVisible(true); setMsg(''); sendMessage();}}>
              Send
          </Text>
        )}
      </View>
    </View>
  );
}

export default ChatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  tabbar: {
    height: Platform.OS === 'web' ? 0 :RNStatusBar.currentHeight + 50,
    zIndex: 1,
    backgroundColor: '#c59fd6bd',
    // borderBottomColor: '#e2e2e2',
    marginTop: Platform.OS === 'ios' ? 35: 0,
  },
  subtabbar: {
    height: 50,
    marginTop: Platform.OS === 'web' ? 0 :RNStatusBar.currentHeight,
    flexDirection: 'row',
    alignItems: 'center'
  },
  messagebar: {
    position: 'absolute',
    flex:0.1,
    bottom: -8,
    backgroundColor:'#bca9c4',
    flexDirection:'row',
    height: 53,
    width: Dimensions.get('window').width -15,
    alignSelf: 'center',
    borderRadius: 26.5,
    marginBottom: 17,
    alignItems: 'center'
  },
  msginput: {
    marginLeft: 8,
    fontSize: 16,
    flex: 1
  },
  senderside: {
    padding: 10,
    backgroundColor: '#842eac',
    borderRadius: 20,
    margin: 5
  },
  receiverside: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 5,
    marginLeft: 0,
  }
})