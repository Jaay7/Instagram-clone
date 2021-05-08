import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet,Text, TextInput, View, Dimensions, ScrollView, Platform, StatusBar as RNStatusBar,TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import 'react-native-gesture-handler';
import { Modal } from 'react-native';
import { Divider } from 'react-native-elements';

const TopTab = createMaterialTopTabNavigator();

const YourActivityScreen = ({navigation}) => {
  const tabs = [
    {tname: 'Links', tcomponent: LinksView},
    {tname: 'Time', tcomponent: TimeView},
  ]
  return(
    <View style={styles.container}>
      <View style={styles.tabbar}>
        <AntDesign onPress={() => navigation.goBack() } name="arrowleft" color='#000' size={26} style={{ padding: 10}}  />
        <Text style={{color: '#000', fontSize: 19, paddingLeft: 10, fontWeight: '700' }}>Your Activity</Text>
      </View>
      <TopTab.Navigator
        initialRouteName='Homes'
        tabBarOptions={{
          inactiveTintColor: '#c7c7c7',
          activeTintColor: '#000',
          style: {
            // backgroundColor: '#f8f8f8',
          },
          indicatorStyle: {
            backgroundColor: '#000',
            height: 1
          }
        }}>
          {tabs.map((item) => {
            return(
              <TopTab.Screen
                key={item.tname}
                name={item.tname}
                component={item.tcomponent}
              />
            )
          })}
        </TopTab.Navigator>
    </View>
  );
}

export default YourActivityScreen;

const LinksView = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return(
    <View style={{flex: 1}}>
      <View style={{height: 50 ,flexDirection: 'row', justifyContent: 'space-between', padding: 10, alignItems: 'center'}}>
        <Text style={{fontSize: 18, fontWeight: '700'}}>Links You've Visited</Text>
        <Text onPress={() => {setModalVisible(true)}} style={{fontSize: 13}}>Hide History</Text>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hide Your Link History?</Text>
            <Text style={{color: '#aaaaaa', textAlign: 'center', lineHeight: 20,}}>The links you've visited will be hidden from this page. This information will still be used to imporve your experience on comapany products as described by our Data Policy.</Text>
            <TouchableOpacity
            style={{marginTop: 20, borderTopColor: '#e2e2e2', borderTopWidth: 1, padding: 10, width: '100%'}}
              onPress={() => {
                setModalVisible(!modalVisible);
                // navigation.goBack();
              }}
            >
              <Text style={{color: '#ff5151',fontWeight: 'bold', fontSize: 15, alignSelf: 'center'}}>Hide</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ borderTopWidth: 1,borderTopColor: '#e2e2e2', padding: 10, width: '100%'}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={{color: '#000', fontSize: 15, alignSelf: 'center'}}>See Data Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ borderTopWidth: 1,borderTopColor: '#e2e2e2', padding: 10, width: '100%'}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={{color: '#000', fontSize: 15, alignSelf: 'center'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const TimeView = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  
  return(
    <View style={{flex: 1}}>
      <View style={{height: 50 ,flexDirection: 'row', justifyContent: 'space-between', padding: 10, alignItems: 'center'}}>
        <Text style={{fontSize: 16, fontWeight: '700'}}>Time on Instagram</Text>
        <AntDesign onPress={() => {setModalVisible(true)}} name="infocirlceo" size={22} color="#727272" />
      </View>
      <View style={{flexDirection: 'column', alignItems: 'center', padding: 30, paddingTop: 2}}>
        <Text style={{fontSize: 28}}>1h 16m</Text>
        <Text style={{fontWeight: '700', color: '#727272'}}>Daily Average</Text>
        <Text style={{textAlign: 'center', color: '#727272'}}>Average time you spent per day using the Instagram app on this device in the last week</Text>
      </View>
      <Divider style={{marginTop: 150}} />
      <Text style={{fontWeight: '700', fontSize: 16, padding: 10}}>Manage Your Time</Text>
      <View style={{flexDirection: 'column', padding: 10, paddingRight: 30}}>
        <TouchableOpacity style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column', marginRight: 10}}>
            <Text style={{fontSize: 16}}>Set Daily Remainder</Text>
            <Text style={{color: '#727272', fontSize: 14.5}}>We'll send you a remainder once you've reached the time you set for yourself.</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={26} color="#727272" style={{ alignSelf: 'center'}}/>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'column', padding: 10, paddingRight: 30}}>
        <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => navigation.navigate('Settings',{screen: 'NotificationSettings'})}>
          <View style={{flexDirection: 'column', marginRight: 10}}>
            <Text style={{fontSize: 16}}>Notification Settings</Text>
            <Text style={{color: '#727272', fontSize: 14.5}}>Choose which Instagram notifications to get. You can also mute push notifications.</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={26} color="#727272" style={{ alignSelf: 'center'}}/>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Time on Instagram</Text>
            <Text style={{color: '#aaaaaa', textAlign: 'center', lineHeight: 20, padding: 5}}>This is amount of time you spent on average using Instagram each day during the last 7 days. Time is counted while you're using the Instagram app on this device. This metric is in development and may changes as we improve our methodologies.</Text>
            <TouchableOpacity
            style={{marginTop: 20, borderTopColor: '#e2e2e2', borderTopWidth: 1, padding: 10, width: '100%'}}
              onPress={() => {
                setModalVisible(!modalVisible);
                // navigation.goBack();
              }}
            >
              <Text style={{color: '#2778e2',fontWeight: 'bold', fontSize: 15, alignSelf: 'center'}}>Learn More</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ borderTopWidth: 1,borderTopColor: '#e2e2e2', padding: 10, width: '100%'}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={{color: '#000', fontSize: 15, alignSelf: 'center'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    marginTop: Platform.OS === 'web' ? 0 :RNStatusBar.currentHeight
  },
  tabbar: {
    flexDirection: 'row',
    height: 50,
    zIndex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#00000060'
  },
  modalView: {
    width: 270,
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    paddingBottom: 5,
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
  },
})