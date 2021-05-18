import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet,Text, TextInput, View, Dimensions, ScrollView, Platform, StatusBar as RNStatusBar,TouchableOpacity, Image, TouchableHighlight } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Divider } from 'react-native-elements';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BottomSheet } from 'react-native-btr';
import { RadioButton, Switch } from 'react-native-paper';

const Tab = createMaterialTopTabNavigator();

const FAndFScreen = ({route, navigation}) => {
    const {username, followers, following, initial} = route.params;
  return(
    <View style={styles.container}>
      <View style={styles.tabbar}>
        <AntDesign onPress={() => navigation.goBack() } name="arrowleft" color='#000' size={26} style={{ padding: 10}}  />
        <Text style={{color: '#000', fontSize: 18, paddingLeft: 10, fontWeight: 'bold' }}>{username}</Text>
      </View>
      <View style={{flex: 1}}>
        <Tab.Navigator
        initialRouteName={initial}
        tabBarOptions={{
          showLabel: true,
          inactiveTintColor: '#c7c7c7',
          activeTintColor: '#000',
          style: {
            backgroundColor: '#ffffff',
          },
          labelStyle: {
            fontWeight: 'bold',
            fontSize: 13,
            textTransform: 'capitalize'
          },
          indicatorStyle: {
            backgroundColor: '#000',
            height: 1
          }
        }}>
          <Tab.Screen
            name={`${followers} Followers`}
            component={FollowersTab}
          />
          <Tab.Screen
            name={`${following} Following`}
            component={FollowingTab}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
}

export default FAndFScreen;

const FollowersTab = () => {
  const [search, setSearch] = useState('');

  const followersPeople = [
    {username: 'nandini_chow...', name: 'Nandini.k', propic: require('../assets/reelbg.jpg')},
    {username: 'sahithivepuri', name: 'Sahithi.v', propic: require('../assets/reelbg.jpg')},
    {username: 'nandini_', name: 'srgdsfg', propic: require('../assets/reelbg.jpg')},
    {username: 'sahithi_', name: 'dhgdfbg', propic: require('../assets/reelbg.jpg')},
    {username: 'jaayyyyy', name: 'jjjjaaayyyy', propic: require('../assets/reelbg.jpg')},
  ];

  return(
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.inputFields}>
        <AntDesign name="search1" color='#b1b1b1' size={22} style={{paddingLeft: 5, paddingRight: 10}}  />
        <TextInput
          style={{flex: 1}}
          placeholder="Search followers..."
          value={search}
          onChangeText={text => setSearch(text)}
          placeholderTextColor="#b1b1b1"
        />
      </View>
      <Text>FollowersTab</Text>
      <Divider style={{backgroundColor: '#a8a8a8'}}/>
      <View>
        <Text style={styles.heading}>Categories</Text>
        <View style={styles.item}>
          <Image source={require('../assets/reelbg.jpg')} style={{height: 40, width: 40, borderRadius: 20}} />
          <View style={{flexDirection: 'column', marginLeft: 20}}>
            <Text style={{fontWeight: 'bold'}}>Accounts You Don't Follow Back</Text>
            <Text style={{color: '#727272'}}>dfhdfjfgj</Text>
          </View>
        </View>
        <View style={styles.item}>
          <Image source={require('../assets/reelbg.jpg')} style={{height: 40, width: 40, borderRadius: 20}} />
          <View style={{flexDirection: 'column', marginLeft: 20}}>
            <Text style={{fontWeight: 'bold'}}>Least Interacted With</Text>
            <Text style={{color: '#727272'}}>fgjfthrthr</Text>
          </View>
        </View>
      </View>
      <Divider style={{backgroundColor: '#a8a8a8'}}/>
      <Text style={styles.heading}>All Followers</Text>
      <View>
        {followersPeople.map((index) => {
          return(
            <View key={index.username} style={{flexDirection: 'row', flex: 1, alignItems: 'center', padding: 7, marginLeft: 10, paddingRight: 20, width: Dimensions.get('window').width}}>
              <Image source={index.propic} style={{height: 60, width: 60, borderRadius: 30, borderWidth: 1, borderColor: '#727272'}} />
              <View style={{flexDirection: 'column', padding: 10, overflow: 'hidden'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text>{index.username}</Text>
                  {index.username === 'jaayyyyy'
                    ? <Text style={{color: '#2778e2', fontWeight: 'bold'}}>  Follow</Text>
                    : <View></View>}
                </View>
                <Text style={{color: '#b4b4b4'}}>{index.name}</Text>
              </View>
              <View style={{flex: 1}}></View>
              <TouchableOpacity style={[styles.button,{width: 83}]}>
                <Text style={{fontWeight: 'bold', }}>Remove</Text>
              </TouchableOpacity>
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}

const FollowingTab = () => {
  const [search, setSearch] = useState('');
  const followingPeople = [
    {username: 'nandini_chow...', name: 'Nandini.k', propic: require('../assets/reelbg.jpg')},
    {username: 'sahithivepuri', name: 'Sahithi.v', propic: require('../assets/reelbg.jpg')},
    {username: 'nandini_', name: 'rtghrth', propic: require('../assets/reelbg.jpg')},
    {username: 'sahithi_', name: 'ryjrthjrt', propic: require('../assets/reelbg.jpg')},
    {username: 'jaayyyyy', name: 'jjjjaaayyyy', propic: require('../assets/reelbg.jpg')},
  ];

  const [visible, setVisible] = useState(false);
    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        setVisible(!visible);
    };
  const [checked, setChecked] = React.useState('Default');
  return(
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.inputFields}>
        <AntDesign name="search1" color='#b1b1b1' size={22} style={{paddingLeft: 5, paddingRight: 10}}  />
        <TextInput
          style={{flex: 1}}
          placeholder="Search following..."
          value={search}
          onChangeText={text => setSearch(text)}
          placeholderTextColor="#b1b1b1"
        />
      </View>
      <View style={{padding: 10, flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>
        <AntDesign name="contacts" size={38} style={{borderWidth: 1, padding: 10, borderRadius: 40}} />
        <View>
          <Text>Connect Contacts</Text>
          <Text style={{color: '#b4b4b4'}}>Follow people you kno...</Text>
        </View>
        <TouchableOpacity style={{backgroundColor: '#2778e2', padding: 5, width: 70, alignItems: 'center', borderRadius: 5}}>
          <Text style={{color: '#fff'}}>Connect</Text>
        </TouchableOpacity>
        <AntDesign name="close" size={15} color="#b4b4b4" style={{padding: 5}} />
      </View>
      <Divider style={{backgroundColor: '#a8a8a8'}}/>
      <View>
        <Text style={styles.heading}>Categories</Text>
        <View style={styles.item}>
          <Image source={require('../assets/reelbg.jpg')} style={{height: 40, width: 40, borderRadius: 20}} />
          <View style={{flexDirection: 'column', marginLeft: 20}}>
            <Text style={{fontWeight: 'bold'}}>Least Interacted With</Text>
            <Text style={{color: '#727272'}}>dfhdfjfgj</Text>
          </View>
        </View>
        <View style={styles.item}>
          <Image source={require('../assets/reelbg.jpg')} style={{height: 40, width: 40, borderRadius: 20}} />
          <View style={{flexDirection: 'column', marginLeft: 20}}>
            <Text style={{fontWeight: 'bold'}}>Most Shown in Feed</Text>
            <Text style={{color: '#727272'}}>fgjfthrthr</Text>
          </View>
        </View>
      </View>
      <Divider style={{backgroundColor: '#a8a8a8'}}/>
      <View>
        <TouchableHighlight activeOpacity={0.6} underlayColor="#ebebeb" onPress={toggleBottomNavigationView} style={{padding: 20, }}>
          <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>
            <Text>Sorted by <Text style={{fontWeight: 'bold'}}>{checked}</Text></Text>
            <SimpleLineIcons name="arrow-up-circle" size={18} />
          </View>
        </TouchableHighlight>
      </View>
      <View>
        {followingPeople.map((index) => {
          return(
            <View key={index.username} style={{flexDirection: 'row', flex: 1, alignItems: 'center', padding: 7, marginLeft: 10, width: Dimensions.get('window').width}}>
              <Image source={index.propic} style={{height: 60, width: 60, borderRadius: 30, borderWidth: 1, borderColor: '#727272'}} />
              <View style={{flexDirection: 'column', padding: 10, overflow: 'hidden'}}>
                <Text>{index.username}</Text>
                <Text style={{color: '#b4b4b4'}}>{index.name}</Text>
              </View>
              <View style={{flex: 1}}></View>
              <TouchableOpacity style={styles.button}>
                <Text style={{fontWeight: 'bold', }}>Following</Text>
              </TouchableOpacity>
              <MaterialComunityIcons name="dots-vertical" color='#727272' size={28} style={{paddingRight: 10}}  />
            </View>
          )
        })}
      </View>
      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}>
        <View style={styles.bsheet}>
          <View style={styles.bar}></View>
          <Text style={styles.teexts}>Sort By</Text>
          <Divider style={{ backgroundColor: '#e2e2e2'}} />
        </View>
        <View style={{backgroundColor: '#fff'}}>
          <View style={{flexDirection: 'row', alignItems: 'center',}}>
            <Text style={styles.itemss}>Default</Text>
            <View style={{flex: 1}}></View>
            <RadioButton
            color="#2778e2"
            value="Default"
            status={ checked === 'Default' ? 'checked' : 'unchecked' }
            onPress={() => {setChecked('Default'); toggleBottomNavigationView()}}
          />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.itemss}>Date Followed: Latest</Text>
            <View style={{flex: 1}}></View>
            <RadioButton
            color="#2778e2"
            value="Latest"
            status={ checked === 'Latest' ? 'checked' : 'unchecked' }
            onPress={() => {setChecked('Latest'); toggleBottomNavigationView()}}
          />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.itemss}>Date Followed: Earliest</Text>
            <View style={{flex: 1}}></View>
            <RadioButton
            color="#2778e2"
            value="Earliest"
            status={ checked === 'Earliest' ? 'checked' : 'unchecked' }
            onPress={() => {setChecked('Earliest'); toggleBottomNavigationView()}}
          />
          </View>
        </View>
      </BottomSheet>
    </ScrollView>
  )
}

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
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 30: 0
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
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 15
  },
  item: {
    paddingLeft: 20,
    flexDirection: 'row',
    padding: 13
  },
  button: {
    width: 120,
    padding: 5,
    // paddingLeft: 35,
    // paddingRight: 35,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#cfcfcf',
    alignItems: 'center',
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
  teexts:{
    color: '#000',
    paddingLeft: 3,
    fontWeight: 'bold',
    fontSize: 17,
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  itemss: {
    margin: 15
  },
})