import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet,Text, StatusBar as RNStatusBar, View, Dimensions, ScrollView,Image, Platform, TouchableOpacity, Easing, } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Badge, withBadge, Divider,ListItem } from 'react-native-elements';
import { BottomSheet } from 'react-native-btr';
import NotficationScreen from './BottomTab/Notification';
import { LinearGradient } from 'expo-linear-gradient';
import SearchScreen from './BottomTab/search';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProfileSc from './BottomTab/profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostScreen from './BottomTab/PostScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  const [propicImage, setPropicImage] = useState(null);
    // const fetchToken = async() => {
    //   const token2 = await AsyncStorage.getItem("token")
    //   setToken(token2)
    // }
    useEffect(() => {
      async function getdata() {
        const token = await AsyncStorage.getItem("token")
        // setUsername(token)
      
        fetch('http://192.168.0.103:3000/', { //192.168.0.102
          headers: new Headers({
            Authorization:"Bearer "+token
          })
        })
        .then(res => res.json())
        .then((data) => {
          console.log(data)
          setPropicImage(data.profilepic)
        })
      }
      getdata();
    }, []);
    return(
      
        <Tab.Navigator
        initialRouteName="HomeTab"
        activeColor="#ff5252"
        tabBarOptions={{ activeTintColor:"#000", showLabel:false, 
        style:{ 
          backgroundColor: '#fff',
          borderTopColor:'#e2e2e2', }}}>
          <Tab.Screen 
          name="HomeTab"
          children={() => <HomeTabScreen profilepic={propicImage} navigation={navigation} />}
          options={{
            tabBarLabel: 'Images',
            tabBarIcon: ({ color, focused }) => (
              <MaterialComunityIcons name={focused ? "home-variant" : "home-variant-outline" } color={color} size={30} />
            ),
          }}
          />
          <Tab.Screen 
          name="Search"
          component={SearchScreen}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color }) => (
              <AntDesign name="search1" color={color} size={26}  />
            ),
          }}
          />
          <Tab.Screen 
          name="Post"
          component={PostScreen}
          options={{
            tabBarLabel: 'Post',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="plus-square-o" color={color} size={28} />
            ),
          }}
          />
          
          <Tab.Screen
          name="Notifications"
          component={NotficationScreen}
          options={{
            tabBarLabel: 'Updates',
            tabBarIcon: ({ color, focused }) => (
              <AntDesign name={focused ? "heart" : "hearto"} size={26}  color={color} />
            ),
          }}
          />
          <Tab.Screen
          name="Profile"
          component={ProfileSc}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, focused }) => (
              <Image style={focused ? styles.btmnavpicfocused : styles.btmnavpic} source={{uri: propicImage}}/>
              // <MaterialComunityIcons name="account" color={color} size={28} />
            ),
          }}
          />
        </Tab.Navigator>
      
    );
    };
  
    const {width: screenWidth} = Dimensions.get('window');

const TopTab = createMaterialTopTabNavigator();

