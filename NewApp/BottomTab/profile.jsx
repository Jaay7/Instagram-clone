import React, { useRef, useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entopy from 'react-native-vector-icons/Entypo';
import { BottomSheet } from 'react-native-btr';
import { Badge, Divider,ListItem } from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import { StyleSheet,Text, View,FlatList, ScrollView, Platform, Image, TouchableOpacity, StatusBar as RNStatusBar, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator,DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import FAndFScreen from '../profile/FAndF';
import SettingsSc from '../settings';
import YourActivityScreen from '../SideDrawer/YourActivity';
import SavedScreen from '../SideDrawer/Saved';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Modal } from 'react-native';
import { BlurView } from 'expo-blur';
import PostsScreen from '../profile/PostsScreen'
import {yourip} from '../helpers/keys'
const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const ProfileSc = ({navigation}) => {
  return (
    <View style={{flex:1}}>
      <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="Profile"
      drawerPosition='right'
      drawerType='slide'
      drawerStyle={{
        width: 240
      }}
      >
        <Drawer.Screen name="Profile" component={ProfileoScreen} />
        {/* <Drawer.Screen name="Settings" component={SettingsSc} /> */}
      </Drawer.Navigator>
    </View>
  )
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Archive" icon={() => <Entopy name="back-in-time" size={24} />} onPress={() => props.navigation.navigate('Archive')} />
      <DrawerItem label="Your Activity" icon={() => <MaterialComunityIcons name="progress-clock" size={24} />} onPress={() => props.navigation.navigate('YourActivity')} />
      <DrawerItem label="Saved" icon={() => <FontAwesome name="bookmark-o" size={24} />} onPress={() => props.navigation.navigate('Saved')} />
      <DrawerItem label="Settings" icon={() => <SimpleLineIcons name="settings" size={22} />} onPress={() => props.navigation.navigate('Settings')} />
    </DrawerContentScrollView>
  );
}

