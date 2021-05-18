import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet,Text, TextInput, View, Dimensions, ScrollView, Platform, Alert,TouchableOpacity, StatusBar as RNStatusBar, Image } from 'react-native';
import { Modal } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { BlurView } from 'expo-blur';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from '../Explore';
import RecomendedSearchesScreen from '../RecSearches';
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { yourip } from '../helpers/keys'
const Stack = createStackNavigator();

const SearchScreen = ({navigation}) => {
  return(
    <Stack.Navigator>
      <Stack.Screen 
        name="Intialscreen"
        component={Searchhhh}
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="Searchesscreen"
        component={Search}
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="Explore" 
        component={ExploreScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="RecSearches" 
        component={RecomendedSearchesScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

const Searchhhh = ({navigation}) => {
    const [visible, setVisible] = useState(true);
    const toggleScreens = () => {
        setVisible(!visible);
    };
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState('');
    const explorepost = [
      {source: require('../assets/reelbg.jpg'), key: 1},
      {source: require('../assets/reelbg.jpg'), key: 2},
      {source: require('../assets/reelbg.jpg'), key: 3},
      {source: require('../assets/reelbg.jpg'), key: 4},
      {source: require('../assets/reelbg.jpg'), key: 5},
    ]
    return (
      <View style={styles.main}>
        <StatusBar style="auto" />
        <View>
        <View style={styles.tabbar}>
          <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#ececec', borderRadius: 10, height: 36, alignItems: 'center', marginLeft: 10}}>
            <AntDesign name="search1" color='#727272' size={20} style={{paddingLeft: 20}}  />
            <Text onPress={() => navigation.navigate('Searchesscreen')} style={styles.teeexts}>Search</Text>
          </View>
          {/* <View style={{flex: 1}}></View> */}
          <AntDesign name="scan1" color='#000' size={22} style={{marginVertical: 10, paddingLeft: 20, paddingRight: 10}}  />
        </View>
        <Chips navigation={navigation} />
        <ScrollView>
          <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#ffffff', flexWrap: 'wrap'}}>
            {explorepost.map((index) => {
              return(
                <TouchableOpacity
                  onLongPress={() => {
                    setModalVisible(true);
                    setModalImage(index.source);
                    // image: index.source;
                  }}
                  onPressOut={() => {
                    setModalVisible(false);
                    setModalImage('');
                  }}
                  onPress={() => navigation.navigate('Explore', {'post': index.source})}
                  key={index.key}>
                  <View style={{width: 119, height: 119, backgroundColor: 'powderblue', borderWidth: 1, borderColor: '#fff'}}>
                  <Image style={{width: 119, height: 119,}} source={index.source} />
                </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
        </View>

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
                  <Image style={{height: 30, width: 30, borderRadius: 15, alignSelf: 'center', marginLeft: 15}} source={modalImage}/>
                  <View style={{flex: 1, flexDirection: 'column', paddingLeft: 10, alignSelf: 'center'}}>
                    <Text style={styles.postname}>jaaayyy</Text>
                    <Text style={styles.postsub}>Vijayawada, India</Text>
                  </View>
                  <View style={{flex: 1}}></View>
                </View>
                <Image style={styles.post} source={modalImage}/>
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
        </Modal>
      </View>
    );
}

export default SearchScreen;

const Chips = ({navigation}) => {
  const recomended = [
    {rectype: 'Travel'},
    {rectype: 'Decor'},
    {rectype: 'Architecture'},
    {rectype: 'Art'},

  ]
    return(
      <View>
        <View style={{height: 40}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.horiscroll}>
            <TouchableOpacity style={styles.buttons}
            onPress={() => navigation.navigate('IGTVDiscover')}>
              <MaterialComunityIcons name="television-classic" color= '#000' size={18} />
              <Text style={{ paddingLeft: 3, color: '#000', fontSize: 14}}>IGTV</Text>
            </TouchableOpacity>
            {recomended.map((index) => {
              return(
                <TouchableOpacity
                onPress={() => {
                  navigation.navigate('RecSearches', {'tabname': index.rectype})
                }}
                style={styles.buttons}
                key={index.rectype}>
                  <Text style={{ color: '#000', fontSize: 14}}>{index.rectype}</Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
        
      </View>
    );
}

const Tab = createMaterialTopTabNavigator();

const Search = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [clearBtn, setClearBtn] = useState(false);
  const [ searchRes, setSearchRes ] = useState(searchRes);
  const toogleclose = () => {
    setClearBtn(!clearBtn);
  }
  const sendCred = () => {
    fetch(`http://${yourip}:3000/searchresult/${search}`, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.search);
      setSearchRes(data.search);
    })
  }
  return(
    <View style={styles.main}>
      <View style={styles.tabbar}>
        <AntDesign onPress={() => navigation.goBack() } name="arrowleft" color='#000' size={26} style={{padding: 10}}  />
        <TextInput
          placeholder="Search"
          autoFocus={true}
          value={search}
          returnKeyType="search"
          onChangeText={(text) => {
            setSearch(text);
            toogleclose();
          }}
          // onContentSizeChange={sendCred}
          onTextInput={sendCred}
          style={styles.inputField}
        />
        {/* <AntDesign
            // onPress={() => sendCred()}
            name="search1" size={22} style={{paddingRight: 20}} />  */}
        
      </View>
      <View style={{flex: 1}}>
        <Tab.Navigator
        tabBarOptions={{
          showLabel: true,
          inactiveTintColor: '#c7c7c7',
          activeTintColor: '#000',
          style: {
            backgroundColor: '#f8f8f8',
          },
          labelStyle: {
            textTransform: 'capitalize',
            fontWeight: 'bold',
            fontSize: 15
          },
          indicatorStyle: {
            backgroundColor: '#000',
            height: 1
          }
        }}>
          <Tab.Screen
            name="Top"
            children={TopScreen}
          />
          <Tab.Screen
            name="Account"
            children={() => <AccountScreen searchText={search} searchResult={searchRes} navigation={navigation} />}
          />
          <Tab.Screen
            name="Tags"
            children={TagsScreen}
          />
          <Tab.Screen
            name="Places"
            children={PlacesScreen}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
}

const TopScreen = () => {
  return(
    <View>
      <Text>I'm Top screen</Text>
    </View>
  )
}

const AccountScreen = ({searchText, searchResult, navigation}) => {
  
  return(
    <>
    {
      searchText.length > 0 ? (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {searchResult !== undefined ? (
        searchResult.map((index) => {
          return(
            <TouchableWithoutFeedback key={index.username} onPress={() => navigation.navigate('OthersProfile', {'propic': require('../assets/reelbg.jpg'), 'username': index.username})}>
              <View style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}>
                <Image source={{uri: index.profilepic}} style={{width: 50, height: 50, borderRadius: 25}} />
                <View style={{flexDirection: 'column'}}>
                  <Text style={{paddingLeft: 15, fontWeight: 'bold'}}>{index.username}</Text>
                  <Text style={{paddingLeft: 15, color: '#727272'}}>{index.name}</Text>
                </View>
                <View style={{flex: 1}}></View>
                <AntDesign name="close" size={14} color="#727272" style={{padding: 10}} />
              </View>
            </TouchableWithoutFeedback>
          )
        })) : (
          <></>
        )
      }
    </View>
    ) : (<>
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flexDirection: 'row', padding: 10, alignItems: 'center', display: 'flex', justifyContent: 'space-between'}}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>Recent</Text>
        <Text style={{fontSize: 14, color: '#2778e2'}}>See All</Text>
      </View>
    </View>
    </>)
    }
    </>
  )
}

const TagsScreen = () => {
  return(
    <View>
      <Text>I'm Tags screen</Text>
    </View>
  )
}

const PlacesScreen = () => {
  return(
    <View>
      <Text>I'm Places screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
      flex: 1,
      backgroundColor: '#f8f8f8',
      marginTop: Platform.OS === 'web' ? 0 :RNStatusBar.currentHeight
    },
  teeexts:{
      fontSize: 16,
    paddingLeft: 10,
    color: '#727272',
    flex: 1
  },
  tabbar: {
      flexDirection: 'row',
      height: 50,
      zIndex: 1,
      backgroundColor: '#f8f8f8',
      alignItems: 'center',
      marginTop: Platform.OS === 'ios' ? 35: 0
  },
  horiscroll: {
      flex: 1,
      flexDirection: 'row',
      paddingLeft: 5,
      paddingRight: 5
  },
  buttons:{
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#ffffff',
  paddingLeft: 17,
  paddingRight: 17,
  height: 30,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#e2e2e2',
  marginRight: 5
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
  postbar: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#00000000',
    zIndex: 1
  },
  postbarbtm: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#00000000',
    zIndex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    display: 'flex',
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
    width: Platform.OS === 'web' ? 500 : Dimensions.get('window').width-25,
    height: 300
  },
  inputField: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
    flex: 1,
    backgroundColor: '#ececec',
    borderRadius: 10,
    padding: 4,
    paddingLeft: 20
  }
});