// const HomeAllTabs = ({navigation, profilepic}) => {
//   const tabs = [
//     {tname: 'Camera', tcomponent: <CameraScreen />,},
//     {tname: 'Homes', tcomponent: <HomeTabScreen profilepic={profilepic}/>,},
//     {tname: 'Inbox', tcomponent: <InboxScreen />,},
//   ]
//   return(
//     <View style={{flex: 1}}>
//         <TopTab.Navigator
//         initialRouteName='Homes'
//         tabBarOptions={{
//           showLabel: true,
//           inactiveTintColor: '#c7c7c7',
//           activeTintColor: '#000',
//           style: {
//             // backgroundColor: '#f8f8f8',
//             display: 'none'
//           },
//           labelStyle: {
//             textTransform: 'capitalize',
//             fontSize: 15
//           },
//           indicatorStyle: {
//             backgroundColor: '#000',
//             height: 1
//           }
//         }}>
//           {tabs.map((item) => {
//             return(
//               <TopTab.Screen
//                 key={item.tname}
//                 name={item.tname}
//                 children={() => item.tcomponent}
//               />
//             )
//           })}
//         </TopTab.Navigator>
//       </View>
//   )
// }

  const HomeTabScreen = ({navigation, profilepic}) => {
    const [notLiked, setLiked] = useState('hearto');
    const [notLikedColor, setLikedColor] = useState('#000000');
  const [notSaved, setSaved] = useState('bookmark-o');
  const [visible, setVisible] = useState(false);
    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        setVisible(!visible);
    };
    const BottomSheetList = [
      { screen: 'Camera', title: 'Report...', },
      { screen: 'Camera', title: 'Turn on Post Notifications', },
      { screen: 'Camera', title: 'Copy Link', },
      { screen: 'Camera', title: 'Share to...', },
      { screen: 'Camera', title: 'Unfollow', },
      { screen: 'Camera', title: 'Mute', },
    ];
    const stories = [
      {image: require('./assets/reelbg.jpg'), user: 'tyukhmd'},
      {image: require('./assets/reelbg.jpg'), user: 'wrtrynbh'},
      {image: require('./assets/reelbg.jpg'), user: 'rhjfgcx'},
      {image: require('./assets/reelbg.jpg'), user: 'wiuivsdj'},
      {image: require('./assets/reelbg.jpg'), user: 'wwrgsjn'},
      {image: require('./assets/reelbg.jpg'), user: 'sdrw98jf'},
    ]
    const posts = [
      {image: require('./assets/reelbg.jpg'), username: 'jaaayyy', location: 'Vijayawada, India'},
      {image: require('./assets/reelbg.jpg'), username: 'sahithi', location: 'Vijayawada, India'},
      {image: require('./assets/reelbg.jpg'), username: 'nandini', location: 'Vijayawada, India'},
    ]
    return (
        <View style={styles.main}>
          <StatusBar style="auto" />
            <View style={styles.tabbar}>
              <MaterialComunityIcons
              onPress={() => navigation.navigate('Camera') }
              name="camera-outline" color='#000' size={26} style={{padding: 10}} />
                <Text style={styles.i}>I</Text>
                <Text style={styles.words}>nstagram</Text>
                <View style={{flex: 1}}></View>
                <Feather
                 onPress={() =>
                  navigation.navigate('Reel', { name: 'Jane' })
                }
                name="film" color='#000' size={23} style={{padding: 7}}/>
                <MaterialComunityIcons
                onPress={() =>
                  navigation.navigate('Inbox', { name: 'Jane' })
                }
                name="facebook-messenger" color='#000' size={28} style={{alignSelf: 'center', padding: 13}}  />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.horiscroll}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                  <Image style={styles.highl} source={{uri: profilepic}} />
                  <Badge
                        status="primary"
                        value='+'
                        containerStyle={{ top: 45, left: -20 }}
                        badgeStyle={{height: 20, width: 20, borderRadius: 10, borderColor: '#fff', borderWidth: 1 }}
                    />
                  </View>
                  <Text style={{color: '#000'}}>Your Story</Text>
                </View>
                {
                  stories.map((index) => {
                    return(
                      <View style={styles.circle} key={index.user}>
                        <TouchableOpacity style={{alignItems: 'center'}}>
                          <Image style={styles.highl} source={index.image} />
                          <Text style={{color: '#000'}}>{index.user}</Text>
                        </TouchableOpacity>
                      </View>
                    )
                  })
                }
              </ScrollView>
                <View style={{height: 10}}></View>
                <Divider style={{backgroundColor: '#e2e2e2'}}/>
                <View>
                  {
                    posts.map((index) => {
                      return(
                        <View key={index.username}>
                          <View style={styles.postbar}>
                            <Image style={{height: 30, width: 30, borderRadius: 15, alignSelf: 'center', marginLeft: 15}} source={index.image}/>
                            <View style={{flex: 1, flexDirection: 'column', paddingLeft: 10, alignSelf: 'center'}}>
                              <Text style={styles.postname} onPress={() => navigation.navigate('OthersProfile', {'propic': index.image, 'username': index.username})}>{index.username}</Text>
                              <Text style={styles.postsub}>{index.location}</Text>
                            </View>
                            <View style={{flex: 1}}></View>
                            <MaterialComunityIcons
                              onPress={ toggleBottomNavigationView }
                              name="dots-vertical" color='#000' size={28} style={{marginVertical: 10, paddingLeft: 10, paddingRight: 10}}  />
                          </View>
                          <Image style={styles.post} source={index.image}/>
                          <View style={styles.postbar}>
                            <AntDesign name={notLiked} color={notLikedColor} 
                            onPress={() => {
                              setLiked(
                                notLiked === 'hearto' ? 'heart' : 'hearto'
                              );
                              setLikedColor(
                                notLikedColor === '#000000' ? '#ff5151' : '#000000'
                              )
                            }}
                            size={27} style={{alignSelf: 'center', paddingLeft: 10}} />
                            <Feather name="message-circle" color='#000' size={29} style={{ alignSelf: 'center', paddingLeft: 12}}  />
                            <Feather name="send" color='#000' size={26} style={{ alignSelf: 'center', paddingLeft: 12}}  />
                            <View style={{flex: 1}}></View>
                            <FontAwesome name={notSaved}
                            onPress={() => {
                              setSaved(
                                notSaved === 'bookmark-o' ? 'bookmark' : 'bookmark-o'
                              );
                            }} color='#000' size={28} style={{alignSelf: 'center', paddingLeft: 18, paddingRight: 10}}  />
                          </View>
                          <View style={styles.postbottom}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                              <Image style={{height: 22, width: 22, borderRadius: 11}} source={index.image}/>
                              <Text style={{color: '#000'}}>  Liked by </Text>
                              <Text style={{color: '#000', fontWeight: 'bold'}}>jaaayyy </Text>
                              <Text style={{color: '#000'}}>and </Text>
                              <Text style={{color: '#000', fontWeight: 'bold'}}>others </Text>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', margin:3, marginLeft: 0}}>
                              <Text style={{color: '#000', fontWeight: 'bold', fontSize: 15}} onPress={() => navigation.navigate('OthersProfile', {'propic': index.image, 'username': index.username})}>{index.username} </Text>
                              <Text style={{color: '#000', fontSize: 15}}>LOL!!😁 </Text>
                            </View>
                            <Text style={{color: '#727272', fontSize: 15}}>View all 3 comments</Text>
                            <View style={{flex: 1, flexDirection: 'row',margin: 5, marginLeft: 0}}>
                              <Image style={{height: 22, width: 22, borderRadius: 11}} source={index.image}/>
                              <Text style={{color: '#727272', fontSize: 15}}>  Add a comment...</Text>
                              <View style={{flex: 1}}></View>
                              <Text>🔥</Text>
                              <Text style={{paddingLeft: 10}}>😉</Text>
                              <MaterialIcons name="add-circle-outline" color="#727272" size={18} style={{paddingLeft: 10}}/>
                            </View>
                            <Text style={{color: '#727272', fontSize: 12}}>2 hours ago</Text>
                          </View>
                        </View>
                      )
                    })
                  }
                </View>
                <SuggestedForYou/>
                <Divider style={{ backgroundColor: '#cfcfcf', marginBottom: 90}} />
                <View style={{alignItems: 'center', marginBottom: 50}}>
                  <LinearGradient
                    colors={['#f09433', '#e6683c', '#dc2743', '#cc2366', '#bc1888']}
                    style={{overflow: 'hidden', height: 100, width: 100, justifyContent: 'center', display: 'flex', borderRadius: 50}}
                  >
                    <AntDesign name="checkcircle" size={90} color="#fff" style={{alignSelf: 'center'}} />
                  </LinearGradient>
                  <Text style={{fontSize: 23, marginTop: 17}}>You're All Caught Up</Text>
                  <Text style={{color: '#aaaaaa'}}>You've seen all new posts from the past 3 days.</Text>
                  <Text style={{color: '#2778e2', fontWeight: 'bold', padding: 5}}>View Older Posts</Text>
                </View>
                <Divider style={{ backgroundColor: '#cfcfcf'}} />
                <Text style={{fontSize: 18, fontWeight: 'bold', padding: 13}}>Suggested Posts</Text>
                <Divider style={{ backgroundColor: '#cfcfcf', marginBottom: 50}} />
            </ScrollView>
            <BottomSheet
            visible={visible}
            onBackButtonPress={toggleBottomNavigationView}
            onBackdropPress={toggleBottomNavigationView}>
                <View style={styles.bsheet}>
                  <View style={styles.bar}></View>
                  <View>
                    {BottomSheetList.map((index) => {
                      return(
                        <Text style={styles.bsheetText} key={index.title}>{index.title}</Text>
                      )
                    })}
                  </View>
                </View>
            </BottomSheet>
        </View>
      
    );
    
  };
  
