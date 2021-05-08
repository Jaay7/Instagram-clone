import React, { useRef, useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BottomSheet } from 'react-native-btr';
import { Divider,ListItem } from 'react-native-elements';
import { StyleSheet,Text, View,FlatList, ScrollView, Dimensions, Platform, Image, TouchableOpacity, StatusBar as RNStatusBar } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

const OthersProfileScreen = ({ route, navigation }) => {
  const {username} = route.params;
  const [propic, setPropic] = useState(null);
  const [ouname, setOuname] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [visible, setVisible] = useState(false);
  const [BVisible, setBVisible] = useState(false);
  const [ isPrivate, setIsPrivate ] = useState(false);
  const [ followers, setFollowers ] = useState(followers);
  const [ following, setFollowing ] = useState(following);
  const [ posts, setPosts ] = useState(posts);
  const toggleBottomNavigationView = () => {
      //Toggling the visibility state of the bottom sheet
      setVisible(!visible);
  };
  const toggleBNavView = () => {
    //Toggling the visibility state of the bottom sheet
    setBVisible(!BVisible);
};
  useEffect(() => {
    async function getdata() {
      fetch(`http://192.168.0.103:3000/othersprofile/${username}`, { //192.168.0.102
        method: "GET"
      })
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        setPropic(data.profilepic);
        setOuname(data.username);
        setName(data.name);
        setBio(data.bio);
        setIsPrivate(data.private);
        setFollowers(data.followers);
        setFollowing(data.following);
        setPosts(data.posts);
      })
    }
    getdata();
  }, [username]);
  const BottomSheetList = [
    { screen: 'Camera', title: 'Report...', },
    { screen: 'Camera', title: 'Block', },
    { screen: 'Camera', title: 'Restrict', },
    { screen: 'Camera', title: 'Hide Your Story', },
    { screen: 'Camera', title: 'Copy Profile URL', },
    { screen: 'Camera', title: 'Send Message', },
    { screen: 'Camera', title: 'Share this Profile', },
  ];
    const list = [
      {
        title: 'Story',
        icon: 'keyboard-arrow-right'
      },
      {
        title: 'Story Highlight',
        icon: 'keyboard-arrow-right'
      },
      {
        title: 'IGTV Video',
        icon: 'keyboard-arrow-right'
      },
      
      ];
      const storyHighlights = [
        {image: require('./assets/reelbg.jpg'), highlightname: 'myfav'},
        {image: require('./assets/reelbg.jpg'), highlightname: 'food'},
        {image: require('./assets/reelbg.jpg'), highlightname: 'trip'},
        {image: require('./assets/reelbg.jpg'), highlightname: 'college'},
        {image: require('./assets/reelbg.jpg'), highlightname: 'nighrouts'},
        {image: require('./assets/reelbg.jpg'), highlightname: 'study'},
      ]
        const keyExtractor = (item, index) => index.toString()
      const renderItem = ({item}) => (
        <ListItem containerStyle={{backgroundColor: '#ffffff'}}>
            <ListItem.Content>
                <ListItem.Title style={{color: '#000'}}>{item.title}</ListItem.Title>
            </ListItem.Content>
            <MaterialIcons name={item.icon} color= '#727272' size={26} />
        </ListItem>
      );
    return(
        <View style={styles.main}>
            <View style={styles.tabbar}>
              <AntDesign onPress={() => navigation.goBack() } name="arrowleft" color='#000' size={26} style={{padding: 10}}  />
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={styles.teeexts}>{ouname}</Text>
              </View>
              <View style={{flex: 1}}></View>
              <MaterialComunityIcons name="dots-vertical" onPress={toggleBNavView} color='#000' size={28} style={{ paddingLeft: 10, paddingRight: 10}}  />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View style={styles.dpff}>
                    <Image 
                        style={styles.propic}
                        source={{uri: propic}}
                    />
                    <View style={styles.pff}>
                        <Text style={{fontWeight: 'bold', fontSize: 18, color: '#000'}}>{posts}</Text>
                        <Text style={{color: '#000'}}>Posts</Text>
                    </View>
                    <View style={styles.pff}>
                        <Text style={{fontWeight: 'bold', fontSize: 18, color: '#000'}}>{followers}</Text>
                        <Text style={{color: '#000'}}>Followers</Text>
                    </View>
                    <View style={styles.pff}>
                        <Text style={{fontWeight: 'bold', fontSize: 18, color: '#000'}}>{following}</Text>
                        <Text style={{color: '#000'}}>Following</Text>
                    </View>
                    <View style={{padding: 6}}></View>
                </View>
                <View style={styles.bio}>
                    <Text style={styles.myname}>{name}</Text>
                    <View style={{flex:1,flexDirection: 'column'}}>
                    <Text style={{color: '#000', fontWeight: '100'}}>{bio}</Text>
                    </View>
                </View>
                
                {isPrivate ? (
                <>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity style={styles.buttons} onPress={toggleBottomNavigationView}>
                    <Text style={{alignSelf: 'center', color: '#000',fontSize: 16}}>Following</Text>
                    <MaterialIcons name="keyboard-arrow-down" color='#000' size={17} style={{paddingLeft: 2}}  />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('ChatsScreen', {'propic': propic, 'username': username, 'newPerson': true})} style={styles.buttons}>
                    <Text style={{alignSelf: 'center', color: '#000', fontSize: 16}}>Message</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                  style={{alignSelf: 'center',
                    backgroundColor: '#fff',
                    padding: 3.5,
                    borderRadius: 5,
                    marginBottom: 15,
                    borderWidth: 1.5,
                    borderColor: '#e2e2e2',
                    marginTop: 13,
                    marginLeft: 10}}>
                    <MaterialIcons name="keyboard-arrow-down" color='#000' size={17} style={{paddingLeft: 2}}  />
                  </TouchableOpacity>
                </View>
                
                  <ScrollView style={styles.horiscroll} showsHorizontalScrollIndicator={false}
                  horizontal={true}>
                    {
                    storyHighlights.map((index) => {
                      return(
                      <View style={styles.circle} key={index.highlightname}>
                          <Image style={styles.highl} source={index.image} />
                          <Text style={{color: '#000'}}>{index.highlightname}</Text>
                      </View>
                      )
                    })
                  }
                  </ScrollView>
                  <View style={{borderTopColor: '#c7c7c7', borderTopWidth: 1, marginTop: 10}}>
                    <Tab.Navigator
                    tabBarOptions={{
                        showLabel: false,
                        showIcon: true,
                        inactiveTintColor: '#c7c7c7',
                        activeTintColor: '#000',
                        style: {
                            backgroundColor: '#f0f0f0',
                        },
                        indicatorStyle: {
                            backgroundColor: '#000',
                            height: 1
                        }
                    }}>
                        <Tab.Screen 
                            name="Grid" 
                            component={GridPhotosScreen}
                            options= {{
                                tabBarIcon: ({ color }) => (
                                    <MaterialComunityIcons name="grid" color={color} size={26} />
                                ),
                            }} />
                        <Tab.Screen 
                            name="Tags"
                            component={PhotoTagSceen}
                            options= {{
                                tabBarIcon: ({ color }) => (
                                    <MaterialComunityIcons name="tooltip-account" color={color} size={26} />
                                ),
                            }} />
                    </Tab.Navigator>
                  </View>
                </>) : (
                <>
                  <TouchableOpacity style={[styles.followbuttons, {width: Dimensions.get('window').width-30,}]}>
                    <Text style={{alignSelf: 'center', color: '#fff',fontSize: 16, textAlign: 'center'}}>Follow</Text>
                  </TouchableOpacity>
                  <Divider style={{marginTop: 15, marginBottom: 20}} />
                  <View style={{flexDirection: 'row'}}>
                    <View>
                      <SimpleLineIcons name="lock" size={24} style={{borderRadius: 20, borderWidth: 1, padding: 6, margin: 10, color: '#727272', borderColor: '#727272'}} />
                    </View>
                    <View style={{flexDirection: 'column',flex: 1}}>
                      <Text style={{fontWeight: 'bold'}}>This Account is Private</Text>
                      <Text style={{color: '#727272'}}>Follow this account to see their photos and videos.</Text>
                    </View>
                  </View>
                  <SuggestedForYou />
                </>)}
            </ScrollView>
            <BottomSheet
            visible={visible}
            onBackButtonPress={toggleBottomNavigationView}
            onBackdropPress={toggleBottomNavigationView}>
                <View style={styles.bsheet}>
                    <View style={styles.bar}></View>
                    <Text style={styles.teexts}>{username}</Text>
                    <Divider style={{ backgroundColor: '#e2e2e2'}} />
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontSize: 16, padding: 10, marginLeft: 5}}>Add to Close Friends List</Text>
                  <View style={{flex: 1}}></View>
                    <MaterialComunityIcons name="star-circle-outline" size={26} style={{padding: 10, marginRight: 7}} />
                </View>
                <View>
                    <FlatList 
                    keyExtractor={keyExtractor}
                        data={list}
                        renderItem={renderItem}
                    />
                </View>
                <Text style={{fontSize: 16, color: '#ff5151', padding: 10, marginLeft: 5}}>Unfollow</Text>
                </View>
            </BottomSheet>
            <BottomSheet
            visible={BVisible}
            onBackButtonPress={toggleBNavView}
            onBackdropPress={toggleBNavView}>
                <View style={styles.bsheet}>
                  <View style={styles.bar}></View>
                  <View>
                    <Text style={styles.bsheetText} onPress={() => {console.log("pressed"); toggleBNavView()}}>Report...</Text>
                    <Text style={styles.bsheetText} onPress={() => {console.log("pressed"); toggleBNavView()}}>Block</Text>
                    <Text style={styles.bsheetText} onPress={() => {console.log("pressed"); toggleBNavView()}}>Restrict</Text>
                    <Text style={styles.bsheetText} onPress={() => {console.log("pressed"); toggleBNavView()}}>Hide Your Stroy</Text>
                    <Text style={styles.bsheetText} onPress={() => {console.log("pressed"); toggleBNavView()}}>Copy Profile URL</Text>
                    <Text style={styles.bsheetText} onPress={() => {navigation.navigate('ChatsScreen', {'propic': propic, 'username': username, 'newPerson': true}); toggleBNavView()}}>Send Message</Text>
                    <Text style={styles.bsheetText} onPress={() => {console.log("pressed");  toggleBNavView()}}>Share this Profile</Text>
                  </View>
                </View>
            </BottomSheet>
        </View>
      
      
    );
  };

