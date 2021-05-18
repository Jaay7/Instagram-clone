import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { BottomSheet } from 'react-native-btr';
import {  Divider,ListItem, } from 'react-native-elements';
import { StyleSheet,Text,TextInput, StatusBar as RNStatusBar, View,FlatList, ScrollView, Dimensions, Platform, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator, } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { yourip } from './helpers/keys';
const Tab = createMaterialTopTabNavigator();

const InboxScreen = ({ navigation }) => {
  var countOfMsgs = 2;
  const [ connected, setConnected ] = useState(false)
  return(
    <View style={styles.main}>
      <View style={styles.tabbar}>
        <AntDesign onPress={() => navigation.goBack() } name="arrowleft" color='#000' size={26} style={{padding: 10}}  />
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={styles.teeexts}>Chats</Text>
        </View>
        <View style={{flex: 1}}></View>
        <Feather name="video" color='#000' size={26} style={{marginVertical: 10}}  />
        <SimpleLineIcons name="note" color='#000' size={22} style={{marginVertical: 10, paddingLeft: 20, paddingRight: 10}}  />
      </View>
      <View style={{flex: 1}}>
        {connected ? (
        <Tab.Navigator
        swipeEnabled={false}
        tabBarOptions={{
          showLabel: true,
          inactiveTintColor: '#c7c7c7',
          activeTintColor: '#000',
          style: {
            // backgroundColor: '#f8f8f8',
          },
          labelStyle: {
            textTransform: 'capitalize',
            fontSize: 15
          },
          indicatorStyle: {
            backgroundColor: '#000',
            height: 1
          }
        }}>
          <Tab.Screen
            name="Chats"
            component={ChatTab}
          />
          <Tab.Screen
            name="Rooms"
            component={RoomsTab}
          />
        </Tab.Navigator>
        ) : (<ChatTab navigation={navigation} />)}
      </View>
      {/* <ChatTab navigation={navigation} /> */}
      <View style={styles.footer}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', bottom: 3}}>
          <MaterialComunityIcons name="camera" size={26} style={{color: 'linear-gradient(24deg, rgba(62,176,255,1) 0%, rgba(47,157,223,1) 35%, rgba(39,120,226,1) 69%)'}} />
          <Text style={{paddingLeft: 7, color: '#2778e2', fontWeight: 'bold', top: 2}}>Camera</Text>
        </View>
      </View>
      
    </View>
  );
  };

export default InboxScreen;

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const ChatTab = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const toggleBottomNavigationView = () => {
      //Toggling the visibility state of the bottom sheet
      setVisible(!visible);
  };
  const list = [
      {
        title: 'Delete',
      },
      {
        title: 'Mute Messages',
      },
      {
          title: 'Mute Video Chats',
        },
        
  ];
  const keyExtractor = (item, index) => index.toString()
  const renderItem = ({item}) => (
    <ListItem>
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
        </ListItem.Content>
    </ListItem>
  );
  // chats array
  // const chatlist = [
  //   {
  //     username: 'Jay',
  //     icon: require('./assets/reelbg.jpg'),
  //     message: 'Shared a post'
  //   },
  //   {
  //     username: 'M Jay',
  //     icon: require('./assets/propic.jpg'),
  //     message: 'Shared a post'
  //   },
  // ];
  const [currentUser, setCurrentUser] = useState('');
  const [ chatlist, setChatlist ] = useState(chatlist);
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

  useEffect(() => {
    async function getChats() {
      fetch(`http://${yourip}:3000/chats/all/${currentUser}`, {
        method: "GET"
      })
      .then(res => res.json())
      .then((data) => {
        console.log(data.chats)
        setChatlist(data.chats)
      })
      .catch((error) => {
        console.log(error)
      })
    }
    getChats();
  }, [currentUser]);

  const [ refreshing, setRefreshing ] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  })

  return(
    <View style={{flex :1, backgroundColor: '#fff'}}>
      <ScrollView style={styles.container}
      refreshControl = {
        <RefreshControl 
          refreshing = {refreshing}
          onRefresh = {onRefresh}
        />
      } >
        <View style={{paddingBottom: 60, marginTop: 10}}>
          <View style={styles.inputFields}>
            <AntDesign name="search1" color='#b1b1b1' size={22} style={{paddingLeft: 5, paddingRight: 10}}  />
            <TextInput
              style={{flex: 1}}
              placeholder="Search"
              value={search}
              onChangeText={text => setSearch(text)}
              placeholderTextColor="#b1b1b1"
            />
          </View>
          {/* <Text style={{color: '#000', fontWeight: 'bold', fontSize: 16, padding: 15 }}>Messages</Text> */}
          <SafeAreaView style={{flex: 1, marginTop: 5}}>
          {chatlist !== undefined ? (
            chatlist.map((index) => {
              return (
                <View key={index._id}>
                  <ListItem containerStyle={{paddingBottom: 9, paddingTop: 9}} 
                    onLongPress={toggleBottomNavigationView} 
                    onPress={() => navigation.navigate('ChatsScreen', {'username': index.receiver, 'newPerson': false})}>
                    <Image 
                      style={styles.propic}
                      source={require('./assets/reelbg.jpg')}
                    />
                    <View style={{flexDirection: 'column'}}>
                      <Text style={{color: '#000'}}>{index.receiver}</Text>
                      <Text style={{color: 'grey'}}>{index.message}</Text>
                    </View>
                    <View style={{flex: 1}}></View>
                    <SimpleLineIcons onPress={() => navigation.navigate('Camera')} name="camera" size={24} color={'grey'}/>
                  </ListItem>
                  <BottomSheet
                  visible={visible}
                  onBackButtonPress={toggleBottomNavigationView}
                  onBackdropPress={toggleBottomNavigationView}>
                    <View style={styles.bsheet}>
                      <View style={styles.bar}></View>
                      <Text style={styles.teexts}>{index.receiver}</Text>
                      <Divider style={{ backgroundColor: '#2c2c2cc5'}} />
                    </View>
                    <View>
                      <FlatList 
                        keyExtractor={keyExtractor}
                        data={list}
                        renderItem={renderItem}
                      />
                    </View>
                  </BottomSheet>
                </View>
              )
            }) ) : (<></>)}
            {/* <FlatList 
                  keyExtractor={chatkeyExtractor}
                  data={chatlist}
                  renderItem={chatrenderItem}
              /> */}
          </SafeAreaView>

        </View>
      </ScrollView>
      
    </View>
  )
}