const SuggestedForYou = () => {
  const suggestedAcc = [
    {image: require('./assets/reelbg.jpg'), username: 'jaaayyyyy', follwedby: 'wnjefnjed'},
    {image: require('./assets/reelbg.jpg'), username: 'rewtrytyj', follwedby: 'wnjefnjed'},
    {image: require('./assets/reelbg.jpg'), username: 'jsdffdrwe', follwedby: 'wnjefnjed'},
  ]
  return(
    <View style={{flexDirection: 'column'}}>
      <View style={{flexDirection:'row', flex: 1, justifyContent: 'space-between', padding: 10}}>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>Suggested for You</Text>
        <Text style={{fontSize: 15, fontWeight: 'bold', color:'#2778e2'}}>See All</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{flexDirection: 'row', marginLeft: 10}}>
          {
            suggestedAcc.map((index) => {
              return(
                <View style={styles.suggBox} key={index.username}>
                  <AntDesign name="close" size={22} color="#aaaaaa" style={{position: 'absolute', alignSelf: 'flex-end', right: 6, top: 6}} />
                  <Image source={index.image} style={{height: 100, width: 100, borderRadius: 50}} />
                  <Text style={{fontWeight: 'bold', fontSize: 16, padding: 3}}>{index.username}</Text>
                  <Text>Followed by</Text>
                  <Text>{index.follwedby}</Text>
                  <TouchableOpacity style={styles.buttons}>
                    <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 15}}>Follow</Text>
                  </TouchableOpacity>
                </View>
              )
            })
          }
          
        </View>
      </ScrollView>
      
    </View>
  )
}  
  
  
export default HomeScreen;