export default OthersProfileScreen;

const SuggestedForYou = () => {
  const [ allUsers, setAllUsers ] = useState(allUsers);
  useEffect(() => {
    async function getdata() {
      fetch('http://192.168.0.167:3000/allusers', { //192.168.0.102
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(res => res.json())
      .then((data) => {
        console.log(data.allUsers)
        setAllUsers(data.allUsers)
      })
    }
    getdata();
  }, []);
  return (
    <View style={{flexDirection: 'column'}}>
      <View style={{flexDirection:'row', flex: 1, justifyContent: 'space-between', padding: 10}}>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>Suggested for You</Text>
        <Text style={{fontSize: 15, fontWeight: 'bold', color:'#2778e2'}}>See All</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{flexDirection: 'row', marginLeft: 10}}>
          {allUsers !== undefined ? (
            allUsers.map((index) => {
              return(
                <View style={styles.suggBox} key={index.username}>
                  <AntDesign name="close" size={22} color="#aaaaaa" style={{position: 'absolute', alignSelf: 'flex-end', right: 6, top: 6}} />
                  <Image source={{uri: index.profilepic}} style={{height: 100, width: 100, borderRadius: 50}} />
                  <Text style={{fontWeight: 'bold', fontSize: 16, padding: 3}}>{index.username}</Text>
                  <Text>{index.name}</Text>
                 {/*  <Text>{index.follwedby}</Text> */}
                  <TouchableOpacity style={[styles.followbuttons]}>
                    <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 15}}>Follow</Text>
                  </TouchableOpacity>
                </View>
              )
            })
          ) : (<></>)}
        </View>
      </ScrollView>
    </View>
  )
}