const RoomsTab = () => {
  return(
    <View>
      <Text>I'm Rooms screen</Text>
    </View>
  )
}

const ActiveTab = () => {
  return(
    <View>
      <Text>I'm Top screen</Text>
    </View>
  )
}

const MessageReqTab = () => {
  return(
    <View>
      <Text>I'm Top screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    texts:{
      color: '#777777',
      padding: 5,
    },
    teexts:{
      color: '#000',
      padding: 15,
      fontWeight: 'bold',
      fontSize: 16,
    },
    teeexts:{
        fontSize: 18,
      paddingLeft: 10,
      color: '#000',
      alignSelf: 'center',
      fontWeight: 'bold'
    },
    main: {
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
      marginTop: Platform.OS === 'ios' ? 35: 0,
      alignItems: 'center'
    },
    dpff: {
        height: 100,
        flex: 1,
        flexDirection: 'row',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },
    propic: {
        width: 53,
        height: 53,
        borderRadius: 26.5,
    },
    pff: {
        flex: 1,
        flexDirection: 'column',
        marginVertical: 20,
        alignItems: 'center',
    },
    bio: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10
    },
    myname: {
        color: '#fff',
        fontWeight: '700',
    },
    container: {
      flex: 1,
    },
    buttons:{
      alignSelf: 'center',
      backgroundColor: '#000000',
      padding: 3.5,
      width: 330,
      borderRadius: 5,
      marginBottom: 15,
      borderWidth: 1.5,
      borderColor: '#727272',
      marginTop: 13
    },
    highl: {
        width: 62,
        height: 62,
        borderRadius: 31,
        alignSelf:'center',
        marginVertical: 1.2,
        borderColor: '#727272',
        borderWidth: 1.5,
    },
    circle: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        paddingRight: 20
    },
    horiscroll: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 10
    },
    inputFields:{
        color: '#000000',
        width: 330,
        height: 35,
        alignSelf: 'center',
        borderRadius: 10,
        padding: 4,
        marginTop: 15,
        backgroundColor: '#ececec',
        flexDirection: 'row',
        alignItems: 'center'
      },
    bsheet: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    bar: {
        height: 5,
        width: 35,
        backgroundColor: '#727272',
        alignSelf: 'center',
        marginTop: 12,
        borderRadius: 3
    },
    list: {
        backgroundColor: '#fff',
    },
    footer: {
        position: 'absolute',
        flex:0.1,
        left: 0,
        right: 0,
        bottom: -10,
        backgroundColor:'#f8f8f8',
        flexDirection:'row',
        height: 55,
        alignItems:'center',
        borderTopColor: '#e2e2e2',
      borderTopWidth: 1 
      },
  });