const ProfileoScreen = ({ navigation }) => {
  return(
    <Stack.Navigator>
      <Stack.Screen 
        name="Profile"
        component={Prooofile}
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="FAndF"
        component={FAndFScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AllPosts"
        component={PostsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsSc} 
        options={{ headerShown: false }}
      />
      
      <Stack.Screen 
        name="YourActivity" 
        component={YourActivityScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Saved" 
        component={SavedScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

  export default ProfileSc;

  const Prooofile = ({ navigation }) => {
    const [visible, setVisible] = useState(false);
    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        setVisible(!visible);
    };
    const list = [
      {
        // screen: 'Post',
        title: 'Feed Post',
        icon: 'grid'
      },
      {
        screen: 'Camera',
        title: 'Story',
        icon: 'progress-check'
      },
      {
        screen: 'Camera',
        title: 'Story Highlight',
        icon: 'progress-check'
      },
      {
        screen: 'Camera',
        title: 'IGTV Video',
        icon: 'television-classic'
      },
      {
        screen: 'Camera',
        title: 'Reel',
        icon: 'video'
      },
      {
        screen: 'Settings',
        title: 'Guide',
        icon: 'book-open-outline'
      },
      ]
        const keyExtractor = (item, index) => index.toString()
      const renderItem = ({item}) => (
        <ListItem containerStyle={{backgroundColor: '#ffffff'}} 
        onPress={() => {
          item.title === 'Feed Post' ? navigation.navigate('Post') : navigation.navigate(item.screen)
          toggleBottomNavigationView();}}>
            <MaterialComunityIcons name={item.icon} color= '#000000' size={26} />
            <ListItem.Content>
                <ListItem.Title style={{color: '#000'}}>{item.title}</ListItem.Title>
            </ListItem.Content>
        </ListItem>
      );
    const [ username, setUsername] = useState('')
    const [ name, setName ] = useState('')
    const [ bio, setBio ] = useState('')
    const [propicImage, setPropicImage] = useState(null);
    const [ followers, setFollowers ] = useState(followers);
    const [ following, setFollowing ] = useState(following);
    const [ posts, setPosts ] = useState(posts);

    const Followers = followers;
    const Following = following;
    // const fetchToken = async() => {
    //   const token2 = await AsyncStorage.getItem("token")
    //   setToken(token2)
    // }
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
          console.log(data)
          setUsername(data.username);
          setPropicImage(data.profilepic);
          setName(data.name);
          setBio(data.bio);
          setFollowers(data.followers);
          setFollowing(data.following);
          setPosts(data.posts);
        })
      }
      getdata();
    }, [username]);
    useEffect(() => {
      async function getdata() {
        fetch(`http://${yourip}:3000/uploads/nofposts/${username}`, { 
          method: "GET"
        })
        .then(res => res.json())
        .then((data) => {
          console.log(data)
        })
      }
      getdata();
    }, [username]);
    return(
        <View style={styles.main}>
            <View style={styles.tabbar}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={styles.teeexts}>{username}</Text>
                <MaterialIcons name="keyboard-arrow-down" color='#000' size={17} style={{marginVertical: 15, paddingLeft: 2}}  />
              </View>
              <View style={{flex: 1}}></View>
              <AntDesign onPress = {toggleBottomNavigationView} name="plus" color='#000' size={26} style={{padding: 10}}  />
              <SimpleLineIcons onPress={() => navigation.toggleDrawer()} name="menu" color='#000' size={22} style={{padding: 10}}  />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View style={styles.dpff}>
                  <TouchableWithoutFeedback>
                    <Image 
                        style={styles.propic}
                        source={{uri: propicImage}}
                    />
                  </TouchableWithoutFeedback>
                    
                    <Badge
                        status="primary"
                        value='+'
                        containerStyle={{ top: 70, left: -20 }}
                        badgeStyle={{height: 22, width: 22, borderRadius: 11, borderColor: '#1a1a1a', borderWidth: 1 }}
                    />
                    <View style={styles.pff}>
                        <Text style={{fontWeight: 'bold', fontSize: 18, color: '#000'}}>{posts}</Text>
                        <Text style={{color: '#000'}}>Posts</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('FAndF', {'username':username, 'followers': Followers, 'following': Following, 'initial': `${Followers} Followers`})} style={styles.pff}>
                        <Text style={{fontWeight: 'bold', fontSize: 18, color: '#000'}}>{followers}</Text>
                        <Text style={{color: '#000'}}>Followers</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('FAndF', {'username':username, 'followers': Followers, 'following': Following, 'initial': `${Following} Following`})} style={styles.pff}>
                        <Text style={{fontWeight: 'bold', fontSize: 18, color: '#000'}}>{following}</Text>
                        <Text style={{color: '#000'}}>Following</Text>
                    </TouchableWithoutFeedback>
                    <View style={{padding: 6}}></View>
                </View>
                <View style={styles.bio}>
                    <Text style={styles.myname}>{name}</Text>
                    <View style={{flex:1,flexDirection: 'column'}}>
                    <Text style={{color: '#000', fontWeight: '100'}}>{bio}</Text>
                    {/* <Text style={{color: '#000', fontWeight: '100'}}>KL University</Text>
                    <Text style={{color: '#000', fontWeight: '100'}}>Think | Learn | Code</Text> */}
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingLeft: 5, paddingRight: 5}}>
                    <TouchableOpacity style={styles.buttons}
                    onPress={() => navigation.navigate('EditProfile')}>
                        <Text style={{alignSelf: 'center', color: '#000',fontWeight: '700', fontSize: 16}}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons}
                    onPress={() => navigation.navigate('Saved')}>
                        <Text style={{alignSelf: 'center', color: '#000',fontWeight: '700', fontSize: 16}}>Saved</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.horiscroll} showsHorizontalScrollIndicator={false}
                horizontal={true}>
                    <View style={styles.circle}>
                        <Image style={styles.highl} source={require('../assets/reelbg.jpg')} />
                        <Text style={{color: '#000'}}>MyFav</Text>
                    </View>
                    <View style={styles.circle}>
                        <Image style={styles.highl} source={{uri: "https://images.unsplash.com/photo-1507062916289-6af3d3e05386?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"}} />
                        <Text style={{color: '#000'}}>MyFav</Text>
                    </View>
                    <View style={styles.circle}>
                        <Image style={styles.highl} source={require('../assets/reelbg.jpg')} />
                        <Text style={{color: '#000'}}>MyFav</Text>
                    </View>
                    <View style={styles.circle}>
                        <Image style={styles.highl} source={require('../assets/reelbg.jpg')} />
                        <Text style={{color: '#000'}}>MyFav</Text>
                    </View>
                    <View style={styles.circle}>
                        <Image style={styles.highl} source={require('../assets/reelbg.jpg')} />
                        <Text style={{color: '#000'}}>MyFav</Text>
                    </View>
                    <View style={styles.circle}>
                        <Image style={styles.highl} source={require('../assets/reelbg.jpg')} />
                        <Text style={{color: '#000'}}>MyFav</Text>
                    </View>
                </ScrollView>
                <View style={{
                    // borderTopColor: '#c7c7c7', 
                    // borderTopWidth: 1,
                    marginTop: 10}}>
                    <Tab.Navigator
                    tabBarOptions={{
                        showLabel: false,
                        showIcon: true,
                        inactiveTintColor: '#c7c7c7',
                        activeTintColor: '#000',
                        style: {
                            backgroundColor: '#fff',
                        },
                        indicatorStyle: {
                            backgroundColor: '#000',
                            height: 1
                        }
                    }}>
                        <Tab.Screen 
                            name="Grid" 
                            children={() => <GridPhotosScreen navigation={navigation} username={username} />}
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
            </ScrollView>
            <BottomSheet
            visible={visible}
            onBackButtonPress={toggleBottomNavigationView}
            onBackdropPress={toggleBottomNavigationView}>
                <View style={styles.bsheet}>
                    <View style={styles.bar}></View>
                    <Text style={styles.teexts}>Create New</Text>
                    <Divider style={{ backgroundColor: '#e2e2e2'}} />
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
      
      
    );
  };