const GridPhotosScreen = () => {
    return(
        <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#f0f0f0', flexWrap: 'wrap'}}>
            <View style={{width: 119, height: 119, backgroundColor: 'powderblue', borderWidth: 1, borderColor: '#f0f0f0'}} />
            <View style={{width: 119, height: 119, backgroundColor: 'skyblue', borderWidth: 1, borderColor: '#f0f0f0'}} />
            <View style={{width: 119, height: 119, backgroundColor: 'powderblue', borderWidth: 1, borderColor: '#f0f0f0'}} />
            <View style={{width: 119, height: 119, backgroundColor: 'skyblue', borderWidth: 1, borderColor: '#f0f0f0'}} />
            <View style={{width: 119, height: 119, backgroundColor: 'steelblue', borderWidth: 1, borderColor: '#f0f0f0'}} />
            <View style={{width: 119, height: 119, backgroundColor: 'skyblue', borderWidth: 1, borderColor: '#f0f0f0'}} />
            <View style={{width: 119, height: 119, backgroundColor: 'powderblue', borderWidth: 1, borderColor: '#f0f0f0'}} />
        </View>
    );
}
const PhotoTagSceen = () => {
    return(
        <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#f0f0f0', flexWrap: 'wrap'}}>
            <View style={{width: 119, height: 119, backgroundColor: 'powderblue', borderWidth: 1, borderColor: '#f0f0f0'}} />
            <View style={{width: 119, height: 119, backgroundColor: 'skyblue', borderWidth: 1, borderColor: '#f0f0f0'}} />
            <View style={{width: 119, height: 119, backgroundColor: 'powderblue', borderWidth: 1, borderColor: '#f0f0f0'}} />
            <View style={{width: 119, height: 119, backgroundColor: 'skyblue', borderWidth: 1, borderColor: '#f0f0f0'}} />
            <View style={{width: 119, height: 119, backgroundColor: 'steelblue', borderWidth: 1, borderColor: '#f0f0f0'}} />
            <View style={{width: 119, height: 119, backgroundColor: 'skyblue', borderWidth: 1, borderColor: '#f0f0f0'}} />
            <View style={{width: 119, height: 119, backgroundColor: 'powderblue', borderWidth: 1, borderColor: '#f0f0f0'}} />
        </View>
    );
}