const styles = StyleSheet.create({
    line: {
      height: 1,
      backgroundColor: '#000000',
      marginTop: 120,
      ...Platform.select({
        ios: {
          width: 350
        },
        android: {
          width: 350
        },
        default: {
          // other platforms, web for example
          width: 0
        }
    })
  },
    texts:{
      color: '#777777',
      padding: 5,
    },
    teexts:{
      color: '#9ac1d3',
      paddingLeft: 3,
      fontWeight: 'bold'
    },
    teeexts:{
      paddingLeft: 3,
      color: '#2778e2',
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
        backgroundColor: '#ffffff',
        zIndex: 1,
      //   borderBottomColor: '#e2e2e2',
      // borderBottomWidth: 1,
      alignItems: 'center',
      marginTop: Platform.OS === 'ios' ? 30: 0
    },
    container: {
      flex: 1,
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
    i: {
      fontFamily: 'Engagement-Regular',
      color: '#000',
      fontSize: 26,
      paddingLeft: 5
    },
    words:{
      fontFamily: 'Cookie-Regular',
      color: '#000',
      fontSize: 30,
      // paddingLeft: 10
    },
    logi:{
      color: '#fff',
      alignSelf: 'center',
      fontSize: 18,
    },
    buttons:{
      alignSelf: 'center',
      backgroundColor: '#2778e2',
      padding: 6,
      paddingRight: 40,
      paddingLeft: 40,
      borderRadius: 4,
      marginTop: 10
    },
    inputFields:{
      color: '#fff',
      width: 300,
      height: 45,
      alignSelf: 'center',
      backgroundColor: '#424242',
      borderRadius: 4,
      marginBottom: 15,
      padding: 12,
      
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
    title: {
        color: '#fff'
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
      paddingRight: 15
  },
  horiscroll: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 10,
    marginTop: 10,
  },
  postbar: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#00000000',
    zIndex: 1
  },
  postname: {
    color: '#000',
  },
  postsub: {
    color: '#000',
    fontSize: 12,
    top: -4
  },
  post: {
    width: Platform.OS === 'web' ? 500 : Dimensions.get('window').width,
    height: 500
  },
  postbottom: {
    flex: 1,
    // height: 100,
    flexDirection: 'column',
    paddingLeft: 15,
    paddingRight: 10,
    backgroundColor: '#00000000'
  },
  bsheet: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
},
bar: {
    height: 5,
    width: 35,
    backgroundColor: '#e2e2e2',
    alignSelf: 'center',
    marginTop: 12,
    borderRadius: 3
},
  bsheetText: {
    fontSize: 16,
    padding: 15,
    paddingLeft: 25
  },
  btmnavpic: {
    height: 26,
    width: 26,
    borderRadius: 13
  },
  btmnavpicfocused: {
    height: 26,
    width: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: '#1a1a1a'
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
  