const GridPhotosScreen = ({navigation, username}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [ allPosts, setAllPosts ] = useState(allPosts);
  useEffect(() => {
    async function getdata() {
      fetch(`http://${yourip}:3000/uploads/posts/${username}`, { 
        method: "GET"
      })
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        setAllPosts(data.allPostsOfUser)
      })
    }
    getdata();
  }, [username]);
  // const allPosts = [
  //   {source: require('../assets/reelbg.jpg'), key: 1},
  //   {source: require('../assets/reelbg.jpg'), key: 2},
  //   {source: require('../assets/reelbg.jpg'), key: 3},
  //   {source: require('../assets/reelbg.jpg'), key: 4},
  //   {source: require('../assets/reelbg.jpg'), key: 5},
  // ]
    return(
      <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#ffffff', flexWrap: 'wrap'}}>
      {allPosts !== undefined ? (
        allPosts.map((index) => {
        return(
          <View key={index._id}>
          <TouchableOpacity
            onLongPress={() => {
              setModalVisible(true);
              setModalImage(index.postImage);
              // image: index.source;
            }}
            onPressOut={() => {
              setModalVisible(false);
              setModalImage('');
            }}
            onPress={() => navigation.navigate('AllPosts')}
            >
            <View style={{width: 119, height: 119, backgroundColor: 'powderblue', borderWidth: 1, borderColor: '#fff'}}>
            <Image style={{width: 119, height: 119,}} source={{uri: index.postImage}} />
          </View>
          </TouchableOpacity>
        
      <Modal
          animationType="fade"
          transparent
          statusBarTranslucent={false}
          visible={modalVisible}
        >
          <BlurView tint="dark" intensity={100} style={styles.centeredView}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={{flexDirection: 'column'}}>
                <View style={styles.postbar}>
                  <Image style={{height: 30, width: 30, borderRadius: 15, alignSelf: 'center', marginLeft: 15}} source={{uri: index.postImage}}/>
                  <View style={{flex: 1, flexDirection: 'column', paddingLeft: 10, alignSelf: 'center'}}>
                    <Text style={styles.postname}>{index.username}</Text>
                    <Text style={styles.postsub}>{index.postLocation}</Text>
                  </View>
                  <View style={{flex: 1}}></View>
                </View>
                <Image style={styles.post} source={{uri: index.postImage}}/>
                <View style={styles.postbarbtm}>
                  <AntDesign name='hearto' color='#000' size={25} />
                  <MaterialComunityIcons name="account-outline" color='#000' size={29}  />
                  <Feather name="send" color='#000' size={25}  />
                  <MaterialComunityIcons name="dots-vertical" color='#000' size={26}  />
                </View>
                </View>
              </View>
            </View>
          </BlurView>
        </Modal></View>);
      })) : (<></>)}
    </View>
    );
}
const PhotoTagSceen = () => {
    return(
        <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#fff', flexWrap: 'wrap'}}>
            <View style={{width: 119, height: 119, backgroundColor: 'powderblue', borderWidth: 1, borderColor: '#fff'}} />
            <View style={{width: 119, height: 119, backgroundColor: 'skyblue', borderWidth: 1, borderColor: '#fff'}} />
            <View style={{width: 119, height: 119, backgroundColor: 'powderblue', borderWidth: 1, borderColor: '#fff'}} />
            <View style={{width: 119, height: 119, backgroundColor: 'skyblue', borderWidth: 1, borderColor: '#fff'}} />
            <View style={{width: 119, height: 119, backgroundColor: 'steelblue', borderWidth: 1, borderColor: '#fff'}} />
            <View style={{width: 119, height: 119, backgroundColor: 'skyblue', borderWidth: 1, borderColor: '#fff'}} />
            <View style={{width: 119, height: 119, backgroundColor: 'powderblue', borderWidth: 1, borderColor: '#fff'}} />
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
      backgroundColor: '#fff'
    },
    tabbar: {
        flexDirection: 'row',
        height: 50,
        zIndex: 1,
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? 30: 0
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
        // backgroundColor: '#727272',
        padding: 10
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
      width: 165,
      borderRadius: 5,
      marginBottom: 15,
      borderWidth: 1.5,
      borderColor: '#e2e2e2',
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
    list: {
        backgroundColor: '#1b1b1b',
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#00000060',
      // "filter": blur(8)
    },
    modalView: {
      width: Dimensions.get('window').width -25,
      margin: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      // padding: 30,
      // paddingBottom: 5,
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
  });