const styles = StyleSheet.create({
    texts:{
      color: '#777777',
      padding: 5,
    },
    teexts:{
      color: '#000',
      paddingLeft: 3,
      fontWeight: 'bold',
      fontSize: 18,
      alignSelf: 'center',
      paddingTop: 10,
      paddingBottom: 10
    },
    teeexts:{
        fontSize: 20,
      paddingLeft: 10,
      color: '#000',
      marginVertical: 9
    },
    main: {
      flex: 1,
      marginTop: Platform.OS === 'web' ? 0 :RNStatusBar.currentHeight,
      // backgroundColor: '#f0f0f0'
    },
    tabbar: {
        flexDirection: 'row',
        height: 50,
        zIndex: 1,
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
        width: 85,
        height: 85,
        borderRadius: 42.5,
        marginVertical: 5,
        marginLeft: 15
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
        color: '#000',
        fontWeight: '700',
    },
    container: {
      flex: 1,
    },
    buttons:{
      alignSelf: 'center',
      backgroundColor: '#fff',
      padding: 3.5,
      paddingLeft: 30,
      paddingRight: 30,
      borderRadius: 5,
      marginBottom: 15,
      borderWidth: 1.5,
      borderColor: '#e2e2e2',
      marginTop: 13,
      marginLeft: 10,
      flexDirection:'row',
      alignItems: 'center'
    },
    followbuttons:{
      alignSelf: 'center',
      backgroundColor: '#2778e2',
      // width: Dimensions.get('window').width-30,
      padding: 5,
      borderRadius: 5,
      marginBottom: 15,
      marginTop: 13,
      alignItems: 'center',
      flex:1,
      paddingLeft: 30,
      paddingRight: 30
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
    bsheet: {
        backgroundColor: '#ffffff',
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
    bsheetText: {
      fontSize: 16,
      padding: 15,
      paddingLeft: 25
    },
    list: {
        backgroundColor: '#1b1b1b',
    },
    suggBox: {
      flexDirection: 'column',
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#e2e2e2',
      padding: 10,
      alignItems: 'center',
      marginBottom: 10,
      flex: 1,
      width: 152,
      margin: 3
    }
  });